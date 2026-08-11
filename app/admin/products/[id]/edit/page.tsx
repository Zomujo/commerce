'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import FileUpload, { FileUploadHandle } from '@/app/components/FileUpload';
import { ApiClient } from '@/lib/api-client';
import { AdminSupplierSummary, StrategicVertical } from '@/types/api';

function parseSpecifications(value: string) {
  return value.split('\n').reduce<Record<string, string>>((specifications, line) => {
    const [key, ...values] = line.split(':');
    if (key.trim() && values.join(':').trim()) specifications[key.trim()] = values.join(':').trim();
    return specifications;
  }, {});
}

export default function EditAdminProductPage() {
  const params = useParams();
  const router = useRouter();
  const productId = params.id as string;
  const imageRef = useRef<FileUploadHandle>(null);
  const [verticals, setVerticals] = useState<StrategicVertical[]>([]);
  const [suppliers, setSuppliers] = useState<AdminSupplierSummary[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({ name: '', verticalId: '', supplierId: '', originCountry: '', originSite: '', purityGrade: '', image: '', description: '', qaPartner: '', badge: '', certifications: '', specifications: '' });

  useEffect(() => {
    Promise.all([ApiClient.getAdminProductById(productId), ApiClient.getVerticals(), ApiClient.getAdminSuppliers(0, 100)])
      .then(([product, loadedVerticals, supplierPage]) => {
        const verticalId = loadedVerticals.find((vertical) => vertical.name === product.verticalName)?.id || '';
        setVerticals(loadedVerticals);
        setSuppliers(supplierPage.content);
        setForm({
          name: product.name, verticalId, supplierId: product.supplier?.id || '', originCountry: product.originCountry,
          originSite: product.originSite || '', purityGrade: product.purityGrade, image: product.image,
          description: product.description || '', qaPartner: product.qaPartner || '', badge: product.badge || '',
          certifications: product.certifications.join(', '), specifications: Object.entries(product.specifications || {}).map(([name, value]) => `${name}: ${value}`).join('\n'),
        });
      }).catch((loadError) => setError(loadError instanceof Error ? loadError.message : 'Failed to load product.'))
      .finally(() => setIsLoading(false));
  }, [productId]);

  const set = (key: keyof typeof form) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => setForm((current) => ({ ...current, [key]: event.target.value }));

  const save = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');
    setIsSaving(true);
    try {
      const image = (await imageRef.current?.upload()) ?? form.image.trim();
      if (!image) throw new Error('A product image is required.');
      const certifications = form.certifications.split(',').map((item) => item.trim()).filter(Boolean);
      const specifications = parseSpecifications(form.specifications);
      await ApiClient.updateAdminProduct(productId, {
        name: form.name.trim(), verticalId: form.verticalId, supplierId: form.supplierId || null,
        originCountry: form.originCountry.trim(), originSite: form.originSite.trim() || undefined,
        purityGrade: form.purityGrade.trim(), image, description: form.description.trim() || undefined,
        qaPartner: form.qaPartner.trim() || undefined, badge: form.badge.trim() || undefined,
        certifications, specifications,
      });
      router.push(`/admin/products/${productId}`);
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : 'Failed to update product.');
    } finally {
      setIsSaving(false);
    }
  };

  const inputClass = 'w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500';
  if (isLoading) return <p className="text-sm text-slate-400">Loading product...</p>;

  return (
    <div className="max-w-3xl">
      <Link href={`/admin/products/${productId}`} className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-blue-500 transition-colors mb-6">← Back to product</Link>
      <h1 className="text-2xl font-bold text-slate-800 tracking-tight mb-2">Edit product</h1>
      <p className="text-sm text-slate-400 mb-8">Update the public catalogue listing and its supplier association.</p>
      <form onSubmit={save} className="bg-white rounded-xl border border-slate-200 p-6 space-y-5">
        {error && <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="sm:col-span-2"><label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">Product name *</label><input required value={form.name} onChange={set('name')} className={inputClass} /></div>
          <div><label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">Vertical *</label><select required value={form.verticalId} onChange={set('verticalId')} className={inputClass}><option value="">Select a vertical...</option>{verticals.map((vertical) => <option key={vertical.id} value={vertical.id}>{vertical.name}</option>)}</select></div>
          <div><label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">Supplier</label><select value={form.supplierId} onChange={set('supplierId')} className={inputClass}><option value="">No supplier assigned</option>{suppliers.map((supplier) => <option key={supplier.id} value={supplier.id}>{supplier.companyName} ({supplier.country})</option>)}</select><p className="mt-1 text-xs text-slate-400">Selecting no supplier unlinks the current supplier.</p></div>
          <div><label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">Origin country *</label><input required value={form.originCountry} onChange={set('originCountry')} className={inputClass} /></div>
          <div><label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">Purity grade *</label><input required value={form.purityGrade} onChange={set('purityGrade')} className={inputClass} /></div>
          <div><label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">Origin site</label><input value={form.originSite} onChange={set('originSite')} className={inputClass} /></div>
          <div><label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">QA partner</label><input value={form.qaPartner} onChange={set('qaPartner')} className={inputClass} /></div>
          <div><label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">Badge</label><input value={form.badge} onChange={set('badge')} className={inputClass} /></div>
          <div className="sm:col-span-2"><FileUpload ref={imageRef} label="Product image *" value={form.image} onChange={(image) => setForm((current) => ({ ...current, image }))} /></div>
          <div className="sm:col-span-2"><label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">Certifications</label><input value={form.certifications} onChange={set('certifications')} className={inputClass} placeholder="ISO 9001, REACH" /></div>
        </div>
        <div><label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">Description</label><textarea value={form.description} onChange={set('description')} rows={3} className={`${inputClass} resize-y`} /></div>
        <div><label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">Specifications</label><textarea value={form.specifications} onChange={set('specifications')} rows={4} className={`${inputClass} resize-y font-mono`} /><p className="mt-1.5 text-xs text-slate-400">Enter one specification per line as Name: Value.</p></div>
        <div className="flex gap-3 pt-2"><button type="submit" disabled={isSaving} className="px-4 py-2 rounded-lg bg-blue-500 text-white text-sm font-semibold hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer">{isSaving ? 'Saving...' : 'Save changes'}</button><Link href={`/admin/products/${productId}`} className="px-4 py-2 rounded-lg border border-slate-200 text-sm font-medium text-slate-600 hover:bg-slate-50">Cancel</Link></div>
      </form>
    </div>
  );
}
