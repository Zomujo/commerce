'use client';

import { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HeroSection from './components/HeroSection';
import TrustEngine from './components/TrustEngine';
import CategoryCard from './components/CategoryCard';
import ProductCard from './components/ProductCard';
import StatsSection from './components/StatsSection';
import QuoteRequestModal from './components/QuoteRequestModal';
import Link from 'next/link';
import Image from 'next/image';
import { ApiClient } from '@/lib/api-client';
import { Product, StrategicVertical, PlatformStats } from '@/types/api';

// Trusted partners/brands
const trustedBrands = [
  { name: 'BASF', logo: '/logo_basf_1769368980780.png' },
  { name: 'Dow Chemical', logo: '/logo_dow_1769368995716.png' },
  { name: 'LyondellBasell', logo: '/logo_lyondellbasell_1769369007816.png' },
  { name: 'DuPont', logo: '/logo_dupont_1769369022483.png' },
  { name: 'SABIC', logo: '/logo_sabic_1769369039208.png' },
  { name: 'Covestro', logo: '/logo_covestro_1769369053388.png' },
];

export default function Home() {
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<{ id: string; name: string } | undefined>();
  const [catalogProducts, setCatalogProducts] = useState<Product[]>([]);
  const [hotDealProducts, setHotDealProducts] = useState<Product[]>([]);
  const [verticals, setVerticals] = useState<StrategicVertical[]>([]);
  const [stats, setStats] = useState<PlatformStats | null>(null);

  const hasUsableImage = (image?: string) => {
    if (!image) return false;
    return image.startsWith('http://') || image.startsWith('https://') || image.startsWith('/');
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [popularProducts, recentProducts, allProductsPage, fetchedVerticals, fetchedStats] = await Promise.all([
          ApiClient.getPopularProducts(4),
          ApiClient.getRecentProducts().catch(() => []),
          ApiClient.getProducts({ limit: 100 }).catch(() => null),
          ApiClient.getVerticals().catch(() => []),
          ApiClient.getStats().catch(() => null)
        ]);

        const pool = [
          ...popularProducts,
          ...recentProducts,
          ...(allProductsPage?.content || []),
        ];

        const uniqueById = new Map<string, Product>();
        pool.forEach((p) => {
          if (!uniqueById.has(p.id)) uniqueById.set(p.id, p);
        });

        const imageReadyProducts = Array.from(uniqueById.values()).filter((p) => hasUsableImage(p.image));

        const shuffledDeals = [...imageReadyProducts];
        for (let i = shuffledDeals.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [shuffledDeals[i], shuffledDeals[j]] = [shuffledDeals[j], shuffledDeals[i]];
        }

        setCatalogProducts(imageReadyProducts);
        setHotDealProducts(shuffledDeals.slice(0, Math.min(3, shuffledDeals.length)));
        setVerticals(fetchedVerticals);
        setStats(fetchedStats);
      } catch (error) {
        console.error('Failed to fetch home data:', error);
      }
    };

    fetchData();
  }, []);

  const handleRequestQuote = (productId: string, productName: string) => {
    setSelectedProduct({ id: productId, name: productName });
    setIsQuoteModalOpen(true);
  };

  const platformStats = stats ? [
    { label: 'Products Available', value: stats.productCount },
    { label: 'Verified Suppliers', value: stats.verifiedSuppliers },
    { label: 'Countries Served', value: stats.countriesServed },
    { label: 'Support Availability', value: stats.supportAvailability },
  ] : [
    { label: 'Products Available', value: '100+' },
    { label: 'Verified Suppliers', value: '20+' },
    { label: 'Countries Served', value: '60+' },
    { label: 'Support Availability', value: '24/7' },
  ];

  const pickWindow = (start: number, count: number) => {
    if (!catalogProducts.length) return [] as Product[];
    const max = Math.min(count, catalogProducts.length);
    const picked: Product[] = [];
    const used = new Set<string>();

    for (let i = 0; i < catalogProducts.length && picked.length < max; i++) {
      const idx = (start + i) % catalogProducts.length;
      const p = catalogProducts[idx];
      if (!used.has(p.id)) {
        used.add(p.id);
        picked.push(p);
      }
    }

    return picked;
  };

  const previewProducts = pickWindow(0, 4);
  const bestSellerProducts = pickWindow(1, 4);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />

      <main style={{ flex: 1 }}>
        {/* Hero */}
        <HeroSection />

        {/* Strategic Verticals */}
        <section className="section" style={{ background: 'var(--color-gray-50)' }}>
          <div className="container">
            <h2 style={{
              fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
              fontWeight: 700,
              color: 'var(--color-navy)',
              marginBottom: '2rem',
              textAlign: 'center'
            }}>Strategic Verticals</h2>
             <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '1.5rem',
            }}>
              {verticals.length > 0 ? verticals.map((vertical) => (
                <CategoryCard
                  key={vertical.id}
                  category={vertical}
                />
              )) : (
                <p style={{ textAlign: 'center', color: 'var(--color-gray-500)' }}>Loading market verticals...</p>
              )}
            </div>
          </div>
        </section>

        {/* Trust Engine */}
        <TrustEngine />

        {/* Trusted partners — marquee */}
        <section
          style={{
            padding: 'clamp(3.75rem, 9vw, 6rem) 0',
            position: 'relative',
            overflow: 'hidden',
            background: 'radial-gradient(circle at 14% 14%, rgba(29, 201, 98, 0.22) 0%, rgba(29, 201, 98, 0) 34%), linear-gradient(180deg, #f8fcfa 0%, #eef5f1 100%)',
            borderTop: '1px solid rgba(17, 33, 23, 0.08)',
            borderBottom: '1px solid rgba(17, 33, 23, 0.08)',
          }}
        >
          <div
            aria-hidden
            style={{
              position: 'absolute',
              width: '32rem',
              height: '32rem',
              right: '-10rem',
              top: '-16rem',
              borderRadius: '999px',
              background: 'radial-gradient(circle, rgba(17, 33, 23, 0.12) 0%, rgba(17, 33, 23, 0) 70%)',
              pointerEvents: 'none',
            }}
          />
          <div className="container" style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ textAlign: 'center', marginBottom: 'clamp(2rem, 5vw, 3rem)' }}>
              <p
                style={{
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: 'var(--color-gray-600)',
                  marginBottom: '1rem',
                }}
              >
                Trusted by Industry Leaders
              </p>
              <h3
                style={{
                  fontSize: 'clamp(1.9rem, 4vw, 2.65rem)',
                  fontWeight: 800,
                  letterSpacing: '-0.03em',
                  color: 'var(--color-navy)',
                  lineHeight: 1.12,
                  marginBottom: '0.9rem',
                }}
              >
                Official Distribution Partners
              </h3>
              <p
                style={{
                  fontSize: '1.0625rem',
                  color: 'var(--color-gray-600)',
                  maxWidth: '40rem',
                  margin: '0 auto',
                  lineHeight: 1.65,
                }}
              >
                Industrial alliances built for long-term reliability, quality assurance, and traceable global sourcing.
              </p>
            </div>

            <div style={{ position: 'relative' }}>
              <div className="partner-marquee-viewport" style={{ position: 'relative', width: '100%', overflow: 'hidden' }}>
                <div className="partner-marquee-row partner-marquee-row-top">
                  {[...trustedBrands, ...trustedBrands].map((brand, index) => (
                    <div key={`partner-top-${brand.name}-${index}`} className="partner-float-logo-wrap">
                      <Image src={brand.logo} alt={brand.name} width={220} height={80} draggable={false} className="partner-logo" />
                    </div>
                  ))}
                </div>
              </div>

              <div className="partner-marquee-viewport" style={{ position: 'relative', width: '100%', overflow: 'hidden', marginTop: '1rem' }}>
                <div className="partner-marquee-row partner-marquee-row-bottom">
                  {[...trustedBrands.slice().reverse(), ...trustedBrands.slice().reverse()].map((brand, index) => (
                    <div key={`partner-bottom-${brand.name}-${index}`} className="partner-float-logo-wrap">
                      <Image src={brand.logo} alt={brand.name} width={220} height={80} draggable={false} className="partner-logo" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>





        {/* Featured Products / Industrial Catalog Preview */}
        <section className="section" style={{ background: 'var(--color-white)' }}>
          <div className="container">
            <div style={{
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              marginBottom: '2rem',
              flexWrap: 'wrap',
              gap: '1rem',
            }}>
              <div>
                <h2 style={{
                  fontSize: 'clamp(1.75rem, 3vw, 2.25rem)',
                  fontWeight: 700,
                  color: 'var(--color-navy)',
                  marginBottom: '0.75rem',
                }}>
                  Industrial Catalog Preview
                </h2>
                <p style={{
                  fontSize: '1rem',
                  color: 'var(--color-gray-500)',
                  maxWidth: '32rem',
                  margin: '0 auto',
                }}>
                  Explore our comprehensive range of approved industrial inputs.
                </p>
              </div>
              <Link 
                href="/products"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  color: 'var(--primary)',
                  fontWeight: 600,
                  textDecoration: 'none',
                  transition: 'gap var(--transition-fast)',
                }}
                className="view-all-link"
              >
                Access Full Catalog
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '1.5rem',
            }}>
              {previewProducts.length > 0 ? previewProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onRequestQuote={() => handleRequestQuote(product.id, product.name)}
                />
              )) : (
                 <p style={{ color: 'var(--color-gray-500)' }}>No products with usable images yet.</p>
              )}
            </div>
          </div>
        </section>

        {/* Hot Deals */}
        <section className="section bg-white">
          <div className="container">
            {hotDealProducts.length > 0 ? (
              <div
                className="relative overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-emerald-950 via-emerald-900 to-emerald-700 p-4 shadow-[0_26px_62px_rgba(17,33,23,0.18)] md:p-6"
              >
                <div aria-hidden className="pointer-events-none absolute -left-14 -top-14 h-48 w-48 rounded-full bg-red-500/40 blur-3xl" />
                <div aria-hidden className="pointer-events-none absolute -right-14 -top-10 h-44 w-44 rounded-full bg-orange-400/35 blur-3xl" />
                <div aria-hidden className="pointer-events-none absolute inset-0 opacity-20 [background-image:linear-gradient(to_right,rgba(255,255,255,0.22)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.22)_1px,transparent_1px)] [background-size:30px_30px]" />

                <div className="relative z-[1] grid gap-4 lg:grid-cols-[1.1fr_1fr]">
                  <div className="flex min-h-full flex-col justify-between">
                    <div>
                      <span className="mb-3 inline-flex items-center rounded-md bg-red-500/90 px-2.5 py-1 text-[0.72rem] font-extrabold uppercase tracking-[0.1em] text-white">
                        Hot Deals
                      </span>
                      <h2 className="mb-3 text-[clamp(1.8rem,3vw,2.45rem)] font-extrabold leading-[1.1] tracking-[-0.03em] text-white">
                        Limited-Time Procurement Opportunities
                      </h2>
                      <p className="max-w-2xl text-base leading-7 text-white/85">
                        Featured products rotate by demand signal. Lock in availability early while current pricing windows are active.
                      </p>
                    </div>

                    <div className="mt-5 flex flex-wrap gap-3">
                      <button onClick={() => setIsQuoteModalOpen(true)} className="btn btn-primary" style={{ background: '#f97316', borderColor: '#f97316' }}>
                        Request Product
                      </button>
                      <Link href="/products" className="btn btn-ghost" style={{ color: 'white', borderColor: 'rgba(255,255,255,0.35)' }}>
                        View All Deals
                      </Link>
                    </div>
                  </div>

                  <div className="grid gap-3">
                    {hotDealProducts.map((product) => (
                      <Link
                        href={`/products/${product.id}`}
                        key={`deal-spot-${product.id}`}
                        className="grid grid-cols-[80px_1fr] items-center gap-3 rounded-xl border border-white/25 bg-white/15 p-2 no-underline backdrop-blur-sm transition hover:-translate-y-0.5 hover:shadow-[0_16px_32px_rgba(0,0,0,0.22)] md:grid-cols-[92px_1fr]"
                      >
                        <Image src={product.image} alt={product.name} width={92} height={80} className="h-20 w-20 rounded-lg border border-white/30 object-cover md:h-20 md:w-[92px]" />
                        <div>
                          <p className="mb-0.5 text-[0.68rem] text-white/75">
                            Limited-time attention
                          </p>
                          <p className="mb-0.5 text-[0.95rem] font-bold leading-[1.3] text-white">
                            {product.name}
                          </p>
                          <p className="text-[0.78rem] text-white/85">
                            {product.verticalName || 'Industrial'}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <p style={{ color: 'var(--color-gray-500)' }}>No hot deals available yet.</p>
            )}
          </div>
        </section>

        {/* Best Sellers */}
        <section className="section bg-slate-50">
          <div className="container">
            <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
              <div>
                <h2 className="mb-3 text-[clamp(1.75rem,3vw,2.25rem)] font-extrabold tracking-[-0.02em] text-slate-900">
                  Best Sellers
                </h2>
                <p className="max-w-xl text-base text-slate-500">
                  The products buyers come back for most often.
                </p>
              </div>
              <Link href="/products" className="view-all-link inline-flex items-center gap-2 font-semibold text-emerald-600">
                Browse Products
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            {bestSellerProducts.length > 0 ? (
              <div className="grid gap-4 lg:grid-cols-[1.2fr_1fr]">
                <Link
                  href={`/products/${bestSellerProducts[0].id}`}
                  className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                >
                  <Image src={bestSellerProducts[0].image} alt={bestSellerProducts[0].name} width={900} height={520} className="h-[340px] w-full object-cover transition duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-950/5 to-emerald-950/70" />
                  <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                    <p className="text-[0.72rem] uppercase tracking-[0.08em] text-white/80">Top Pick</p>
                    <h3 className="text-2xl font-bold leading-tight">{bestSellerProducts[0].name}</h3>
                    <p className="mt-1 text-sm text-white/85">{bestSellerProducts[0].verticalName || 'Industrial'}</p>
                  </div>
                </Link>

                <div className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
                  <div className="divide-y divide-slate-100">
                    {bestSellerProducts.map((product) => (
                      <Link
                        href={`/products/${product.id}`}
                        key={`best-list-${product.id}`}
                        className="flex items-center gap-3 p-3 no-underline transition hover:bg-slate-50"
                      >
                        <Image src={product.image} alt={product.name} width={64} height={64} className="h-16 w-16 rounded-lg object-cover" />
                        <div>
                          <p className="text-sm font-semibold text-slate-900">{product.name}</p>
                          <p className="text-xs text-slate-500">{product.verticalName || 'Industrial'}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <p style={{ color: 'var(--color-gray-500)' }}>No best sellers available yet.</p>
            )}
          </div>
        </section>

        {/* About Us (The Vision) */}
         <section className="section" style={{ background: 'var(--color-navy)', color: 'white' }}>
          <div className="container">
            <div style={{
              maxWidth: '48rem',
              margin: '0 auto',
              textAlign: 'center',
            }}>
              <h2 style={{
                fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
                fontWeight: 700,
                color: 'white',
                marginBottom: '1.5rem',
                lineHeight: 1.2,
              }}>
                Reimagining the African Supply Chain for the Global Industrialist.
              </h2>
              <p style={{
                fontSize: '1.125rem',
                color: 'rgba(255, 255, 255, 0.8)',
                marginBottom: '2rem',
                lineHeight: 1.8,
              }}>
                For too long, Africa’s industrial wealth has been trapped in fragmented, opaque channels. 
                WG Trade was founded by industry experts to change that. We aren&apos;t just a marketplace; 
                we are a digital pipeline. By centralizing the continent’s most critical resources and 
                de-risking the trade process, we are building the most resilient and transparent industrial 
                supply chain of the 2020s.
              </p>
              <Link 
                href="/about"
                className="btn btn-primary"
                style={{
                  padding: '1rem 2rem',
                  fontSize: '1.0625rem',
                  fontWeight: 600,
                }}
              >
                 Read Our Manifesto
              </Link>
            </div>
          </div>
        </section>
        
        {/* Stats */}
        <StatsSection stats={platformStats} />

        {/* CTA Banner */}
        <section style={{
          background: 'linear-gradient(135deg, var(--color-navy) 0%, var(--primary-900) 100%)',
          position: 'relative',
          overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `
              radial-gradient(circle at 20% 50%, rgba(29, 201, 98, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 80% 50%, rgba(29, 201, 98, 0.1) 0%, transparent 50%)
            `,
          }} />
          <div className="container" style={{
            position: 'relative',
            padding: '4rem 0',
            textAlign: 'center',
          }}>
            <div style={{ maxWidth: '40rem', margin: '0 auto' }}>
              <h2 style={{
                fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
                fontWeight: 700,
                color: 'var(--color-white)',
                marginBottom: '1rem',
                lineHeight: 1.2,
              }}>
                Ready to Source Quality Raw Materials?
              </h2>
              <p style={{
                fontSize: '1.125rem',
                color: 'rgba(255, 255, 255, 0.8)',
                marginBottom: '2rem',
                lineHeight: 1.7,
              }}>
                Get competitive product offers from verified chemical suppliers. Our team is ready to help you 
                source the right materials for your manufacturing operations.
              </p>
              <div style={{
                display: 'flex',
                gap: '1rem',
                justifyContent: 'center',
                flexWrap: 'wrap',
              }}>
                <button 
                  onClick={() => setIsQuoteModalOpen(true)}
                  className="btn btn-primary"
                  style={{
                    padding: '1rem 2rem',
                    fontSize: '1.0625rem',
                  }}
                >
                  Request a Product
                </button>
                <Link 
                  href="/products"
                  className="btn btn-ghost"
                  style={{
                    padding: '1rem 2rem',
                    fontSize: '1.0625rem',
                    color: 'white',
                    borderColor: 'rgba(255, 255, 255, 0.3)',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    borderRadius: '0.5rem',
                  }}
                >
                  Access the Industrial Catalog
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      <QuoteRequestModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
        productId={selectedProduct?.id}
        productName={selectedProduct?.name}
      />

      <style jsx global>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        @keyframes scrollReverse {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0);
          }
        }
        
        .carousel-track:hover {
          animation-play-state: paused;
        }

        .partner-marquee-viewport {
          -webkit-mask-image: linear-gradient(90deg, transparent 0%, black 8%, black 92%, transparent 100%);
          mask-image: linear-gradient(90deg, transparent 0%, black 8%, black 92%, transparent 100%);
        }

        .partner-marquee-row {
          display: flex;
          gap: clamp(0.7rem, 2vw, 1rem);
          width: max-content;
          will-change: transform;
          padding: 0.2rem 0;
        }

        .partner-marquee-row-top {
          animation: scroll 30s linear infinite;
        }

        .partner-marquee-row-bottom {
          animation: scrollReverse 34s linear infinite;
        }

        .partner-float-logo-wrap {
          flex: 0 0 auto;
          height: clamp(4.5rem, 9vw, 5.5rem);
          width: clamp(10rem, 18vw, 14rem);
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 0.9rem;
          background: rgba(255, 255, 255, 0.18);
          transition: transform 0.35s ease;
        }

        .partner-logo {
          display: block;
          width: 92%;
          max-width: 12.5rem;
          height: 82%;
          object-fit: contain;
          object-position: center;
          filter: drop-shadow(0 6px 14px rgba(17, 33, 23, 0.14));
          opacity: 0.93;
          transition: transform 0.35s ease, opacity 0.35s ease, filter 0.35s ease;
        }

        .partner-float-logo-wrap:hover {
          transform: translateY(-5px);
        }

        .partner-float-logo-wrap:hover .partner-logo {
          transform: scale(1.08);
          opacity: 1;
          filter: drop-shadow(0 10px 20px rgba(17, 33, 23, 0.2));
        }

        .partner-marquee-viewport:hover .partner-marquee-row {
          animation-play-state: paused;
        }

        @media (max-width: 768px) {
          .partner-float-logo-wrap {
            width: clamp(8.8rem, 42vw, 11.25rem);
            height: clamp(3.9rem, 16vw, 4.8rem);
          }

          .partner-logo {
            width: 94%;
            height: 84%;
          }
        }

        .view-all-link:hover {
          gap: 0.75rem;
        }
      `}</style>
    </div>
  );
}
