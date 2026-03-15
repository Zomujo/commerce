'use client';

import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ApiClient } from '@/lib/api-client';
import FileUpload, { FileUploadHandle } from '@/app/components/FileUpload';
import Link from 'next/link';

export default function CreateSupplierProfilePage() {
  const router = useRouter();
  const logoRef = useRef<FileUploadHandle>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    companyName: '',
    country: '',
    contactEmail: '',
    contactPhone: '',
    description: '',
    website: '',
    certifications: '',
    logoUrl: '',
  });

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((prev) => ({ ...prev, [k]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    try {
      const uploadedLogoUrl = await logoRef.current?.upload() ?? form.logoUrl;

      const certs = form.certifications
        ? form.certifications.split(',').map((c) => c.trim()).filter(Boolean)
        : [];

      const payload = {
        companyName: form.companyName,
        country: form.country,
        contactEmail: form.contactEmail,
        ...(form.contactPhone && { contactPhone: form.contactPhone }),
        ...(form.description && { description: form.description }),
        ...(form.website && { website: form.website }),
        ...(uploadedLogoUrl && { logoUrl: uploadedLogoUrl }),
        ...(certs.length > 0 && { certifications: certs }),
      };
      const created = await ApiClient.createSupplier(payload);

      router.push(`/supplier/profile/${created.id}`);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to create profile');
    } finally {
      setSubmitting(false);
    }
  };

  const inputCls = 'w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition';

  return (
    <div className="max-w-2xl">
      <Link href="/supplier" className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-emerald-500 transition-colors mb-6">
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="15 18 9 12 15 6"/></svg>
        Back to Dashboard
      </Link>

      <h1 className="text-2xl font-bold text-slate-800 tracking-tight mb-1">Create Supplier Profile</h1>
      <p className="text-sm text-slate-400 mb-6">Fill in your business details to get started.</p>

      {error && (
        <div className="mb-4 px-4 py-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">{error}</div>
      )}

      <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-slate-200 p-6 space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">Company Name *</label>
            <input required value={form.companyName} onChange={set('companyName')} className={inputCls} placeholder="Acme Mining Co." />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">Country *</label>
            <input required value={form.country} onChange={set('country')} className={inputCls} placeholder="Ghana" />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">Contact Email *</label>
            <input required type="email" value={form.contactEmail} onChange={set('contactEmail')} className={inputCls} placeholder="contact@company.com" />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">Contact Phone</label>
            <input value={form.contactPhone} onChange={set('contactPhone')} className={inputCls} placeholder="+233 ..." />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">Website</label>
            <input value={form.website} onChange={set('website')} className={inputCls} placeholder="https://company.com" />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">Certifications</label>
            <input value={form.certifications} onChange={set('certifications')} className={inputCls} placeholder="ISO 9001, REACH (comma-separated)" />
          </div>
        </div>
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">Description</label>
          <textarea value={form.description} onChange={set('description')} rows={3}
            className={`${inputCls} resize-y`} placeholder="Brief description of your business..." />
        </div>
        <FileUpload
          ref={logoRef}
          label="Company Logo"
          value={form.logoUrl}
          onChange={(url) => setForm((prev) => ({ ...prev, logoUrl: url }))}
          placeholder="https:// or upload logo"
        />
        <div className="pt-2 flex justify-end gap-3">
          <Link href="/supplier" className="px-4 py-2 rounded-lg border border-slate-200 text-sm text-slate-600 hover:bg-slate-50 transition">
            Cancel
          </Link>
          <button type="submit" disabled={submitting}
            className="px-5 py-2 rounded-lg bg-emerald-500 text-white text-sm font-semibold hover:bg-emerald-600 transition disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer">
            {submitting ? 'Creating...' : 'Create Profile'}
          </button>
        </div>
      </form>
    </div>
  );
}
