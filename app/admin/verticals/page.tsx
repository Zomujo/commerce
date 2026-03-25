'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ApiClient } from '@/lib/api-client';
import { StrategicVertical } from '@/types/api';

export default function AdminVerticalsPage() {
  const [verticals, setVerticals] = useState<StrategicVertical[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setIsLoading(true);
      try {
        const data = await ApiClient.getVerticals();
        if (!cancelled) setVerticals(data);
      } catch (err) {
        console.error('Failed to fetch verticals:', err);
        if (!cancelled) setVerticals([]);
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Verticals</h1>
          <p className="text-sm text-slate-400 mt-1">
            {isLoading ? 'Loading…' : `${verticals.length} strategic vertical${verticals.length === 1 ? '' : 's'}`}
          </p>
        </div>
        <Link
          href="/admin/verticals/new"
          className="px-4 py-2 rounded-lg bg-blue-500 text-white text-sm font-semibold hover:bg-blue-600 transition-colors"
        >
          New vertical
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50/80 text-xs font-semibold uppercase tracking-wider text-slate-400">
                <th className="text-left px-5 py-3">Name</th>
                <th className="text-left px-5 py-3">Tagline</th>
                <th className="text-left px-5 py-3">ID</th>
                <th className="text-left px-5 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={4} className="px-5 py-12 text-center text-slate-400">
                    Loading…
                  </td>
                </tr>
              ) : verticals.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-5 py-12 text-center text-slate-400">
                    No verticals found
                  </td>
                </tr>
              ) : (
                verticals.map((v) => (
                  <tr key={v.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                    <td className="px-5 py-3.5 font-medium text-slate-700">{v.name}</td>
                    <td className="px-5 py-3.5 text-slate-500 max-w-md truncate">{v.tagline || '—'}</td>
                    <td className="px-5 py-3.5 text-slate-400 font-mono text-xs">{v.id}</td>
                    <td className="px-5 py-3.5">
                      <Link
                        href={`/admin/verticals/${v.id}/edit`}
                        className="text-xs font-medium text-blue-500 hover:text-blue-600"
                      >
                        Edit →
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
