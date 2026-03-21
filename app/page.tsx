'use client';

import { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HeroSection from './components/HeroSection';
import StrategicVerticals from './components/StrategicVerticals';
import TrustEngine from './components/TrustEngine';
import ProductCard from './components/ProductCard';
import CategoryCard from './components/CategoryCard';
import StatsSection from './components/StatsSection';
import QuoteRequestModal from './components/QuoteRequestModal';
import Link from 'next/link';
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
  const [products, setProducts] = useState<Product[]>([]);
  const [verticals, setVerticals] = useState<StrategicVertical[]>([]);
  const [stats, setStats] = useState<PlatformStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [popularProducts, fetchedVerticals, fetchedStats] = await Promise.all([
          ApiClient.getPopularProducts(4),
          ApiClient.getVerticals().catch(() => []),
          ApiClient.getStats().catch(() => null)
        ]);
        setProducts(popularProducts);
        setVerticals(fetchedVerticals);
        setStats(fetchedStats);
      } catch (error) {
        console.error('Failed to fetch home data:', error);
      } finally {
        setIsLoading(false);
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

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />

      <main style={{ flex: 1 }}>
        {/* Hero */}
        <HeroSection />

        {/* Strategic Verticals */}

        {/* Strategic Verticals Section */}
        <section className="section" style={{ background: 'var(--color-background-light)' }}>
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
              gap: '2rem',
            }}>
              {verticals.length > 0 ? verticals.map((vertical) => (
                <CategoryCard
                  key={vertical.id}
                  category={vertical}
                />
              )) : (
                // Loading Skeleton or Fallback
                <p>Loading market verticals...</p>
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
                      <img src={brand.logo} alt={brand.name} draggable={false} className="partner-logo" />
                    </div>
                  ))}
                </div>
              </div>

              <div className="partner-marquee-viewport" style={{ position: 'relative', width: '100%', overflow: 'hidden', marginTop: '1rem' }}>
                <div className="partner-marquee-row partner-marquee-row-bottom">
                  {[...trustedBrands.slice().reverse(), ...trustedBrands.slice().reverse()].map((brand, index) => (
                    <div key={`partner-bottom-${brand.name}-${index}`} className="partner-float-logo-wrap">
                      <img src={brand.logo} alt={brand.name} draggable={false} className="partner-logo" />
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
              {products.length > 0 ? products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onRequestQuote={() => handleRequestQuote(product.id, product.name)}
                />
              )) : (
                 <p>Loading products...</p>
              )}
            </div>
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
                WG Trade was founded by industry experts to change that. We aren't just a marketplace; 
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
                Get competitive quotes from verified chemical suppliers. Our team is ready to help you 
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
                  Submit a Request for Quote (RfQ)
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
