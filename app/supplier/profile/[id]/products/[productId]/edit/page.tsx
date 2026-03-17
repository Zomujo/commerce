'use client';

import { useEffect, useRef, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ApiClient } from '@/lib/api-client';
import { Coa, StrategicVertical } from '@/types/api';
import FileUpload, { FileUploadHandle } from '@/app/components/FileUpload';
import Link from 'next/link';

export default function EditProductPage() {
  const params = useParams();
  const router = useRouter();
  const supplierId = params.id as string;
  const productId = params.productId as string;

  const imageRef = useRef<FileUploadHandle>(null);
  const [verticals, setVerticals] = useState<StrategicVertical[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [coas, setCoas] = useState<Coa[]>([]);
  const [coaLoading, setCoaLoading] = useState(false);
  const [coaError, setCoaError] = useState('');
  const [coaSubmitting, setCoaSubmitting] = useState(false);
  const [coaDocumentFile, setCoaDocumentFile] = useState<File | null>(null);
  const [form, setForm] = useState({
    name: '',
    verticalId: '',
    originCountry: '',
    purityGrade: '',
    image: '',
    description: '',
    originSite: '',
    qaPartner: '',
    badge: '',
    certifications: '',
  });
  const [coaForm, setCoaForm] = useState({
    batchNumber: '',
    qaPartner: '',
    analysisDate: '',
    expiryDate: '',
    digitalSignature: '',
    parameter: '',
    value: '',
    specification: '',
    status: 'pass',
  });

  useEffect(() => {
    const load = async () => {
      try {
        const [product, verts] = await Promise.all([
          ApiClient.getSupplierProductById(productId),
          ApiClient.getVerticals(),
        ]);
        setVerticals(verts);
        const resolvedVerticalId = product.verticalId
          ?? verts.find((v) => v.name === product.verticalName)?.id
          ?? '';
        setForm({
          name: product.name,
          verticalId: resolvedVerticalId,
          originCountry: product.originCountry,
          purityGrade: product.purityGrade,
          image: product.image,
          description: product.description || '',
          originSite: product.originSite || '',
          qaPartner: (product as { qaPartner?: string }).qaPartner || '',
          badge: product.badge || '',
          certifications: (product.certifications ?? []).join(', '),
        });

        setCoaLoading(true);
        try {
          const coaData = await ApiClient.getProductCoas(productId);
          setCoas(coaData);
        } catch {
          setCoas([]);
        } finally {
          setCoaLoading(false);
        }
      } catch (err) {
        console.error('Failed to load product:', err);
        setError('Failed to load product');
      } finally {
        setIsLoading(false);
      }
    };
    load();
  }, [productId]);

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((prev) => ({ ...prev, [k]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    try {
      const uploadedImage = await imageRef.current?.upload() ?? form.image;
      const certs = form.certifications
        ? form.certifications.split(',').map((c) => c.trim()).filter(Boolean)
        : [];
      await ApiClient.updateSupplierProduct(productId, {
        name: form.name,
        verticalId: form.verticalId,
        originCountry: form.originCountry,
        purityGrade: form.purityGrade,
        image: uploadedImage,
        ...(form.description && { description: form.description }),
        ...(form.originSite && { originSite: form.originSite }),
        ...(form.qaPartner && { qaPartner: form.qaPartner }),
        ...(form.badge && { badge: form.badge }),
        certifications: certs,
      });
      router.push(`/supplier/profile/${supplierId}`);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to update product');
    } finally {
      setSubmitting(false);
    }
  };

  const uploadCoaDocument = async (): Promise<string> => {
    if (!coaDocumentFile) {
      throw new Error('Please upload a CoA PDF document');
    }

    const contentType = coaDocumentFile.type || 'application/pdf';
    const { uploadUrl, fileUrl } = await ApiClient.getUploadUrl(coaDocumentFile.name, contentType);

    const uploadRes = await fetch(uploadUrl, {
      method: 'PUT',
      body: coaDocumentFile,
      headers: {
        'Content-Type': contentType,
      },
    });

    if (!uploadRes.ok) {
      throw new Error('Failed to upload CoA document');
    }

    return fileUrl;
  };

  const createCoa = async (e: React.FormEvent) => {
    e.preventDefault();
    setCoaSubmitting(true);
    setCoaError('');

    try {
      const documentUrl = await uploadCoaDocument();

      const created = await ApiClient.createSupplierProductCoa(supplierId, productId, {
        batchNumber: coaForm.batchNumber,
        qaPartner: coaForm.qaPartner,
        analysisDate: coaForm.analysisDate,
        ...(coaForm.expiryDate && { expiryDate: coaForm.expiryDate }),
        documentUrl,
        ...(coaForm.digitalSignature && { digitalSignature: coaForm.digitalSignature }),
        results: [
          {
            parameter: coaForm.parameter,
            value: coaForm.value,
            ...(coaForm.specification && { specification: coaForm.specification }),
            status: coaForm.status,
          },
        ],
      });

      setCoas((prev) => [created, ...prev]);
      setCoaForm({
        batchNumber: '',
        qaPartner: '',
        analysisDate: '',
        expiryDate: '',
        digitalSignature: '',
        parameter: '',
        value: '',
        specification: '',
        status: 'pass',
      });
      setCoaDocumentFile(null);
    } catch (err: unknown) {
      setCoaError(err instanceof Error ? err.message : 'Failed to create CoA');
    } finally {
      setCoaSubmitting(false);
    }
  };

  const deleteCoa = async (id: string) => {
    setCoaError('');
    try {
      await ApiClient.deleteSupplierCoa(supplierId, id);
      setCoas((prev) => prev.filter((c) => c.id !== id));
    } catch (err: unknown) {
      setCoaError(err instanceof Error ? err.message : 'Failed to delete CoA');
    }
  };

  const inputCls = 'w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition';

  if (isLoading) return <div className="flex items-center justify-center py-20 text-slate-400">Loading...</div>;

  return (
    <div className="max-w-2xl">
      <Link href={`/supplier/profile/${supplierId}`} className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-emerald-500 transition-colors mb-6">
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="15 18 9 12 15 6"/></svg>
        Back to Profile
      </Link>

      <h1 className="text-2xl font-bold text-slate-800 tracking-tight mb-1">Edit Product</h1>
      <p className="text-sm text-slate-400 mb-6">Update your product details.</p>

      {error && (
        <div className="mb-4 px-4 py-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">{error}</div>
      )}

      <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-slate-200 p-6 space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">Product Name *</label>
            <input required value={form.name} onChange={set('name')} className={inputCls} />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">Vertical *</label>
            <select required value={form.verticalId} onChange={set('verticalId')} className={inputCls}>
              <option value="">Select a vertical...</option>
              {verticals.map((v) => (
                <option key={v.id} value={v.id}>{v.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">Origin Country *</label>
            <input required value={form.originCountry} onChange={set('originCountry')} className={inputCls} />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">Purity Grade *</label>
            <input required value={form.purityGrade} onChange={set('purityGrade')} className={inputCls} />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">Origin Site</label>
            <input value={form.originSite} onChange={set('originSite')} className={inputCls} />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">QA Partner</label>
            <input value={form.qaPartner} onChange={set('qaPartner')} className={inputCls} />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">Badge</label>
            <input value={form.badge} onChange={set('badge')} className={inputCls} />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">Certifications</label>
            <input value={form.certifications} onChange={set('certifications')} className={inputCls} placeholder="ISO 9001, REACH (comma-separated)" />
          </div>
        </div>
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">Description</label>
          <textarea value={form.description} onChange={set('description')} rows={3} className={`${inputCls} resize-y`} />
        </div>
        <FileUpload
          ref={imageRef}
          label="Product Image *"
          value={form.image}
          onChange={(url) => setForm((prev) => ({ ...prev, image: url }))}
        />
        <div className="pt-2 flex justify-end gap-3">
          <Link href={`/supplier/profile/${supplierId}`} className="px-4 py-2 rounded-lg border border-slate-200 text-sm text-slate-600 hover:bg-slate-50 transition">
            Cancel
          </Link>
          <button type="submit" disabled={submitting}
            className="px-5 py-2 rounded-lg bg-emerald-500 text-white text-sm font-semibold hover:bg-emerald-600 transition disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer">
            {submitting ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>

      <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-5 mt-6">
        <div>
          <h2 className="text-lg font-semibold text-slate-800">Certificates of Analysis</h2>
          <p className="text-sm text-slate-400 mt-1">Upload CoA documents for this product and manage published records.</p>
        </div>

        {coaError && (
          <div className="px-4 py-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">{coaError}</div>
        )}

        {coaLoading ? (
          <div className="text-sm text-slate-400">Loading CoAs...</div>
        ) : coas.length === 0 ? (
          <div className="text-sm text-slate-400">No CoAs added yet.</div>
        ) : (
          <div className="space-y-3">
            {coas.map((coa) => (
              <div key={coa.id} className="rounded-lg border border-slate-200 p-3 flex items-center justify-between gap-4">
                <div>
                  <div className="text-sm font-semibold text-slate-800">Batch {coa.batchNumber}</div>
                  <div className="text-xs text-slate-500 mt-1">
                    {new Date(coa.analysisDate).toLocaleDateString()} • {coa.qaPartner}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <a
                    href={ApiClient.getDownloadUrl(coa.documentUrl)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs text-slate-600 hover:bg-slate-50 transition"
                  >
                    Download
                  </a>
                  <button
                    type="button"
                    onClick={() => deleteCoa(coa.id)}
                    className="px-3 py-1.5 rounded-lg border border-red-200 text-xs text-red-600 hover:bg-red-50 transition cursor-pointer"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <form onSubmit={createCoa} className="space-y-4 pt-2 border-t border-slate-100">
          <h3 className="text-sm font-semibold text-slate-700">Add New CoA</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">Batch Number *</label>
              <input required value={coaForm.batchNumber} onChange={(e) => setCoaForm((p) => ({ ...p, batchNumber: e.target.value }))} className={inputCls} />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">QA Partner *</label>
              <input required value={coaForm.qaPartner} onChange={(e) => setCoaForm((p) => ({ ...p, qaPartner: e.target.value }))} className={inputCls} />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">Analysis Date *</label>
              <input required type="date" value={coaForm.analysisDate} onChange={(e) => setCoaForm((p) => ({ ...p, analysisDate: e.target.value }))} className={inputCls} />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">Expiry Date</label>
              <input type="date" value={coaForm.expiryDate} onChange={(e) => setCoaForm((p) => ({ ...p, expiryDate: e.target.value }))} className={inputCls} />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">Document File (PDF)</label>
              <input
                type="file"
                accept="application/pdf"
                required
                onChange={(e) => setCoaDocumentFile(e.target.files?.[0] ?? null)}
                className={inputCls}
              />
              <p className="text-xs text-slate-400 mt-1">The file uploads automatically to secure storage when you submit.</p>
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">Result Parameter *</label>
              <input required value={coaForm.parameter} onChange={(e) => setCoaForm((p) => ({ ...p, parameter: e.target.value }))} className={inputCls} placeholder="Purity" />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">Result Value *</label>
              <input required value={coaForm.value} onChange={(e) => setCoaForm((p) => ({ ...p, value: e.target.value }))} className={inputCls} placeholder="99.5%" />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">Specification</label>
              <input value={coaForm.specification} onChange={(e) => setCoaForm((p) => ({ ...p, specification: e.target.value }))} className={inputCls} placeholder=">= 99.0%" />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">Status *</label>
              <select value={coaForm.status} onChange={(e) => setCoaForm((p) => ({ ...p, status: e.target.value }))} className={inputCls}>
                <option value="pass">pass</option>
                <option value="fail">fail</option>
              </select>
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">Digital Signature</label>
              <input value={coaForm.digitalSignature} onChange={(e) => setCoaForm((p) => ({ ...p, digitalSignature: e.target.value }))} className={inputCls} />
            </div>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={coaSubmitting}
              className="px-5 py-2 rounded-lg bg-emerald-500 text-white text-sm font-semibold hover:bg-emerald-600 transition disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {coaSubmitting ? 'Adding CoA...' : 'Add CoA'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
