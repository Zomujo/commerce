'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ApiClient } from '@/lib/api-client';
import { AdminProduct } from '@/types/api';

type SortField = 'name' | 'createdAt' | 'originCountry' | 'purityGrade';
type SortDirection = 'ASC' | 'DESC';

const sortOptions: { value: SortField; label: string }[] = [
  { value: 'createdAt', label: 'Newest' },
  { value: 'name', label: 'Name' },
  { value: 'originCountry', label: 'Origin' },
  { value: 'purityGrade', label: 'Grade' },
];

export default function AdminProductsPage() {
  const [products, setProducts] = useState<AdminProduct[]>([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [sortBy, setSortBy] = useState<SortField>('createdAt');
  const [sortDirection, setSortDirection] = useState<SortDirection>('DESC');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const loadProducts = async () => {
      setIsLoading(true);
      try {
        const data = await ApiClient.getAdminProducts({ page, limit: 20, sortBy, sortDirection });
        if (cancelled) return;
        setProducts(data.content);
        setTotalPages(data.page?.totalPages ?? data.totalPages ?? 0);
        setTotalElements(data.page?.totalElements ?? data.totalElements ?? 0);
      } catch (error) {
        if (!cancelled) {
          console.error('Failed to fetch products:', error);
          setProducts([]);
        }
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };

    loadProducts();
    return () => { cancelled = true; };
  }, [page, sortBy, sortDirection]);

  const formatDate = (date: string) => new Date(date).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric',
  });

  return (
    <div>
      <div className="flex items-start justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Products</h1>
          <p className="text-sm text-slate-400 mt-1">{totalElements} products in the catalogue</p>
        </div>
      </div>

      <div className="flex items-center gap-3 mb-5">
        <label className="text-sm text-slate-500" htmlFor="product-sort">Sort by</label>
        <select id="product-sort" value={sortBy} onChange={(event) => { setPage(0); setSortBy(event.target.value as SortField); }}
          className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-700 focus:border-blue-500 focus:outline-none">
          {sortOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
        </select>
        <button onClick={() => { setPage(0); setSortDirection((direction) => direction === 'ASC' ? 'DESC' : 'ASC'); }}
          className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-600 hover:bg-slate-50 transition cursor-pointer">
          {sortDirection === 'ASC' ? 'Ascending' : 'Descending'}
        </button>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50/80 text-xs font-semibold uppercase tracking-wider text-slate-400">
                <th className="text-left px-5 py-3">Product</th>
                <th className="text-left px-5 py-3">Vertical</th>
                <th className="text-left px-5 py-3">Supplier</th>
                <th className="text-left px-5 py-3">Origin</th>
                <th className="text-left px-5 py-3">Grade</th>
                <th className="text-left px-5 py-3">Created</th>
                <th className="text-left px-5 py-3" />
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr><td colSpan={7} className="px-5 py-12 text-center text-slate-400">Loading...</td></tr>
              ) : products.length === 0 ? (
                <tr><td colSpan={7} className="px-5 py-12 text-center text-slate-400">No products found</td></tr>
              ) : products.map((product) => (
                <tr key={product.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                  <td className="px-5 py-3.5 font-medium text-slate-700">{product.name}</td>
                  <td className="px-5 py-3.5 text-slate-500">{product.verticalName || 'Uncategorized'}</td>
                  <td className="px-5 py-3.5 text-slate-500">
                    {product.supplier ? <span>{product.supplier.companyName}<br /><span className="text-xs text-slate-400">{product.supplier.contactEmail}</span></span> : 'Unassigned'}
                  </td>
                  <td className="px-5 py-3.5 text-slate-500">{product.originCountry}</td>
                  <td className="px-5 py-3.5 text-slate-500">{product.purityGrade}</td>
                  <td className="px-5 py-3.5 text-slate-400 whitespace-nowrap">{formatDate(product.createdAt)}</td>
                  <td className="px-5 py-3.5"><Link href={`/admin/products/${product.id}`} className="text-xs font-medium text-blue-500 hover:text-blue-600">View &rarr;</Link></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <div className="flex items-center justify-between px-5 py-3 border-t border-slate-100 text-xs text-slate-400">
            <span>Page {page + 1} of {totalPages}</span>
            <div className="flex gap-2">
              <button onClick={() => setPage((current) => Math.max(0, current - 1))} disabled={page === 0}
                className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer">Previous</button>
              <button onClick={() => setPage((current) => Math.min(totalPages - 1, current + 1))} disabled={page >= totalPages - 1}
                className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer">Next</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
