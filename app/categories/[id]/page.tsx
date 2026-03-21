'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ProductCard from '../../components/ProductCard';
import QuoteRequestModal from '../../components/QuoteRequestModal';
import PageSpinner from '../../components/PageSpinner';
import { ApiClient } from '@/lib/api-client';
import { resolveCategoryImage } from '@/lib/category-image';
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

function productBelongsToVertical(product: Product, vertical: StrategicVertical): boolean {
  const verticalId = product.vertical?.id?.trim();
  if (verticalId && verticalId === vertical.id) return true;

  const productVName = normalize(product.vertical?.name || product.verticalName);
  const targetName = normalize(vertical.name);
  if (productVName && targetName && productVName === targetName) return true;

  return false;
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

        const fromVerticalQuery = (productPage?.content || []).filter((p) =>
          productBelongsToVertical(p, resolvedVertical),
        );
        if (fromVerticalQuery.length > 0) {
          setProducts(fromVerticalQuery);
          return;
        }

        const allProductsPage = await ApiClient.getProducts({ limit: 100 }).catch(() => null);
        const filteredProducts = (allProductsPage?.content || []).filter((p) =>
          productBelongsToVertical(p, resolvedVertical),
        );

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
      <div
        style={{
          minHeight: '100vh',
          display: 'grid',
          gridTemplateRows: 'auto 1fr auto',
        }}
      >
        <Header />
        <main
          style={{
            minHeight: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'var(--color-gray-50)',
          }}
        >
          <PageSpinner />
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

  const heroImage = resolveCategoryImage(vertical);
  const productCount = products.length;

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <main style={{ flex: 1, background: 'var(--color-gray-50)' }}>
        <div className="container" style={{ paddingTop: '1.25rem', paddingBottom: '3.5rem' }}>
          <nav
            style={{
              display: 'flex',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '0.35rem',
              fontSize: '0.8125rem',
              color: 'var(--color-gray-500)',
              marginBottom: '1.25rem',
            }}
            aria-label="Breadcrumb"
          >
            <Link href="/" style={{ color: 'var(--color-gray-500)', textDecoration: 'none' }}>Home</Link>
            <span style={{ color: 'var(--color-gray-300)' }} aria-hidden>/</span>
            <Link href="/categories" style={{ color: 'var(--color-gray-500)', textDecoration: 'none' }}>Categories</Link>
            <span style={{ color: 'var(--color-gray-300)' }} aria-hidden>/</span>
            <span style={{ color: 'var(--color-navy)', fontWeight: 600 }}>{vertical.name}</span>
          </nav>

          <section
            style={{
              position: 'relative',
              borderRadius: '1.25rem',
              overflow: 'hidden',
              minHeight: 'min(300px, 56vw)',
              border: '1px solid var(--color-gray-200)',
              boxShadow: 'var(--shadow-lg)',
            }}
          >
            <div
              style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: `linear-gradient(105deg, rgba(17, 33, 23, 0.93) 0%, rgba(17, 33, 23, 0.62) 38%, rgba(17, 33, 23, 0.22) 100%), url(${heroImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
              aria-hidden
            />
            <div
              style={{
                position: 'relative',
                padding: 'clamp(1.75rem, 5vw, 3rem)',
                maxWidth: '44rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem',
              }}
            >
              <p
                style={{
                  margin: 0,
                  fontSize: '0.9375rem',
                  fontWeight: 500,
                  color: 'rgba(255, 255, 255, 0.82)',
                }}
              >
                {productCount === 1 ? '1 material in this category' : `${productCount} materials in this category`}
              </p>
              <h1
                style={{
                  margin: 0,
                  fontSize: 'clamp(2rem, 5vw, 3rem)',
                  fontWeight: 800,
                  letterSpacing: '-0.03em',
                  color: '#fff',
                  lineHeight: 1.08,
                }}
              >
                {vertical.name}
              </h1>
              {vertical.tagline ? (
                <p
                  style={{
                    margin: 0,
                    fontSize: 'clamp(1rem, 2.2vw, 1.2rem)',
                    color: 'rgba(255, 255, 255, 0.9)',
                    lineHeight: 1.55,
                    maxWidth: '36rem',
                  }}
                >
                  {vertical.tagline}
                </p>
              ) : null}
            </div>
          </section>

          {(vertical.description || vertical.edge) ? (
            <div
              style={{
                marginTop: '1.75rem',
                background: 'var(--color-white)',
                borderRadius: '1.25rem',
                border: '1px solid var(--color-gray-200)',
                boxShadow: 'var(--shadow-sm)',
                padding: 'clamp(1.5rem, 4vw, 2.35rem)',
              }}
            >
              {vertical.description ? (
                <p
                  style={{
                    margin: 0,
                    fontSize: '1.0625rem',
                    color: 'var(--color-gray-600)',
                    lineHeight: 1.75,
                    maxWidth: '50rem',
                  }}
                >
                  {vertical.description}
                </p>
              ) : null}
              {vertical.edge ? (
                <blockquote
                  style={{
                    margin: vertical.description ? '1.75rem 0 0' : 0,
                    padding: '0 0 0 1.15rem',
                    borderLeft: '3px solid var(--primary)',
                    fontSize: '1rem',
                    fontWeight: 500,
                    color: 'var(--color-navy)',
                    lineHeight: 1.7,
                    fontStyle: 'normal',
                  }}
                >
                  {vertical.edge}
                </blockquote>
              ) : null}
            </div>
          ) : null}

          <section style={{ marginTop: '2.75rem' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'baseline',
                justifyContent: 'space-between',
                gap: '1rem',
                flexWrap: 'wrap',
                marginBottom: '1.35rem',
                paddingBottom: '1rem',
                borderBottom: '1px solid var(--color-gray-200)',
              }}
            >
              <h2
                style={{
                  margin: 0,
                  fontSize: 'clamp(1.2rem, 2.4vw, 1.45rem)',
                  fontWeight: 700,
                  color: 'var(--color-navy)',
                }}
              >
                Materials
              </h2>
              <Link
                href="/products"
                style={{
                  fontSize: '0.875rem',
                  color: 'var(--color-blue)',
                  textDecoration: 'none',
                  fontWeight: 600,
                }}
              >
                Open full catalog →
              </Link>
            </div>
            {products.length === 0 ? (
              <div
                style={{
                  textAlign: 'center',
                  padding: '3.5rem 1.5rem',
                  background: 'var(--color-white)',
                  borderRadius: '1rem',
                  border: '1px dashed var(--color-gray-200)',
                  color: 'var(--color-gray-500)',
                  fontSize: '1rem',
                }}
              >
                No materials are listed in this category yet. Try the full catalog or another vertical.
              </div>
            ) : (
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                  gap: '1.5rem',
                }}
              >
                {products.map((p) => (
                  <ProductCard
                    key={p.id}
                    product={p}
                    onRequestQuote={() => {
                      setQuoteProduct({ id: p.id, name: p.name });
                      setIsQuoteOpen(true);
                    }}
                  />
                ))}
              </div>
            )}
          </section>
        </div>
      </main>
      <Footer />
      <QuoteRequestModal
        isOpen={isQuoteOpen}
        onClose={() => setIsQuoteOpen(false)}
        productId={quoteProduct?.id}
        productName={quoteProduct?.name}
      />
    </div>
  );
}
