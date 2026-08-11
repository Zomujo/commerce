'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Header from '../../components/Header';
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

        const productPage = await ApiClient.getProducts({ verticalId: resolvedVertical.id, limit: 50 }).catch(() => null);

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
        }}
      >
        <Header />
        <main
          style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'white',
          }}
        >
          <PageSpinner />
        </main>
      </div>
    );
  }

  if (!vertical) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Header />
        <main style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '1.5rem', background: 'white' }}>
          <h1 style={{ fontSize: '2rem', fontWeight: 500, color: '#06231A' }}>Category Not Found</h1>
          <Link href="/categories" className="group flex items-center gap-2 px-8 py-4 bg-[#06231A] text-white font-medium uppercase tracking-widest text-sm hover:bg-[#0F4534] transition-colors">
            Browse Categories
          </Link>
        </main>
      </div>
    );
  }

  const heroImage = resolveCategoryImage(vertical);
  const productCount = products.length;

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <main style={{ flex: 1, background: 'white' }}>
        <div className="max-w-[1400px] mx-auto px-6 sm:px-12 lg:px-24" style={{ paddingTop: '8rem', paddingBottom: '4rem' }}>
          
          {/* Breadcrumb */}
          <nav
            style={{
              display: 'flex',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '0.5rem',
              fontSize: '0.75rem',
              color: '#0F4534',
              marginBottom: '2rem',
              fontFamily: 'monospace',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}
            aria-label="Breadcrumb"
          >
            <Link href="/" style={{ color: '#0F4534', textDecoration: 'none' }} className="hover:text-[#06231A]">Home</Link>
            <span style={{ color: '#E2DDD3' }} aria-hidden>/</span>
            <Link href="/categories" style={{ color: '#0F4534', textDecoration: 'none' }} className="hover:text-[#06231A]">Categories</Link>
            <span style={{ color: '#E2DDD3' }} aria-hidden>/</span>
            <span style={{ color: '#06231A', fontWeight: 700 }}>{vertical.name}</span>
          </nav>

          {/* Hero Section */}
          <section
            style={{
              position: 'relative',
              minHeight: 'min(300px, 40vw)',
              border: '1px solid #E2DDD3',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: `linear-gradient(105deg, rgba(6, 35, 26, 0.95) 0%, rgba(6, 35, 26, 0.7) 40%, rgba(6, 35, 26, 0.2) 100%), url(${heroImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
              aria-hidden
            />
            <div
              style={{
                position: 'relative',
                padding: '3rem sm:p-12',
                maxWidth: '48rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                height: '100%',
                justifyContent: 'center',
                paddingLeft: '3rem',
                paddingTop: '3rem',
                paddingBottom: '3rem',
              }}
            >
              <div style={{
                background: 'white',
                color: '#06231A',
                padding: '0.25rem 0.75rem',
                fontSize: '0.75rem',
                fontWeight: 600,
                fontFamily: 'monospace',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                alignSelf: 'flex-start',
              }}>
                {productCount === 1 ? '1 PRODUCT' : `${productCount} PRODUCTS`}
              </div>
              <h1
                style={{
                  margin: 0,
                  fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                  fontWeight: 500,
                  letterSpacing: '-0.02em',
                  color: 'white',
                  lineHeight: 1.1,
                }}
              >
                {vertical.name}
              </h1>
              {vertical.tagline && (
                <p
                  style={{
                    margin: 0,
                    fontSize: '1.125rem',
                    color: '#E6FFE6',
                    lineHeight: 1.6,
                    fontWeight: 300,
                    maxWidth: '40rem',
                  }}
                >
                  {vertical.tagline}
                </p>
              )}
            </div>
          </section>

          {/* Description & Edge */}
          {(vertical.description || vertical.edge) && (
            <div
              style={{
                marginTop: '2rem',
                background: 'white',
                border: '1px solid #E2DDD3',
                padding: '2.5rem',
              }}
            >
              {vertical.description && (
                <p
                  style={{
                    margin: 0,
                    fontSize: '1rem',
                    color: '#0F4534',
                    lineHeight: 1.8,
                    fontWeight: 300,
                    maxWidth: '56rem',
                  }}
                >
                  {vertical.description}
                </p>
              )}
              {vertical.edge && (
                <blockquote
                  style={{
                    margin: vertical.description ? '2rem 0 0' : 0,
                    padding: '0 0 0 1.5rem',
                    borderLeft: '4px solid #06231A',
                    fontSize: '1.125rem',
                    fontWeight: 500,
                    color: '#06231A',
                    lineHeight: 1.6,
                    fontStyle: 'normal',
                  }}
                >
                  {vertical.edge}
                </blockquote>
              )}
            </div>
          )}

          {/* Materials Grid */}
          <section style={{ marginTop: '4rem' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'baseline',
                justifyContent: 'space-between',
                gap: '1rem',
                flexWrap: 'wrap',
                marginBottom: '2rem',
                paddingBottom: '1rem',
                borderBottom: '1px solid #E2DDD3',
              }}
            >
              <h2
                style={{
                  margin: 0,
                  fontSize: '1.5rem',
                  fontWeight: 500,
                  color: '#06231A',
                  letterSpacing: '-0.01em',
                }}
              >
                Available Materials
              </h2>
              <Link
                href="/products"
                style={{
                  fontSize: '0.75rem',
                  color: '#06231A',
                  textDecoration: 'none',
                  fontWeight: 600,
                  fontFamily: 'monospace',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                }}
                className="hover:text-[#0F4534] transition-colors"
              >
                Open Full Catalog →
              </Link>
            </div>
            
            {products.length === 0 ? (
              <div
                style={{
                  textAlign: 'center',
                  padding: '4rem 2rem',
                  background: '#F8F7F3',
                  border: '1px solid #E2DDD3',
                  color: '#0F4534',
                  fontSize: '1rem',
                  fontWeight: 300,
                }}
              >
                No materials are listed in this category yet. Try the full catalog or another vertical.
              </div>
            ) : (
              <div
                className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8"
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
      
      <QuoteRequestModal
        isOpen={isQuoteOpen}
        onClose={() => setIsQuoteOpen(false)}
        productId={quoteProduct?.id}
        productName={quoteProduct?.name}
      />
    </div>
  );
}
