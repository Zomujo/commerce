'use client';

import { useEffect, useState } from 'react';
import { ApiClient } from '@/lib/api-client';
import { ContactMessage, MessageStatus } from '@/types/api';
import Link from 'next/link';

const STATUS_OPTIONS = [
  { value: '', label: 'All' },
  { value: 'NEW', label: 'New' },
  { value: 'READ', label: 'Read' },
  { value: 'REPLIED', label: 'Replied' },
  { value: 'ARCHIVED', label: 'Archived' },
];

const statusColor: Record<string, string> = {
  NEW: 'bg-sky-50 text-sky-700',
  READ: 'bg-purple-50 text-purple-700',
  REPLIED: 'bg-emerald-50 text-emerald-700',
  ARCHIVED: 'bg-slate-100 text-slate-500',
};
const dotColor: Record<string, string> = {
  NEW: 'bg-sky-400',
  READ: 'bg-purple-400',
  REPLIED: 'bg-emerald-400',
  ARCHIVED: 'bg-slate-400',
};

export default function AdminContactsPage() {
  const [contacts, setContacts] = useState<ContactMessage[]>([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [filter, setFilter] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const fetchContacts = async (p: number, status: string) => {
    setIsLoading(true);
    try {
      const statusEnum = status ? (status as MessageStatus) : undefined;
      const data = await ApiClient.getContacts(statusEnum, p, 15);
      setContacts(data.content);
      setTotalPages(data.totalPages);
      setTotalElements(data.totalElements);
    } catch (err) {
      console.error('Failed to fetch contacts:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts(page, filter);
  }, [page, filter]);

  const fmt = (d: string) => new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Messages</h1>
          <p className="text-sm text-slate-400 mt-1">{totalElements} total messages</p>
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
                <th className="text-left px-5 py-3">Subject</th>
                <th className="text-left px-5 py-3">Status</th>
                <th className="text-left px-5 py-3">Date</th>
                <th className="text-left px-5 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr><td colSpan={6} className="px-5 py-12 text-center text-slate-400">Loading...</td></tr>
              ) : contacts.length === 0 ? (
                <tr><td colSpan={6} className="px-5 py-12 text-center text-slate-400">No messages found</td></tr>
              ) : contacts.map((c) => (
                <tr key={c.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                  <td className="px-5 py-3.5 font-medium text-slate-700">{c.name}</td>
                  <td className="px-5 py-3.5 text-slate-500">{c.email}</td>
                  <td className="px-5 py-3.5 text-slate-500">{c.subject}</td>
                  <td className="px-5 py-3.5">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold ${statusColor[c.status] || ''}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${dotColor[c.status] || ''}`} />
                      {c.status}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-slate-400 whitespace-nowrap">{fmt(c.createdAt)}</td>
                  <td className="px-5 py-3.5">
                    <Link href={`/admin/contacts/${c.id}`}
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
