'use client';

import { useEffect, useState } from 'react';
import { ApiClient } from '@/lib/api-client';
import { PlatformStats, QuoteRequest, ContactMessage } from '@/types/api';
import Link from 'next/link';

export default function AdminDashboard() {
  const [stats, setStats] = useState<PlatformStats | null>(null);
  const [recentQuotes, setRecentQuotes] = useState<QuoteRequest[]>([]);
  const [recentContacts, setRecentContacts] = useState<ContactMessage[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [s, q, c] = await Promise.all([
          ApiClient.getStats().catch(() => null),
          ApiClient.getQuotes(undefined, 0, 5).catch(() => null),
          ApiClient.getContacts(undefined, 0, 5).catch(() => null),
        ]);
        setStats(s);
        if (q) setRecentQuotes(q.content);
        if (c) setRecentContacts(c.content);
      } catch (err) {
        console.error('Dashboard error:', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const fmt = (d: string) => new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

  const statusColor: Record<string, string> = {
    PENDING: 'bg-amber-50 text-amber-700',
    REVIEWED: 'bg-blue-50 text-blue-700',
    QUOTED: 'bg-emerald-50 text-emerald-700',
    REJECTED: 'bg-red-50 text-red-700',
    NEW: 'bg-sky-50 text-sky-700',
    READ: 'bg-purple-50 text-purple-700',
    REPLIED: 'bg-emerald-50 text-emerald-700',
    ARCHIVED: 'bg-slate-100 text-slate-500',
  };

  const dotColor: Record<string, string> = {
    PENDING: 'bg-amber-400',
    REVIEWED: 'bg-blue-400',
    QUOTED: 'bg-emerald-400',
    REJECTED: 'bg-red-400',
    NEW: 'bg-sky-400',
    READ: 'bg-purple-400',
    REPLIED: 'bg-emerald-400',
    ARCHIVED: 'bg-slate-400',
  };

  const statCards = [
    { label: 'Total Products', value: stats?.productCount || '...', bg: 'bg-blue-50', fg: 'text-blue-500',
      icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg> },
    { label: 'Verified Suppliers', value: stats?.verifiedSuppliers || '...', bg: 'bg-emerald-50', fg: 'text-emerald-500',
      icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> },
    { label: 'Countries Served', value: stats?.countriesServed || '...', bg: 'bg-purple-50', fg: 'text-purple-500',
      icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg> },
    { label: 'Support', value: stats?.supportAvailability || '...', bg: 'bg-amber-50', fg: 'text-amber-500',
      icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg> },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Dashboard</h1>
        <p className="text-sm text-slate-400 mt-1">Overview of your platform</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statCards.map((s, i) => (
          <div key={i} className="bg-white rounded-xl border border-slate-200 p-5 flex items-start gap-4 hover:shadow-md transition-shadow">
            <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${s.bg} ${s.fg}`}>{s.icon}</div>
            <div>
              <p className="text-xs font-medium text-slate-400">{s.label}</p>
              <p className="text-2xl font-bold text-slate-800 tracking-tight">{s.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Quotes */}
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
            <h2 className="font-semibold text-slate-800">Recent Quotes</h2>
            <Link href="/admin/quotes" className="text-xs font-medium text-blue-500 hover:text-blue-600">View All &rarr;</Link>
          </div>
          <table className="w-full text-sm">
            <thead><tr className="bg-slate-50 text-xs font-semibold uppercase tracking-wider text-slate-400">
              <th className="text-left px-5 py-3">Name</th><th className="text-left px-5 py-3">Product</th><th className="text-left px-5 py-3">Status</th><th className="text-left px-5 py-3">Date</th>
            </tr></thead>
            <tbody>
              {recentQuotes.length === 0 ? (
                <tr><td colSpan={4} className="px-5 py-8 text-center text-slate-400">{isLoading ? 'Loading...' : 'No quotes yet'}</td></tr>
              ) : recentQuotes.map((q) => (
                <tr key={q.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                  <td className="px-5 py-3 font-medium text-slate-700">{q.name}</td>
                  <td className="px-5 py-3 text-slate-400">{q.productName || '—'}</td>
                  <td className="px-5 py-3">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold ${statusColor[q.status] || ''}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${dotColor[q.status] || ''}`} />{q.status}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-slate-400">{fmt(q.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Recent Messages */}
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
            <h2 className="font-semibold text-slate-800">Recent Messages</h2>
            <Link href="/admin/contacts" className="text-xs font-medium text-blue-500 hover:text-blue-600">View All &rarr;</Link>
          </div>
          <table className="w-full text-sm">
            <thead><tr className="bg-slate-50 text-xs font-semibold uppercase tracking-wider text-slate-400">
              <th className="text-left px-5 py-3">Name</th><th className="text-left px-5 py-3">Subject</th><th className="text-left px-5 py-3">Status</th><th className="text-left px-5 py-3">Date</th>
            </tr></thead>
            <tbody>
              {recentContacts.length === 0 ? (
                <tr><td colSpan={4} className="px-5 py-8 text-center text-slate-400">{isLoading ? 'Loading...' : 'No messages yet'}</td></tr>
              ) : recentContacts.map((c) => (
                <tr key={c.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                  <td className="px-5 py-3 font-medium text-slate-700">{c.name}</td>
                  <td className="px-5 py-3 text-slate-400">{c.subject}</td>
                  <td className="px-5 py-3">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold ${statusColor[c.status] || ''}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${dotColor[c.status] || ''}`} />{c.status}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-slate-400">{fmt(c.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
