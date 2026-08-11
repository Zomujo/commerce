'use client';

import { useEffect, useMemo, useState } from 'react';
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

const PAGE_SIZE = 20;

export default function AdminProductsPage() {
  const [products, setProducts] = useState<AdminProduct[]>([]);
  const [page, setPage] = useState(0);
  const [sortBy, setSortBy] = useState<SortField>('createdAt');
  const [sortDirection, setSortDirection] = useState<SortDirection>('DESC');
  const [search, setSearch] = useState('');
  const [verticalFilter, setVerticalFilter] = useState('');
  const [supplierFilter, setSupplierFilter] = useState('');
  const [originFilter, setOriginFilter] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const loadProducts = async () => {
      setIsLoading(true);
      try {
        const data = await ApiClient.getAdminProducts({ page: 0, limit: 1000, sortBy, sortDirection });
        if (cancelled) return;
        setProducts(data.content);
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
  }, [sortBy, sortDirection]);

  const verticals = useMemo(() => [...new Set(products.map((product) => product.verticalName).filter((vertical): vertical is string => Boolean(vertical)))].sort(), [products]);
  const suppliers = useMemo(() => [...new Map(products.filter((product) => product.supplier).map((product) => [product.supplier!.id, product.supplier!])).values()].sort((a, b) => a.companyName.localeCompare(b.companyName)), [products]);
  const origins = useMemo(() => [...new Set(products.map((product) => product.originCountry).filter((origin): origin is string => Boolean(origin)))].sort(), [products]);
  const filteredProducts = useMemo(() => {
    const query = search.trim().toLowerCase();
    return products.filter((product) => {
      const matchesSearch = !query || [product.name, product.verticalName, product.originCountry, product.purityGrade, product.supplier?.companyName, product.supplier?.contactEmail]
        .some((value) => value?.toLowerCase().includes(query));
      const matchesVertical = !verticalFilter || product.verticalName === verticalFilter;
      const matchesSupplier = !supplierFilter || (supplierFilter === 'unassigned' ? !product.supplier : product.supplier?.id === supplierFilter);
      const matchesOrigin = !originFilter || product.originCountry === originFilter;
      return matchesSearch && matchesVertical && matchesSupplier && matchesOrigin;
    });
  }, [products, search, verticalFilter, supplierFilter, originFilter]);
  const totalPages = Math.ceil(filteredProducts.length / PAGE_SIZE);
  const displayedProducts = filteredProducts.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);
  const pageNumbers = Array.from({ length: Math.min(5, totalPages) }, (_, index) => {
    const start = Math.min(Math.max(page - 2, 0), Math.max(totalPages - 5, 0));
    return start + index;
  });

  const updateFilter = (update: () => void) => {
    setPage(0);
    update();
  };

  const formatDate = (date: string) => new Date(date).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric',
  });

  return (
    <div>
      <div className="flex items-start justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Products</h1>
          <p className="text-sm text-slate-400 mt-1">{filteredProducts.length} of {products.length} products in the catalogue</p>
        </div>
        <Link href="/admin/products/new" className="px-4 py-2 rounded-lg bg-blue-500 text-white text-sm font-semibold hover:bg-blue-600 transition">
          Add product
        </Link>
      </div>

      <div className="flex flex-col gap-3 mb-5">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          <input value={search} onChange={(event) => updateFilter(() => setSearch(event.target.value))} placeholder="Search product, supplier, origin..."
            className="md:col-span-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 focus:border-blue-500 focus:outline-none" />
          <select value={verticalFilter} onChange={(event) => updateFilter(() => setVerticalFilter(event.target.value))} className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 focus:border-blue-500 focus:outline-none">
            <option value="">All verticals</option>{verticals.map((vertical) => <option key={vertical} value={vertical}>{vertical}</option>)}
          </select>
          <select value={supplierFilter} onChange={(event) => updateFilter(() => setSupplierFilter(event.target.value))} className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 focus:border-blue-500 focus:outline-none">
            <option value="">All suppliers</option><option value="unassigned">Unassigned products</option>{suppliers.map((supplier) => <option key={supplier.id} value={supplier.id}>{supplier.companyName}</option>)}
          </select>
          <select value={originFilter} onChange={(event) => updateFilter(() => setOriginFilter(event.target.value))} className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 focus:border-blue-500 focus:outline-none">
            <option value="">All origins</option>{origins.map((origin) => <option key={origin} value={origin}>{origin}</option>)}
          </select>
        </div>
        {(search || verticalFilter || supplierFilter || originFilter) && <button onClick={() => { setSearch(''); setVerticalFilter(''); setSupplierFilter(''); setOriginFilter(''); setPage(0); }} className="self-start text-xs font-medium text-blue-500 hover:text-blue-600 cursor-pointer">Clear filters</button>}
      </div>

      <div className="flex items-center gap-3 mb-5">
        <label className="text-sm text-slate-500" htmlFor="product-sort">Sort by</label>
        <select id="product-sort" value={sortBy} onChange={(event) => updateFilter(() => setSortBy(event.target.value as SortField))}
          className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-700 focus:border-blue-500 focus:outline-none">
          {sortOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
        </select>
        <button onClick={() => updateFilter(() => setSortDirection((direction) => direction === 'ASC' ? 'DESC' : 'ASC'))}
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
              ) : displayedProducts.length === 0 ? (
                <tr><td colSpan={7} className="px-5 py-12 text-center text-slate-400">No products found</td></tr>
              ) : displayedProducts.map((product) => (
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
              {pageNumbers[0] > 0 && <><button onClick={() => setPage(0)} className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 cursor-pointer">1</button><span className="px-1 py-1.5">...</span></>}
              {pageNumbers.map((pageNumber) => <button key={pageNumber} onClick={() => setPage(pageNumber)} className={`min-w-8 px-2 py-1.5 rounded-lg border cursor-pointer ${page === pageNumber ? 'border-blue-500 bg-blue-500 text-white' : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'}`}>{pageNumber + 1}</button>)}
              {pageNumbers[pageNumbers.length - 1] < totalPages - 1 && <><span className="px-1 py-1.5">...</span><button onClick={() => setPage(totalPages - 1)} className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 cursor-pointer">{totalPages}</button></>}
              <button onClick={() => setPage((current) => Math.min(totalPages - 1, current + 1))} disabled={page >= totalPages - 1}
                className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer">Next</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
