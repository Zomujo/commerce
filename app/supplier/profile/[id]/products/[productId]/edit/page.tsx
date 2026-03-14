'use client';

import { useEffect, useRef, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ApiClient } from '@/lib/api-client';
import { StrategicVertical } from '@/types/api';
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
  const [form, setForm] = useState({
    name: '',
    verticalId: '',
    originCountry: '',
    purityGrade: '',
    image: '',
    description: '',
    originSite: '',
    coaUrl: '',
    qaPartner: '',
    badge: '',
    certifications: '',
  });

  useEffect(() => {
    const load = async () => {
      try {
        const [product, verts] = await Promise.all([
          ApiClient.getSupplierProductById(productId),
          ApiClient.getVerticals(),
        ]);
        setVerticals(verts);
        setForm({
          name: product.name,
          verticalId: product.verticalId,
          originCountry: product.originCountry,
          purityGrade: product.purityGrade,
          image: product.image,
          description: product.description || '',
          originSite: product.originSite || '',
          coaUrl: '',
          qaPartner: '',
          badge: product.badge || '',
          certifications: product.certifications.join(', '),
        });
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
      await imageRef.current?.upload();
      const certs = form.certifications
        ? form.certifications.split(',').map((c) => c.trim()).filter(Boolean)
        : [];
      await ApiClient.updateSupplierProduct(productId, {
        name: form.name,
        verticalId: form.verticalId,
        originCountry: form.originCountry,
        purityGrade: form.purityGrade,
        image: form.image,
        ...(form.description && { description: form.description }),
        ...(form.originSite && { originSite: form.originSite }),
        ...(form.coaUrl && { coaUrl: form.coaUrl }),
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
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">CoA URL</label>
            <input value={form.coaUrl} onChange={set('coaUrl')} className={inputCls} />
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
    </div>
  );
}
