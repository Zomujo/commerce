'use client';

import { useEffect, useState } from 'react';
import { ApiClient } from '@/lib/api-client';
import { SupplierSummary, VerificationStatus } from '@/types/api';
import Link from 'next/link';

const statusColor: Record<VerificationStatus, string> = {
  PENDING: 'bg-amber-50 text-amber-700',
  VERIFIED: 'bg-emerald-50 text-emerald-700',
  SUSPENDED: 'bg-red-50 text-red-700',
};
const dotColor: Record<VerificationStatus, string> = {
  PENDING: 'bg-amber-400',
  VERIFIED: 'bg-emerald-400',
  SUSPENDED: 'bg-red-400',
};

export default function SupplierDashboardPage() {
  const [suppliers, setSuppliers] = useState<SupplierSummary[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    ApiClient.getMySuppliers()
      .then(setSuppliers)
      .catch((err) => console.error('Failed to fetch suppliers:', err))
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return <div className="flex items-center justify-center py-20 text-slate-400">Loading...</div>;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">My Supplier Profiles</h1>
          <p className="text-sm text-slate-400 mt-1">{suppliers.length} profile{suppliers.length !== 1 ? 's' : ''}</p>
        </div>
        <Link href="/supplier/profile/new"
          className="px-4 py-2 rounded-lg bg-emerald-500 text-white text-sm font-semibold hover:bg-emerald-600 transition">
          + Create Profile
        </Link>
      </div>

      {suppliers.length === 0 ? (
        <div className="bg-white rounded-xl border border-slate-200 p-16 text-center">
          <div className="w-14 h-14 bg-slate-100 rounded-xl flex items-center justify-center mx-auto mb-4">
            <svg className="w-7 h-7 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
          </div>
          <p className="text-slate-700 font-semibold text-base mb-1">No supplier profiles yet</p>
          <p className="text-slate-400 text-sm mb-6">Create your first business profile to start listing products.</p>
          <Link href="/supplier/profile/new"
            className="inline-flex px-5 py-2.5 rounded-lg bg-emerald-500 text-white text-sm font-semibold hover:bg-emerald-600 transition">
            Create your supplier profile
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {suppliers.map((s) => (
            <div key={s.id} className="bg-white rounded-xl border border-slate-200 p-5 flex flex-col gap-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-semibold text-slate-800 text-base">{s.companyName}</p>
                  <p className="text-sm text-slate-400 mt-0.5">{s.country}</p>
                </div>
                <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold whitespace-nowrap ${statusColor[s.verificationStatus]}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${dotColor[s.verificationStatus]}`} />
                  {s.verificationStatus}
                </span>
              </div>
              <div className="text-sm text-slate-500">{s.contactEmail}</div>
              <div className="pt-2 border-t border-slate-100">
                <Link href={`/supplier/profile/${s.id}`}
                  className="text-sm font-medium text-emerald-600 hover:text-emerald-700">
                  Manage &rarr;
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
