'use client';

import { useEffect, useState } from 'react';
import { ApiClient } from '@/lib/api-client';
import { SupplierSummary, VerificationStatus } from '@/types/api';
import Link from 'next/link';

const STATUS_OPTIONS = [
  { value: '', label: 'All' },
  { value: 'PENDING', label: 'Pending' },
  { value: 'VERIFIED', label: 'Verified' },
  { value: 'SUSPENDED', label: 'Suspended' },
];

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

export default function AdminSuppliersPage() {
  const [suppliers, setSuppliers] = useState<SupplierSummary[]>([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [filter, setFilter] = useState('');
  const [emailSearch, setEmailSearch] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const fetchSuppliers = async (p: number, status: string) => {
    setIsLoading(true);
    try {
      const statusEnum = status ? (status as VerificationStatus) : undefined;
      const data = await ApiClient.getAdminSuppliers(statusEnum, p, 15);
      setSuppliers(data.content);
      setTotalPages(data.totalPages);
      setTotalElements(data.totalElements);
    } catch (err) {
      console.error('Failed to fetch suppliers:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSuppliers(page, filter);
  }, [page, filter]);

  const fmt = (d: string) => new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Suppliers</h1>
          <p className="text-sm text-slate-400 mt-1">{totalElements} total suppliers</p>
        </div>
      </div>

      {/* Email search */}
      <div className="flex items-center gap-2 mb-4">
        <form onSubmit={async (e) => {
          e.preventDefault();
          if (!emailSearch.trim()) return;
          setIsLoading(true);
          try {
            const result = await ApiClient.getAdminSuppliersByEmail(emailSearch.trim());
            setSuppliers([result as unknown as SupplierSummary]);
            setTotalPages(1);
            setTotalElements(1);
          } catch {
            setSuppliers([]);
            setTotalPages(0);
            setTotalElements(0);
          } finally {
            setIsLoading(false);
          }
        }} className="flex gap-2 w-full max-w-sm">
          <input
            type="email"
            value={emailSearch}
            onChange={(e) => setEmailSearch(e.target.value)}
            placeholder="Search by email..."
            className="flex-1 px-3 py-1.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition"
          />
          <button type="submit" className="px-3 py-1.5 rounded-lg bg-slate-800 text-white text-sm font-medium hover:bg-slate-700 transition cursor-pointer">
            Search
          </button>
          {emailSearch && (
            <button type="button" onClick={() => { setEmailSearch(''); fetchSuppliers(0, filter); }}
              className="px-3 py-1.5 rounded-lg border border-slate-200 text-slate-500 text-sm hover:bg-slate-50 transition cursor-pointer">
              Clear
            </button>
          )}
        </form>
      </div>

      <div className="flex items-center gap-2 mb-5">
        {STATUS_OPTIONS.map((opt) => (
          <button key={opt.value} onClick={() => { setPage(0); setFilter(opt.value); }}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-colors cursor-pointer
              ${filter === opt.value
                ? 'bg-blue-500 border-blue-500 text-white'
                : 'bg-white border-slate-200 text-slate-500 hover:border-blue-400 hover:text-blue-500'}`}
          >
            {opt.label}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50/80 text-xs font-semibold uppercase tracking-wider text-slate-400">
                <th className="text-left px-5 py-3">Company</th>
                <th className="text-left px-5 py-3">Country</th>
                <th className="text-left px-5 py-3">Contact Email</th>
                <th className="text-left px-5 py-3">Status</th>
                <th className="text-left px-5 py-3">Joined</th>
                <th className="text-left px-5 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr><td colSpan={6} className="px-5 py-12 text-center text-slate-400">Loading...</td></tr>
              ) : suppliers.length === 0 ? (
                <tr><td colSpan={6} className="px-5 py-12 text-center text-slate-400">No suppliers found</td></tr>
              ) : suppliers.map((s) => (
                <tr key={s.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                  <td className="px-5 py-3.5 font-medium text-slate-700">{s.companyName}</td>
                  <td className="px-5 py-3.5 text-slate-500">{s.country}</td>
                  <td className="px-5 py-3.5 text-slate-500">{s.contactEmail}</td>
                  <td className="px-5 py-3.5">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold ${statusColor[s.verificationStatus] || ''}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${dotColor[s.verificationStatus] || ''}`} />
                      {s.verificationStatus}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-slate-400 whitespace-nowrap">{fmt(s.createdAt)}</td>
                  <td className="px-5 py-3.5">
                    <Link href={`/admin/suppliers/${s.id}`}
                      className="text-xs font-medium text-blue-500 hover:text-blue-600">View &rarr;</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <div className="flex items-center justify-between px-5 py-3 border-t border-slate-100 text-xs text-slate-400">
            <span>Page {page + 1} of {totalPages}</span>
            <div className="flex gap-2">
              <button onClick={() => setPage((p) => Math.max(0, p - 1))} disabled={page === 0}
                className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer">
                Previous
              </button>
              <button onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))} disabled={page >= totalPages - 1}
                className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer">
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
