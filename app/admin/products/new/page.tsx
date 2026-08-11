'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import FileUpload, { FileUploadHandle } from '@/app/components/FileUpload';
import { ApiClient } from '@/lib/api-client';
import { AdminSupplierSummary, StrategicVertical } from '@/types/api';

function parseSpecifications(value: string) {
  return value.split('\n').reduce<Record<string, string>>((specifications, line) => {
    const [key, ...values] = line.split(':');
    const trimmedKey = key.trim();
    const trimmedValue = values.join(':').trim();
    if (trimmedKey && trimmedValue) specifications[trimmedKey] = trimmedValue;
    return specifications;
  }, {});
}

export default function NewAdminProductPage() {
  const router = useRouter();
  const imageRef = useRef<FileUploadHandle>(null);
  const [verticals, setVerticals] = useState<StrategicVertical[]>([]);
  const [suppliers, setSuppliers] = useState<AdminSupplierSummary[]>([]);
  const [isLoadingOptions, setIsLoadingOptions] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    name: '', verticalId: '', supplierId: '', originCountry: '', originSite: '', purityGrade: '',
    image: '', description: '', qaPartner: '', badge: '', certifications: '', specifications: '',
  });

  useEffect(() => {
    Promise.all([
      ApiClient.getVerticals(),
      ApiClient.getAdminSuppliers(0, 100),
    ]).then(([loadedVerticals, supplierPage]) => {
      setVerticals(loadedVerticals);
      setSuppliers(supplierPage.content);
    }).catch((loadError) => {
      console.error('Failed to load product form options:', loadError);
      setError('Unable to load verticals or suppliers. Please refresh and try again.');
    }).finally(() => setIsLoadingOptions(false));
  }, []);

  const set = (key: keyof typeof form) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((current) => ({ ...current, [key]: event.target.value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');
    setIsSaving(true);
    try {
      const image = (await imageRef.current?.upload()) ?? form.image.trim();
      if (!image) throw new Error('A product image is required.');
      const certifications = form.certifications.split(',').map((item) => item.trim()).filter(Boolean);
      await ApiClient.createAdminProduct({
        name: form.name.trim(),
        verticalId: form.verticalId,
        originCountry: form.originCountry.trim(),
        purityGrade: form.purityGrade.trim(),
        image,
        ...(form.supplierId ? { supplierId: form.supplierId } : {}),
        ...(form.originSite.trim() ? { originSite: form.originSite.trim() } : {}),
        ...(form.description.trim() ? { description: form.description.trim() } : {}),
        ...(form.qaPartner.trim() ? { qaPartner: form.qaPartner.trim() } : {}),
        ...(form.badge.trim() ? { badge: form.badge.trim() } : {}),
        ...(certifications.length ? { certifications } : {}),
        ...(() => {
          const specifications = parseSpecifications(form.specifications);
          return Object.keys(specifications).length ? { specifications } : {};
        })(),
      });
      router.push('/admin/products');
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : 'Failed to create product.');
    } finally {
      setIsSaving(false);
    }
  };

  const inputClass = 'w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500';

  return (
    <div className="max-w-3xl">
      <Link href="/admin/products" className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-blue-500 transition-colors mb-6">← Back to products</Link>
      <h1 className="text-2xl font-bold text-slate-800 tracking-tight mb-2">New product</h1>
      <p className="text-sm text-slate-400 mb-8">Create and publish a product to the public catalogue.</p>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-slate-200 p-6 space-y-5">
        {error && <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">Product name *</label>
            <input required value={form.name} onChange={set('name')} className={inputClass} placeholder="e.g. Lithium Carbonate 99.5%" />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">Vertical *</label>
            <select required disabled={isLoadingOptions} value={form.verticalId} onChange={set('verticalId')} className={inputClass}>
              <option value="">Select a vertical...</option>
              {verticals.map((vertical) => <option key={vertical.id} value={vertical.id}>{vertical.name}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">Supplier</label>
            <select disabled={isLoadingOptions} value={form.supplierId} onChange={set('supplierId')} className={inputClass}>
              <option value="">No supplier assigned</option>
              {suppliers.map((supplier) => <option key={supplier.id} value={supplier.id}>{supplier.companyName} ({supplier.country})</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">Origin country *</label>
            <input required value={form.originCountry} onChange={set('originCountry')} className={inputClass} placeholder="Ghana" />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">Purity grade *</label>
            <input required value={form.purityGrade} onChange={set('purityGrade')} className={inputClass} placeholder="99.5%" />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">Origin site</label>
            <input value={form.originSite} onChange={set('originSite')} className={inputClass} placeholder="Mine or facility name" />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">QA partner</label>
            <input value={form.qaPartner} onChange={set('qaPartner')} className={inputClass} placeholder="SGS, Intertek, etc." />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">Badge</label>
            <input value={form.badge} onChange={set('badge')} className={inputClass} placeholder="e.g. ESG Certified" />
          </div>
          <div className="sm:col-span-2">
            <FileUpload ref={imageRef} label="Product image *" value={form.image} onChange={(image) => setForm((current) => ({ ...current, image }))} />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">Certifications</label>
            <input value={form.certifications} onChange={set('certifications')} className={inputClass} placeholder="ISO 9001, REACH (comma-separated)" />
          </div>
        </div>
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">Description</label>
          <textarea value={form.description} onChange={set('description')} rows={3} className={`${inputClass} resize-y`} placeholder="Brief product description..." />
        </div>
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">Specifications</label>
          <textarea value={form.specifications} onChange={set('specifications')} rows={4} className={`${inputClass} resize-y font-mono`} placeholder={'Purity: 99.5%\nPackaging: 25 kg bags'} />
          <p className="mt-1.5 text-xs text-slate-400">Enter one specification per line as Name: Value.</p>
        </div>
        <div className="flex gap-3 pt-2">
          <button type="submit" disabled={isSaving || isLoadingOptions} className="px-4 py-2 rounded-lg bg-blue-500 text-white text-sm font-semibold hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer">
            {isSaving ? 'Creating...' : 'Create product'}
          </button>
          <Link href="/admin/products" className="px-4 py-2 rounded-lg border border-slate-200 text-sm font-medium text-slate-600 hover:bg-slate-50">Cancel</Link>
        </div>
      </form>
    </div>
  );
}
