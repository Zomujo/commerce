'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ProductCard from '../../components/ProductCard';
import QuoteRequestModal from '../../components/QuoteRequestModal';
import { ApiClient } from '@/lib/api-client';
import { StrategicVertical, Product } from '@/types/api';

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

function normalize(value?: string) {
  return (value || '').trim().toLowerCase();
}

export default function VerticalDetailPage() {
  const params = useParams();
  const id = params.id as string;

  const [vertical, setVertical] = useState<StrategicVertical | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [quoteProduct, setQuoteProduct] = useState<{ id: string; name: string } | undefined>();
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        let resolvedVertical: StrategicVertical | null = null;

        try {
          resolvedVertical = await ApiClient.getVerticalById(id);
        } catch {
          const allVerticals = await ApiClient.getVerticals().catch(() => [] as StrategicVertical[]);
          resolvedVertical =
            allVerticals.find((v) => v.id === id || slugify(v.name) === id) || null;
        }

        if (!resolvedVertical) {
          setVertical(null);
          setProducts([]);
          return;
        }

        setVertical(resolvedVertical);

        let productPage = await ApiClient.getProducts({ vertical: resolvedVertical.id, limit: 50 }).catch(() => null);
        if (!productPage && slugify(resolvedVertical.name) !== resolvedVertical.id) {
          productPage = await ApiClient.getProducts({ vertical: slugify(resolvedVertical.name), limit: 50 }).catch(() => null);
        }

        if (productPage?.content?.length) {
          setProducts(productPage.content);
          return;
        }

        const allProductsPage = await ApiClient.getProducts({ limit: 100 }).catch(() => null);
        const verticalNameKey = normalize(resolvedVertical.name);
        const filteredProducts = (allProductsPage?.content || []).filter((product) => {
          const productVerticalId = product.vertical?.id || '';
          const productVerticalName = normalize(product.vertical?.name || product.verticalName);
          return productVerticalId === resolvedVertical.id || productVerticalName === verticalNameKey;
        });

        setProducts(filteredProducts);
      } catch (err) {
        console.error('Failed to load vertical:', err);
      } finally {
        setIsLoading(false);
      }
    };
    load();
  }, [id]);

  if (isLoading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Header />
        <main style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <p style={{ color: 'var(--color-gray-500)' }}>Loading...</p>
        </main>
        <Footer />
      </div>
    );
  }

  if (!vertical) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Header />
        <main style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '1rem' }}>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-navy)' }}>Category Not Found</h1>
          <Link href="/categories" className="btn btn-primary">Browse Categories</Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <main style={{ flex: 1, background: 'var(--color-gray-50)' }}>
        {/* Breadcrumb */}
        <section style={{ background: 'var(--color-white)', borderBottom: '1px solid var(--color-gray-200)', padding: '1rem 0' }}>
          <div className="container">
            <nav style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem' }}>
              <Link href="/" style={{ color: 'var(--color-gray-500)', textDecoration: 'none' }}>Home</Link>
              <span style={{ color: 'var(--color-gray-300)' }}>/</span>
              <Link href="/categories" style={{ color: 'var(--color-gray-500)', textDecoration: 'none' }}>Categories</Link>
              <span style={{ color: 'var(--color-gray-300)' }}>/</span>
              <span style={{ color: 'var(--color-navy)' }}>{vertical.name}</span>
            </nav>
          </div>
        </section>

        {/* Header */}
        <section style={{ background: 'var(--color-white)', padding: '3rem 0', borderBottom: '1px solid var(--color-gray-200)' }}>
          <div className="container">
            <span className="badge badge-blue" style={{ marginBottom: '0.75rem' }}>Category</span>
            <h1 style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)', fontWeight: 700, color: 'var(--color-navy)', marginBottom: '0.75rem' }}>
              {vertical.name}
            </h1>
            {vertical.tagline && (
              <p style={{ fontSize: '1.125rem', color: 'var(--color-gray-500)', marginBottom: '0.5rem' }}>{vertical.tagline}</p>
            )}
            {vertical.description && (
              <p style={{ fontSize: '1rem', color: 'var(--color-gray-500)', maxWidth: '42rem', lineHeight: 1.7 }}>{vertical.description}</p>
            )}
            {vertical.edge && (
              <div style={{
                marginTop: '1.25rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.5rem 1rem',
                background: 'rgba(0,163,163,0.08)',
                border: '1px solid rgba(0,163,163,0.2)',
                borderRadius: '9999px',
                fontSize: '0.875rem',
                color: 'var(--color-teal)',
                fontWeight: 600,
              }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
                {vertical.edge}
              </div>
            )}
          </div>
        </section>

        {/* Products */}
        <section className="section">
          <div className="container">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-navy)' }}>
                Products ({products.length})
              </h2>
              <Link href="/products" style={{ fontSize: '0.875rem', color: 'var(--color-blue)', textDecoration: 'none', fontWeight: 500 }}>
                View all products →
              </Link>
            </div>
            {products.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--color-gray-500)' }}>
                No products in this category yet.
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
                {products.map((p) => (
                  <ProductCard key={p.id} product={p} onRequestQuote={() => { setQuoteProduct({ id: p.id, name: p.name }); setIsQuoteOpen(true); }} />
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
      <QuoteRequestModal isOpen={isQuoteOpen} onClose={() => setIsQuoteOpen(false)} productId={quoteProduct?.id} productName={quoteProduct?.name} />
    </div>
  );
}
