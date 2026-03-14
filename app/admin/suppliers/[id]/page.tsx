'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { ApiClient } from '@/lib/api-client';
import { SupplierProfile, VerificationStatus } from '@/types/api';
import Link from 'next/link';

const STATUSES: VerificationStatus[] = ['PENDING', 'VERIFIED', 'SUSPENDED'];

const verificationLabels: Record<string, string> = {
  siteAuditPassed: 'Site Audit Passed',
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

export default function AdminSupplierDetailPage() {
  const params = useParams();
  const id = params.id as string;

  const [supplier, setSupplier] = useState<SupplierProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    ApiClient.getAdminSupplierById(id)
      .then(setSupplier)
      .catch((err) => console.error('Failed to fetch supplier:', err))
      .finally(() => setIsLoading(false));
  }, [id]);

  const handleStatusUpdate = async (status: VerificationStatus) => {
    setUpdating(true);
    try {
      const updated = await ApiClient.updateSupplierStatus(id, status);
      setSupplier(updated);
      setMessage(`Status updated to ${status}`);
      setTimeout(() => setMessage(''), 3000);
    } catch (err: unknown) {
      setMessage(err instanceof Error ? err.message : 'Failed to update status');
    } finally {
      setUpdating(false);
    }
  };

  const fmt = (d: string) => new Date(d).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

  if (isLoading) return <div className="flex items-center justify-center py-20 text-slate-400">Loading...</div>;
  if (!supplier) return <div className="flex items-center justify-center py-20 text-slate-400">Supplier not found</div>;

  return (
    <div>
      <Link href="/admin/suppliers" className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-blue-500 transition-colors mb-6">
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="15 18 9 12 15 6"/></svg>
        Back to Suppliers
      </Link>

      {message && (
        <div className={`mb-4 px-4 py-3 rounded-lg text-sm font-medium border ${message.startsWith('Failed') ? 'bg-red-50 border-red-200 text-red-700' : 'bg-emerald-50 border-emerald-200 text-emerald-700'}`}>
          {message}
        </div>
      )}

      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">{supplier.companyName}</h1>
          <p className="text-sm text-slate-400 mt-1">Joined {fmt(supplier.createdAt)}</p>
        </div>
        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-semibold ${statusColor[supplier.verificationStatus]}`}>
          <span className={`w-2 h-2 rounded-full ${dotColor[supplier.verificationStatus]}`} />
          {supplier.verificationStatus}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left */}
        <div className="lg:col-span-2 space-y-6">
          {/* Supplier Info */}
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-100">
              <h2 className="font-semibold text-slate-800">Supplier Information</h2>
            </div>
            <div className="p-5 grid grid-cols-2 gap-5">
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
                  <p className="text-sm text-slate-700 whitespace-pre-wrap bg-slate-50 rounded-lg p-3">{supplier.description}</p>
                </div>
              )}
            </div>
          </div>

          {/* Verification Checklist */}
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-100">
              <h2 className="font-semibold text-slate-800">Verification Checklist</h2>
            </div>
            <div className="p-5 space-y-3">
              {!supplier.verification ? (
                <p className="text-sm text-slate-400">Verification not yet started.</p>
              ) : (
                <>
                  {Object.entries(verificationLabels).map(([key, label]) => {
                    const val = supplier.verification![key as keyof typeof supplier.verification] as boolean;
                    return (
                      <div key={key} className="flex items-center gap-2.5">
                        <span className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 ${val ? 'bg-emerald-100' : 'bg-slate-100'}`}>
                          {val ? (
                            <svg className="w-2.5 h-2.5 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
                          ) : (
                            <svg className="w-2.5 h-2.5 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                          )}
                        </span>
                        <span className={`text-sm ${val ? 'text-slate-700' : 'text-slate-400'}`}>{label}</span>
                      </div>
                    );
                  })}
                  {supplier.verification.siteAuditDate && (
                    <div className="flex items-center justify-between text-sm pt-1">
                      <span className="text-slate-500">Site Audit Date</span>
                      <span className="text-slate-700 font-medium">{new Date(supplier.verification.siteAuditDate).toLocaleDateString()}</span>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>

        {/* Right */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-100">
              <h2 className="font-semibold text-slate-800">Update Status</h2>
            </div>
            <div className="p-5 space-y-2">
              {STATUSES.map((s) => (
                <button key={s} onClick={() => handleStatusUpdate(s)} disabled={updating || supplier.verificationStatus === s}
                  className={`w-full py-2 px-3 rounded-lg text-sm font-medium transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed
                    ${supplier.verificationStatus === s
                      ? 'bg-blue-500 text-white'
                      : 'bg-slate-50 text-slate-600 hover:bg-slate-100'}`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
