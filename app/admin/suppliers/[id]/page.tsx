'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { ApiClient } from '@/lib/api-client';
import { AdminSupplier } from '@/types/api';

export default function AdminSupplierDetailPage() {
  const params = useParams(); const router = useRouter(); const id = params.id as string;
  const [supplier, setSupplier] = useState<AdminSupplier | null>(null); const [error, setError] = useState(''); const [isDeleting, setIsDeleting] = useState(false);
  useEffect(() => { ApiClient.getAdminSupplierById(id).then(setSupplier).catch((loadError) => setError(loadError instanceof Error ? loadError.message : 'Failed to load supplier.')); }, [id]);
  const remove = async () => { if (!supplier || !window.confirm(`Delete ${supplier.companyName}? Products assigned to it will become unassigned.`)) return; setIsDeleting(true); try { await ApiClient.deleteAdminSupplier(id); router.push('/admin/suppliers'); } catch (deleteError) { setError(deleteError instanceof Error ? deleteError.message : 'Failed to delete supplier.'); setIsDeleting(false); } };
  if (!supplier) return <div><p className="text-sm text-slate-400">{error || 'Loading supplier...'}</p><Link href="/admin/suppliers" className="text-sm text-blue-500">Back to suppliers</Link></div>;
  return <div className="max-w-2xl"><Link href="/admin/suppliers" className="inline-flex text-sm text-slate-400 hover:text-blue-500 mb-6">← Back to suppliers</Link>{error && <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>}<div className="flex items-start justify-between gap-4 mb-6"><div><h1 className="text-2xl font-bold text-slate-800">{supplier.companyName}</h1><p className="text-sm text-slate-400 mt-1">Supplier contact</p></div><div className="flex gap-3"><Link href={`/admin/suppliers/${id}/edit`} className="px-4 py-2 rounded-lg bg-blue-500 text-white text-sm font-semibold">Edit</Link><button onClick={remove} disabled={isDeleting} className="px-4 py-2 rounded-lg border border-red-200 text-red-600 text-sm font-semibold disabled:opacity-50 cursor-pointer">{isDeleting ? 'Deleting...' : 'Delete'}</button></div></div><dl className="grid grid-cols-1 sm:grid-cols-2 gap-5 rounded-xl border border-slate-200 bg-white p-6 text-sm"><div><dt className="text-slate-400">Company</dt><dd className="mt-1 text-slate-700">{supplier.companyName}</dd></div><div><dt className="text-slate-400">Country</dt><dd className="mt-1 text-slate-700">{supplier.country}</dd></div><div><dt className="text-slate-400">Email</dt><dd className="mt-1 text-slate-700">{supplier.contactEmail}</dd></div><div><dt className="text-slate-400">Phone</dt><dd className="mt-1 text-slate-700">{supplier.contactPhone || '—'}</dd></div></dl></div>;
}
