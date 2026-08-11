'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { ApiClient } from '@/lib/api-client';
import { AdminProduct } from '@/types/api';

export default function AdminProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const productId = params.id as string;
  const [product, setProduct] = useState<AdminProduct | null>(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    ApiClient.getAdminProductById(productId)
      .then(setProduct)
      .catch((loadError) => setError(loadError instanceof Error ? loadError.message : 'Failed to load product.'))
      .finally(() => setIsLoading(false));
  }, [productId]);

  const deleteProduct = async () => {
    if (!product || !window.confirm(`Delete ${product.name}? This cannot be undone.`)) return;
    setIsDeleting(true);
    setError('');
    try {
      await ApiClient.deleteAdminProduct(product.id);
      router.push('/admin/products');
    } catch (deleteError) {
      setError(deleteError instanceof Error ? deleteError.message : 'Failed to delete product.');
      setIsDeleting(false);
    }
  };

  if (isLoading) return <p className="text-sm text-slate-400">Loading product...</p>;
  if (!product) return <div><p className="text-sm text-red-600 mb-4">{error || 'Product not found.'}</p><Link href="/admin/products" className="text-sm text-blue-500 hover:text-blue-600">Back to products</Link></div>;

  return (
    <div className="max-w-4xl">
      <Link href="/admin/products" className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-blue-500 transition-colors mb-6">← Back to products</Link>
      {error && <div className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>}

      <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-blue-500 mb-1">{product.verticalName || 'Uncategorized'}</p>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">{product.name}</h1>
        </div>
        <div className="flex gap-3">
          <Link href={`/admin/products/${product.id}/edit`} className="px-4 py-2 rounded-lg bg-blue-500 text-white text-sm font-semibold hover:bg-blue-600 transition">Edit product</Link>
          <button onClick={deleteProduct} disabled={isDeleting} className="px-4 py-2 rounded-lg border border-red-200 text-red-600 text-sm font-semibold hover:bg-red-50 disabled:opacity-50 cursor-pointer">{isDeleting ? 'Deleting...' : 'Delete'}</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6">
        <div className="rounded-xl overflow-hidden border border-slate-200 bg-slate-50 aspect-square">
          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
        </div>
        <div className="space-y-6">
          <section className="rounded-xl border border-slate-200 bg-white p-5">
            <h2 className="text-sm font-semibold text-slate-700 mb-3">Product details</h2>
            {product.description && <p className="text-sm leading-6 text-slate-500 mb-4">{product.description}</p>}
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-sm">
              <div><dt className="text-slate-400">Origin</dt><dd className="mt-0.5 text-slate-700">{product.originCountry}{product.originSite ? `, ${product.originSite}` : ''}</dd></div>
              <div><dt className="text-slate-400">Purity grade</dt><dd className="mt-0.5 text-slate-700">{product.purityGrade}</dd></div>
              {product.qaPartner && <div><dt className="text-slate-400">QA partner</dt><dd className="mt-0.5 text-slate-700">{product.qaPartner}</dd></div>}
              {product.badge && <div><dt className="text-slate-400">Badge</dt><dd className="mt-0.5 text-slate-700">{product.badge}</dd></div>}
            </dl>
          </section>

          <section className="rounded-xl border border-slate-200 bg-white p-5">
            <h2 className="text-sm font-semibold text-slate-700 mb-3">Supplier contact</h2>
            {product.supplier ? <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-sm"><div><dt className="text-slate-400">Company</dt><dd className="mt-0.5 text-slate-700">{product.supplier.companyName}</dd></div><div><dt className="text-slate-400">Country</dt><dd className="mt-0.5 text-slate-700">{product.supplier.country}</dd></div><div><dt className="text-slate-400">Email</dt><dd className="mt-0.5 text-slate-700">{product.supplier.contactEmail}</dd></div>{product.supplier.contactPhone && <div><dt className="text-slate-400">Phone</dt><dd className="mt-0.5 text-slate-700">{product.supplier.contactPhone}</dd></div>}</dl> : <p className="text-sm text-slate-400">No supplier assigned.</p>}
          </section>

          {Object.keys(product.specifications || {}).length > 0 && <section className="rounded-xl border border-slate-200 bg-white p-5"><h2 className="text-sm font-semibold text-slate-700 mb-3">Specifications</h2><dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-sm">{Object.entries(product.specifications).map(([name, value]) => <div key={name}><dt className="text-slate-400">{name}</dt><dd className="mt-0.5 text-slate-700">{value}</dd></div>)}</dl></section>}
        </div>
      </div>
    </div>
  );
}
