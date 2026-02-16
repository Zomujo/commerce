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
import { stats } from '../lib/data';
import Link from 'next/link';
import { ApiClient } from '@/lib/api-client';
import { Product, StrategicVertical } from '@/types/api';

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
  const [selectedProduct, setSelectedProduct] = useState<string | undefined>();
  const [products, setProducts] = useState<Product[]>([]);
  const [verticals, setVerticals] = useState<StrategicVertical[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [popularProducts, fetchedVerticals] = await Promise.all([
          ApiClient.getPopularProducts(4),
          // Fallback to manual fetch if getVerticals is not implemented yet or separate
          ApiClient.getVerticals().catch(() => []) 
        ]);
        setProducts(popularProducts);
        setVerticals(fetchedVerticals);
      } catch (error) {
        console.error('Failed to fetch home data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleRequestQuote = (productName?: string) => {
    setSelectedProduct(productName);
    setIsQuoteModalOpen(true);
  };

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

        {/* Trusted Partners - Auto-scrolling Carousel */}
        <section style={{
          padding: '4rem 0',
          background: 'var(--color-background-light)',
          borderTop: '1px solid var(--color-gray-200)',
          borderBottom: '1px solid var(--color-gray-200)',
          overflow: 'hidden',
          position: 'relative',
        }}>
          <div className="container">
            <div style={{
              textAlign: 'center',
              marginBottom: '3rem',
            }}>
              <p style={{
                fontSize: '0.875rem',
                fontWeight: 600,
                color: 'var(--color-gray-500)',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                marginBottom: '0.5rem',
              }}>
                Trusted by Industry Leaders
              </p>
              <h3 style={{
                fontSize: '1.75rem',
                fontWeight: 700,
                color: 'var(--color-navy)',
              }}>
                Official Distribution Partners
              </h3>
            </div>

            {/* Infinite Scrolling Container */}
            <div style={{
              position: 'relative',
              width: '100%',
              overflow: 'hidden',
            }}>
              {/* Gradient overlays for fade effect */}
              <div style={{
                position: 'absolute',
                left: 0,
                top: 0,
                bottom: 0,
                width: '150px',
                background: 'linear-gradient(90deg, var(--color-background-light) 0%, transparent 100%)',
                zIndex: 2,
              }} />
              <div style={{
                position: 'absolute',
                right: 0,
                top: 0,
                bottom: 0,
                width: '150px',
                background: 'linear-gradient(90deg, transparent 0%, var(--color-background-light) 100%)',
                zIndex: 2,
              }} />

              {/* Scrolling track - duplicate brands for seamless loop */}
              <div className="carousel-track" style={{
                display: 'flex',
                gap: '3rem',
                animation: 'scroll 30s linear infinite',
              }}>
                {/* First set of brands */}
                {trustedBrands.map((brand, index) => (
                  <div
                    key={`brand-1-${index}`}
                    style={{
                      flex: '0 0 auto',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: '2rem 3rem',
                      background: 'white',
                      borderRadius: '1rem',
                      border: '1px solid var(--color-gray-200)',
                      minWidth: '200px',
                      transition: 'all 0.3s ease',
                    }}
                    className="brand-logo-card"
                  >
                    <img 
                      src={brand.logo} 
                      alt={brand.name} 
                      style={{
                        height: '3rem',
                        width: 'auto',
                        objectFit: 'contain',
                        filter: 'grayscale(100%)',
                        opacity: 0.7,
                        transition: 'all 0.3s ease',
                      }}
                      className="brand-logo-img"
                    />
                  </div>
                ))}
                {/* Duplicate set for seamless infinite scroll */}
                {trustedBrands.map((brand, index) => (
                  <div
                    key={`brand-2-${index}`}
                    style={{
                      flex: '0 0 auto',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: '2rem 3rem',
                      background: 'white',
                      borderRadius: '1rem',
                      border: '1px solid var(--color-gray-200)',
                      minWidth: '200px',
                      transition: 'all 0.3s ease',
                    }}
                    className="brand-logo-card"
                  >
                    <img 
                      src={brand.logo} 
                      alt={brand.name} 
                      style={{
                        height: '3rem',
                        width: 'auto',
                        objectFit: 'contain',
                        filter: 'grayscale(100%)',
                        opacity: 0.7,
                        transition: 'all 0.3s ease',
                      }}
                      className="brand-logo-img"
                    />
                  </div>
                ))}
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
                  onRequestQuote={() => handleRequestQuote(product.name)}
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
        <StatsSection stats={stats} />

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
        productName={selectedProduct}
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
        
        .carousel-track:hover {
          animation-play-state: paused;
        }
        
        .brand-logo-card:hover {
          background: var(--color-white);
          transform: scale(1.05);
          box-shadow: 0 12px 32px rgba(0, 0, 0, 0.1);
          border-color: var(--primary);
        }
        
        .brand-logo-card:hover .brand-logo-img {
          filter: grayscale(0%) !important;
          opacity: 1 !important;
        }

        .view-all-link:hover {
          gap: 0.75rem;
        }
      `}</style>
    </div>
  );
}
