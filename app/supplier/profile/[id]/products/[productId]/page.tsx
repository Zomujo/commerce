'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ApiClient } from '@/lib/api-client';
import { Coa, SupplierProductResponse } from '@/types/api';

export default function SupplierProductDetailsPage() {
  const params = useParams();
  const supplierId = params.id as string;
  const productId = params.productId as string;

  const [product, setProduct] = useState<SupplierProductResponse | null>(null);
  const [coas, setCoas] = useState<Coa[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        setIsLoading(true);
        const [productData, coaData] = await Promise.all([
          ApiClient.getSupplierProductById(productId),
          ApiClient.getProductCoas(productId),
        ]);
        setProduct(productData);
        setCoas(coaData);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : 'Failed to load product details');
      } finally {
        setIsLoading(false);
      }
    };

    load();
  }, [productId]);

  if (isLoading) {
    return <div className="flex items-center justify-center py-20 text-slate-400">Loading product details...</div>;
  }

  if (!product) {
    return (
      <div className="max-w-3xl">
        <Link href={`/supplier/profile/${supplierId}`} className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-emerald-500 transition-colors mb-6">
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="15 18 9 12 15 6"/></svg>
          Back to Profile
        </Link>
        <div className="px-4 py-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
          {error || 'Product not found'}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl space-y-6">
      <Link href={`/supplier/profile/${supplierId}`} className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-emerald-500 transition-colors">
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="15 18 9 12 15 6"/></svg>
        Back to Profile
      </Link>

      {error && (
        <div className="px-4 py-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">{error}</div>
      )}

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        {product.image ? (
          <div className="h-64 bg-slate-100 overflow-hidden">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
          </div>
        ) : (
          <div className="h-64 bg-slate-100 flex items-center justify-center">
            <svg className="w-10 h-10 text-slate-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
          </div>
        )}

        <div className="p-6 space-y-6">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h1 className="text-2xl font-bold text-slate-800 tracking-tight">{product.name}</h1>
              <p className="text-sm text-slate-400 mt-1">{product.verticalName || 'Uncategorized vertical'}</p>
            </div>
            <div className="flex items-center gap-2">
              <Link href={`/supplier/profile/${supplierId}/products/${product.id}/edit`} className="px-3 py-1.5 rounded-lg bg-blue-500 text-white text-xs font-semibold hover:bg-blue-600 transition">
                Edit Product
              </Link>
            </div>
          </div>

          {product.description && (
            <p className="text-sm text-slate-600 leading-relaxed">{product.description}</p>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="rounded-lg border border-slate-200 p-3">
              <p className="text-xs uppercase tracking-wider font-semibold text-slate-500">Origin Country</p>
              <p className="text-sm font-medium text-slate-700 mt-1">{product.originCountry}</p>
            </div>
            <div className="rounded-lg border border-slate-200 p-3">
              <p className="text-xs uppercase tracking-wider font-semibold text-slate-500">Origin Site</p>
              <p className="text-sm font-medium text-slate-700 mt-1">{product.originSite || '—'}</p>
            </div>
            <div className="rounded-lg border border-slate-200 p-3">
              <p className="text-xs uppercase tracking-wider font-semibold text-slate-500">Purity Grade</p>
              <p className="text-sm font-medium text-slate-700 mt-1">{product.purityGrade}</p>
            </div>
            <div className="rounded-lg border border-slate-200 p-3">
              <p className="text-xs uppercase tracking-wider font-semibold text-slate-500">Badge</p>
              <p className="text-sm font-medium text-slate-700 mt-1">{product.badge || '—'}</p>
            </div>
          </div>

          {(product.certifications ?? []).length > 0 && (
            <div>
              <h2 className="text-sm font-semibold text-slate-700 mb-2">Certifications</h2>
              <div className="flex flex-wrap gap-1.5">
                {(product.certifications ?? []).map((cert) => (
                  <span key={cert} className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 text-xs font-medium border border-emerald-100">{cert}</span>
                ))}
              </div>
            </div>
          )}

          {product.specifications && Object.keys(product.specifications).length > 0 && (
            <div>
              <h2 className="text-sm font-semibold text-slate-700 mb-2">Specifications</h2>
              <div className="rounded-lg border border-slate-200 divide-y divide-slate-100">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="px-3 py-2 flex items-center justify-between gap-3 text-sm">
                    <span className="text-slate-500">{key}</span>
                    <span className="text-slate-700 font-medium">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-lg font-semibold text-slate-800">Certificates of Analysis</h2>
          <Link href={`/supplier/profile/${supplierId}/products/${product.id}/edit`} className="text-xs font-medium text-blue-500 hover:text-blue-600">Manage CoAs</Link>
        </div>

        {coas.length === 0 ? (
          <p className="text-sm text-slate-400">No CoAs for this product yet.</p>
        ) : (
          <div className="space-y-3">
            {coas.map((coa) => (
              <div key={coa.id} className="rounded-lg border border-slate-200 p-4 space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-slate-800">Batch {coa.batchNumber}</p>
                    <p className="text-xs text-slate-500 mt-1">
                      QA Partner: {coa.qaPartner} • Analysis: {new Date(coa.analysisDate).toLocaleDateString()}
                      {coa.expiryDate ? ` • Expiry: ${new Date(coa.expiryDate).toLocaleDateString()}` : ''}
                    </p>
                    {coa.digitalSignature && (
                      <p className="text-xs text-slate-500 mt-1">Signature: {coa.digitalSignature}</p>
                    )}
                  </div>
                  <a
                    href={ApiClient.getDownloadUrl(coa.documentUrl)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs text-slate-600 hover:bg-slate-50 transition"
                  >
                    Download Document
                  </a>
                </div>

                {coa.results?.length > 0 && (
                  <div className="rounded-lg border border-slate-100 divide-y divide-slate-100">
                    {coa.results.map((result, idx) => (
                      <div key={`${coa.id}-${idx}`} className="px-3 py-2 grid grid-cols-1 sm:grid-cols-4 gap-2 text-xs">
                        <div>
                          <p className="text-slate-400 uppercase tracking-wider">Parameter</p>
                          <p className="text-slate-700 font-medium mt-0.5">{result.parameter}</p>
                        </div>
                        <div>
                          <p className="text-slate-400 uppercase tracking-wider">Value</p>
                          <p className="text-slate-700 font-medium mt-0.5">{result.value}</p>
                        </div>
                        <div>
                          <p className="text-slate-400 uppercase tracking-wider">Specification</p>
                          <p className="text-slate-700 font-medium mt-0.5">{result.specification || '—'}</p>
                        </div>
                        <div>
                          <p className="text-slate-400 uppercase tracking-wider">Status</p>
                          <p className={`font-semibold mt-0.5 ${result.status.toLowerCase() === 'pass' ? 'text-emerald-600' : 'text-red-600'}`}>
                            {result.status}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
