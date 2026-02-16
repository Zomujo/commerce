'use client';

import { useEffect, useState } from 'react';
import { ApiClient } from '@/lib/api-client';
import { QuoteRequest, QuoteStatus, Page } from '@/types/api';
import Link from 'next/link';

const STATUS_OPTIONS = [
  { value: '', label: 'All' },
  { value: 'PENDING', label: 'Pending' },
  { value: 'REVIEWED', label: 'Reviewed' },
  { value: 'QUOTED', label: 'Quoted' },
  { value: 'REJECTED', label: 'Rejected' },
];

const statusColor: Record<string, string> = {
  PENDING: 'bg-amber-50 text-amber-700',
  REVIEWED: 'bg-blue-50 text-blue-700',
  QUOTED: 'bg-emerald-50 text-emerald-700',
  REJECTED: 'bg-red-50 text-red-700',
};
const dotColor: Record<string, string> = {
  PENDING: 'bg-amber-400',
  REVIEWED: 'bg-blue-400',
  QUOTED: 'bg-emerald-400',
  REJECTED: 'bg-red-400',
};

export default function AdminQuotesPage() {
  const [quotes, setQuotes] = useState<QuoteRequest[]>([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [filter, setFilter] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const fetchQuotes = async (p: number, status: string) => {
    setIsLoading(true);
    try {
      const statusEnum = status ? (status as QuoteStatus) : undefined;
      const data = await ApiClient.getQuotes(statusEnum, p, 15);
      setQuotes(data.content);
      setTotalPages(data.totalPages);
      setTotalElements(data.totalElements);
    } catch (err) {
      console.error('Failed to fetch quotes:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchQuotes(page, filter);
  }, [page, filter]);

  const fmt = (d: string) => new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Quote Requests</h1>
          <p className="text-sm text-slate-400 mt-1">{totalElements} total requests</p>
        </div>
      </div>

      {/* Filters */}
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

      {/* Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50/80 text-xs font-semibold uppercase tracking-wider text-slate-400">
                <th className="text-left px-5 py-3">Name</th>
                <th className="text-left px-5 py-3">Email</th>
                <th className="text-left px-5 py-3">Product</th>
                <th className="text-left px-5 py-3">Company</th>
                <th className="text-left px-5 py-3">Status</th>
                <th className="text-left px-5 py-3">Date</th>
                <th className="text-left px-5 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr><td colSpan={7} className="px-5 py-12 text-center text-slate-400">Loading...</td></tr>
              ) : quotes.length === 0 ? (
                <tr><td colSpan={7} className="px-5 py-12 text-center text-slate-400">No quote requests found</td></tr>
              ) : quotes.map((q) => (
                <tr key={q.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                  <td className="px-5 py-3.5 font-medium text-slate-700">{q.name}</td>
                  <td className="px-5 py-3.5 text-slate-500">{q.email}</td>
                  <td className="px-5 py-3.5 text-slate-500">{q.productName || '—'}</td>
                  <td className="px-5 py-3.5 text-slate-500">{q.company || '—'}</td>
                  <td className="px-5 py-3.5">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold ${statusColor[q.status] || ''}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${dotColor[q.status] || ''}`} />
                      {q.status}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-slate-400 whitespace-nowrap">{fmt(q.createdAt)}</td>
                  <td className="px-5 py-3.5">
                    <Link href={`/admin/quotes/${q.id}`}
                      className="text-xs font-medium text-blue-500 hover:text-blue-600">View &rarr;</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
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
