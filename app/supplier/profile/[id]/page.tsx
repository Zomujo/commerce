'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { ApiClient } from '@/lib/api-client';
import { SupplierProfile, SupplierProductResponse, Verification } from '@/types/api';
import Link from 'next/link';

const verificationLabels: Record<keyof Verification, string> = {
  siteAuditPassed: 'Site Audit Passed',
  siteAuditDate: 'Site Audit Date',
  financialSolvencyCheck: 'Financial Solvency Check',
  esgCompliance: 'ESG Compliance',
  documentsVerified: 'Documents Verified',
  operationalCapacityVerified: 'Operational Capacity Verified',
};

const statusColor: Record<string, string> = {
  PENDING: 'bg-amber-50 text-amber-700 border-amber-200',
  VERIFIED: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  SUSPENDED: 'bg-red-50 text-red-700 border-red-200',
};
const dotColor: Record<string, string> = {
  PENDING: 'bg-amber-400',
  VERIFIED: 'bg-emerald-400',
  SUSPENDED: 'bg-red-400',
};

export default function SupplierProfilePage() {
  const params = useParams();
  const id = params.id as string;

  const [supplier, setSupplier] = useState<SupplierProfile | null>(null);
  const [products, setProducts] = useState<SupplierProductResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [editForm, setEditForm] = useState({
    companyName: '',
    country: '',
    contactEmail: '',
    contactPhone: '',
    description: '',
    website: '',
    certifications: '',
  });

  useEffect(() => {
    const load = async () => {
      try {
        const [s, p] = await Promise.all([
          ApiClient.getSupplierById(id),
          ApiClient.getSupplierProducts(id),
        ]);
        setSupplier(s);
        setProducts(p);
        setEditForm({
          companyName: s.companyName,
          country: s.country,
          contactEmail: s.contactEmail,
          contactPhone: s.contactPhone || '',
          description: s.description || '',
          website: s.website || '',
          certifications: (s.certifications ?? []).join(', '),
        });
      } catch (err) {
        console.error('Failed to load supplier:', err);
      } finally {
        setIsLoading(false);
      }
    };
    load();
  }, [id]);


  const set = (k: keyof typeof editForm) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setEditForm((prev) => ({ ...prev, [k]: e.target.value }));

  const handleSave = async () => {
    setSaving(true);
    try {
      const certs = editForm.certifications
        ? editForm.certifications.split(',').map((c) => c.trim()).filter(Boolean)
        : [];
      const updated = await ApiClient.updateSupplier(id, {
        companyName: editForm.companyName,
        country: editForm.country,
        contactEmail: editForm.contactEmail,
        ...(editForm.contactPhone && { contactPhone: editForm.contactPhone }),
        ...(editForm.description && { description: editForm.description }),
        ...(editForm.website && { website: editForm.website }),
        certifications: certs,
      });
      setSupplier(updated);
      setEditing(false);
      setMessage('Profile updated successfully');
      setTimeout(() => setMessage(''), 3000);
    } catch (err: unknown) {
      setMessage(err instanceof Error ? err.message : 'Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  const inputCls = 'w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition';

  if (isLoading) return <div className="flex items-center justify-center py-20 text-slate-400">Loading...</div>;
  if (!supplier) return <div className="flex items-center justify-center py-20 text-slate-400">Supplier not found</div>;

  return (
    <div className="space-y-6">
      <Link href="/supplier" className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-emerald-500 transition-colors">
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="15 18 9 12 15 6"/></svg>
        Back to Dashboard
      </Link>

      {message && (
        <div className={`px-4 py-3 rounded-lg text-sm font-medium border ${message.startsWith('Failed') ? 'bg-red-50 border-red-200 text-red-700' : 'bg-emerald-50 border-emerald-200 text-emerald-700'}`}>
          {message}
        </div>
      )}

      {/* Header */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <div className="flex items-start gap-5">
          {supplier.logoUrl ? (
            <img src={supplier.logoUrl} alt="Company logo" className="w-20 h-20 rounded-xl object-cover border border-slate-200 flex-shrink-0" />
          ) : (
            <div className="w-20 h-20 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center flex-shrink-0">
              <span className="text-2xl font-bold text-slate-300">{supplier.companyName.charAt(0)}</span>
            </div>
          )}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold text-slate-800 tracking-tight">{supplier.companyName}</h1>
                <p className="text-sm text-slate-400 mt-0.5">{supplier.country}</p>
              </div>
              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${statusColor[supplier.verificationStatus]}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${dotColor[supplier.verificationStatus]}`} />
                {supplier.verificationStatus}
              </span>
            </div>
            <div className="mt-3 flex flex-wrap gap-4 text-sm text-slate-500">
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                {supplier.contactEmail}
              </span>
              {supplier.contactPhone && (
                <span className="flex items-center gap-1.5">
                  <svg className="w-4 h-4 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8a19.79 19.79 0 01-3.07-8.64A2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92v2z"/></svg>
                  {supplier.contactPhone}
                </span>
              )}
              {supplier.website && (
                <span className="flex items-center gap-1.5">
                  <svg className="w-4 h-4 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>
                  {supplier.website}
                </span>
              )}
            </div>
            {(supplier.certifications ?? []).length > 0 && (
              <div className="mt-3 flex flex-wrap gap-1.5">
                {(supplier.certifications ?? []).map((c) => (
                  <span key={c} className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 text-xs font-medium border border-emerald-100">{c}</span>
                ))}
              </div>
            )}
            {supplier.description && (
              <p className="mt-3 text-sm text-slate-500 leading-relaxed">{supplier.description}</p>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left — Products */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h2 className="font-semibold text-slate-800">Products</h2>
                <p className="text-xs text-slate-400 mt-0.5">{products.length} product{products.length !== 1 ? 's' : ''}</p>
              </div>
              <Link href={`/supplier/profile/${id}/products/new`}
                className="px-3.5 py-1.5 rounded-lg bg-emerald-500 text-white text-xs font-semibold hover:bg-emerald-600 transition">
                + Add Product
              </Link>
            </div>

            {products.length === 0 ? (
              <div className="px-5 py-12 text-center">
                <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-slate-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
                </div>
                <p className="text-sm text-slate-400">No products yet.</p>
                <Link href={`/supplier/profile/${id}/products/new`} className="mt-2 inline-block text-sm text-emerald-500 hover:text-emerald-600 font-medium">Add your first product →</Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-5">
                {products.map((p) => (
                  <div key={p.id} className="rounded-xl border border-slate-200 overflow-hidden hover:shadow-sm transition-shadow">
                    {p.image ? (
                      <div className="h-40 bg-slate-100 overflow-hidden">
                        <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                      </div>
                    ) : (
                      <div className="h-40 bg-slate-100 flex items-center justify-center">
                        <svg className="w-8 h-8 text-slate-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                      </div>
                    )}
                    <div className="p-4">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-semibold text-slate-800 text-sm leading-tight">{p.name}</h3>
                        {p.badge && (
                          <span className="flex-shrink-0 px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 text-xs font-medium border border-amber-100">{p.badge}</span>
                        )}
                      </div>
                      <div className="mt-2.5 space-y-1.5">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-slate-400">Vertical</span>
                          <span className="text-slate-600 font-medium">{p.verticalName ?? '—'}</span>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-slate-400">Origin</span>
                          <span className="text-slate-600 font-medium">{p.originCountry}</span>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-slate-400">Purity Grade</span>
                          <span className="text-slate-600 font-medium">{p.purityGrade}</span>
                        </div>
                        {p.originSite && (
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-slate-400">Origin Site</span>
                            <span className="text-slate-600 font-medium">{p.originSite}</span>
                          </div>
                        )}
                      </div>
                      {(p.certifications ?? []).length > 0 && (
                        <div className="mt-2.5 flex flex-wrap gap-1">
                          {(p.certifications ?? []).map((c) => (
                            <span key={c} className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-500 text-xs">{c}</span>
                          ))}
                        </div>
                      )}
                      <div className="mt-3 pt-3 border-t border-slate-100">
                        <Link href={`/supplier/profile/${id}/products/${p.id}/edit`} className="text-xs font-medium text-blue-500 hover:text-blue-600">Edit product →</Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right */}
        <div className="space-y-6">
          {/* Verification */}
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-100">
              <h2 className="font-semibold text-slate-800">Verification</h2>
            </div>
            <div className="p-5 space-y-3">
              {!supplier.verification ? (
                <p className="text-sm text-slate-400">Verification not yet started.</p>
              ) : (
                <>
                  {(Object.keys(verificationLabels) as (keyof typeof verificationLabels)[]).map((key) => {
                    if (key === 'siteAuditDate') {
                      return supplier.verification!.siteAuditDate ? (
                        <div key={key} className="flex items-center justify-between text-sm">
                          <span className="text-slate-500">{verificationLabels[key]}</span>
                          <span className="text-slate-700 font-medium">{new Date(supplier.verification!.siteAuditDate).toLocaleDateString()}</span>
                        </div>
                      ) : null;
                    }
                    const val = supplier.verification![key] as boolean;
                    return (
                      <div key={key} className="flex items-center gap-2.5">
                        <span className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 ${val ? 'bg-emerald-100' : 'bg-slate-100'}`}>
                          {val ? (
                            <svg className="w-2.5 h-2.5 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
                          ) : (
                            <svg className="w-2.5 h-2.5 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                          )}
                        </span>
                        <span className={`text-sm ${val ? 'text-slate-700' : 'text-slate-400'}`}>{verificationLabels[key]}</span>
                      </div>
                    );
                  })}
                </>
              )}
            </div>
          </div>

          {/* Edit Profile */}
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
              <h2 className="font-semibold text-slate-800">Edit Profile</h2>
              {!editing && (
                <button onClick={() => setEditing(true)} className="text-xs font-medium text-blue-500 hover:text-blue-600 cursor-pointer">Edit</button>
              )}
            </div>
            {editing ? (
              <div className="p-5 space-y-4">
                {([
                  ['companyName', 'Company Name', 'text'],
                  ['country', 'Country', 'text'],
                  ['contactEmail', 'Contact Email', 'email'],
                  ['contactPhone', 'Contact Phone', 'text'],
                  ['website', 'Website', 'text'],
                  ['certifications', 'Certifications (comma-separated)', 'text'],
                ] as [keyof typeof editForm, string, string][]).map(([k, label, type]) => (
                  <div key={k}>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">{label}</label>
                    <input type={type} value={editForm[k]} onChange={set(k)} className={inputCls} />
                  </div>
                ))}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">Description</label>
                  <textarea value={editForm.description} onChange={set('description')} rows={3} className={`${inputCls} resize-y`} />
                </div>
                <div className="flex gap-2 pt-1">
                  <button onClick={() => setEditing(false)} className="flex-1 py-2 px-3 rounded-lg border border-slate-200 text-sm text-slate-600 hover:bg-slate-50 transition cursor-pointer">
                    Cancel
                  </button>
                  <button onClick={handleSave} disabled={saving}
                    className="flex-1 py-2 px-3 rounded-lg bg-emerald-500 text-white text-sm font-medium hover:bg-emerald-600 transition disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer">
                    {saving ? 'Saving...' : 'Save'}
                  </button>
                </div>
              </div>
            ) : (
              <div className="px-5 py-4 text-sm text-slate-400">Click Edit to update your profile information.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
