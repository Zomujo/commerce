'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ApiClient } from '@/lib/api-client';
import { AdminSupplier } from '@/types/api';

export default function AdminSuppliersPage() {
  const [suppliers, setSuppliers] = useState<AdminSupplier[]>([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    ApiClient.getAdminSuppliers(page, 20).then((data) => {
      setSuppliers(data.content);
      setTotalPages(data.page?.totalPages ?? data.totalPages ?? 0);
      setTotalElements(data.page?.totalElements ?? data.totalElements ?? 0);
    }).catch((error) => console.error('Failed to fetch suppliers:', error)).finally(() => setIsLoading(false));
  }, [page]);

  return <div>
    <div className="flex items-start justify-between gap-4 mb-6"><div><h1 className="text-2xl font-bold text-slate-800 tracking-tight">Suppliers</h1><p className="text-sm text-slate-400 mt-1">{totalElements} supplier contacts</p></div><Link href="/admin/suppliers/new" className="px-4 py-2 rounded-lg bg-blue-500 text-white text-sm font-semibold hover:bg-blue-600 transition">Add supplier</Link></div>
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden"><div className="overflow-x-auto"><table className="w-full text-sm"><thead><tr className="bg-slate-50/80 text-xs font-semibold uppercase tracking-wider text-slate-400"><th className="text-left px-5 py-3">Company</th><th className="text-left px-5 py-3">Country</th><th className="text-left px-5 py-3">Email</th><th className="text-left px-5 py-3">Phone</th><th className="text-left px-5 py-3" /></tr></thead><tbody>{isLoading ? <tr><td colSpan={5} className="px-5 py-12 text-center text-slate-400">Loading...</td></tr> : suppliers.length === 0 ? <tr><td colSpan={5} className="px-5 py-12 text-center text-slate-400">No supplier contacts found</td></tr> : suppliers.map((supplier) => <tr key={supplier.id} className="border-b border-slate-50 hover:bg-slate-50/50"><td className="px-5 py-3.5 font-medium text-slate-700">{supplier.companyName}</td><td className="px-5 py-3.5 text-slate-500">{supplier.country}</td><td className="px-5 py-3.5 text-slate-500">{supplier.contactEmail}</td><td className="px-5 py-3.5 text-slate-500">{supplier.contactPhone || '—'}</td><td className="px-5 py-3.5"><Link href={`/admin/suppliers/${supplier.id}`} className="text-xs font-medium text-blue-500 hover:text-blue-600">View &rarr;</Link></td></tr>)}</tbody></table></div>{totalPages > 1 && <div className="flex items-center justify-between px-5 py-3 border-t border-slate-100 text-xs text-slate-400"><span>Page {page + 1} of {totalPages}</span><div className="flex gap-2"><button onClick={() => setPage((current) => Math.max(0, current - 1))} disabled={page === 0} className="px-3 py-1.5 rounded-lg border border-slate-200 disabled:opacity-40 cursor-pointer">Previous</button><button onClick={() => setPage((current) => Math.min(totalPages - 1, current + 1))} disabled={page >= totalPages - 1} className="px-3 py-1.5 rounded-lg border border-slate-200 disabled:opacity-40 cursor-pointer">Next</button></div></div>}</div>
  </div>;
}
