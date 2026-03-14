'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { ApiClient } from '@/lib/api-client';
import { SupplierProfile, SupplierProductResponse, Verification } from '@/types/api';
import FileUpload from '@/app/components/FileUpload';
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
  PENDING: 'bg-amber-50 text-amber-700',
  VERIFIED: 'bg-emerald-50 text-emerald-700',
  SUSPENDED: 'bg-red-50 text-red-700',
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
    <div>
      <Link href="/supplier" className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-emerald-500 transition-colors mb-6">
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="15 18 9 12 15 6"/></svg>
        Back to Dashboard
      </Link>

      {message && (
        <div className={`mb-4 px-4 py-3 rounded-lg text-sm font-medium border ${message.startsWith('Failed') ? 'bg-red-50 border-red-200 text-red-700' : 'bg-emerald-50 border-emerald-200 text-emerald-700'}`}>
          {message}
        </div>
      )}

      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">{supplier.companyName}</h1>
          <p className="text-sm text-slate-400 mt-1">{supplier.country}</p>
        </div>
        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-semibold ${statusColor[supplier.verificationStatus]}`}>
          <span className={`w-2 h-2 rounded-full ${dotColor[supplier.verificationStatus]}`} />
          {supplier.verificationStatus}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left */}
        <div className="lg:col-span-2 space-y-6">
          {/* Profile Info */}
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-100">
              <h2 className="font-semibold text-slate-800">Profile Information</h2>
            </div>
            <div className="p-5 grid grid-cols-2 gap-5">
              {supplier.logoUrl && (
                <div className="col-span-2 flex items-center gap-4">
                  <img src={supplier.logoUrl} alt="Company logo" className="w-16 h-16 rounded-xl object-cover border border-slate-200" />
                </div>
              )}
              {[
                ['Company Name', supplier.companyName],
                ['Country', supplier.country],
                ['Contact Email', supplier.contactEmail],
                ['Contact Phone', supplier.contactPhone || '—'],
                ['Website', supplier.website || '—'],
              ].map(([label, value]) => (
                <div key={label}>
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">{label}</p>
                  <p className="text-sm text-slate-700">{value}</p>
                </div>
              ))}
              {(supplier.certifications ?? []).length > 0 && (
                <div className="col-span-2">
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">Certifications</p>
                  <div className="flex flex-wrap gap-1.5">
                    {(supplier.certifications ?? []).map((c) => (
                      <span key={c} className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 text-xs font-medium">{c}</span>
                    ))}
                  </div>
                </div>
              )}
              {supplier.description && (
                <div className="col-span-2">
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">Description</p>
                  <p className="text-sm text-slate-700 whitespace-pre-wrap">{supplier.description}</p>
                </div>
              )}
            </div>
          </div>

          {/* Products */}
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
              <h2 className="font-semibold text-slate-800">Products</h2>
              <Link href={`/supplier/profile/${id}/products/new`}
                className="px-3.5 py-1.5 rounded-lg bg-emerald-500 text-white text-xs font-semibold hover:bg-emerald-600 transition">
                + Add Product
              </Link>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-50/80 text-xs font-semibold uppercase tracking-wider text-slate-400">
                    <th className="text-left px-5 py-3">Name</th>
                    <th className="text-left px-5 py-3">Vertical</th>
                    <th className="text-left px-5 py-3">Origin</th>
                    <th className="text-left px-5 py-3">Purity Grade</th>
                    <th className="text-left px-5 py-3"></th>
                  </tr>
                </thead>
                <tbody>
                  {products.length === 0 ? (
                    <tr><td colSpan={5} className="px-5 py-10 text-center text-slate-400">No products yet. Add your first product.</td></tr>
                  ) : products.map((p) => (
                    <tr key={p.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                      <td className="px-5 py-3.5 font-medium text-slate-700">{p.name}</td>
                      <td className="px-5 py-3.5 text-slate-500">{p.verticalId}</td>
                      <td className="px-5 py-3.5 text-slate-500">{p.originCountry}</td>
                      <td className="px-5 py-3.5 text-slate-500">{p.purityGrade}</td>
                      <td className="px-5 py-3.5">
                        <Link href={`/supplier/profile/${id}/products/${p.id}/edit`} className="text-xs font-medium text-blue-500 hover:text-blue-600">Edit</Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right */}
        <div className="space-y-6">
          {/* Verification Status */}
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-100">
              <h2 className="font-semibold text-slate-800">Verification Checklist</h2>
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
