'use client';

import { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HeroSection from './components/HeroSection';
import CategoryCard from './components/CategoryCard';
import ProductCard from './components/ProductCard';
import StatsSection from './components/StatsSection';
import QuoteRequestModal from './components/QuoteRequestModal';
import { products, categories, stats } from '../lib/data';
import Link from 'next/link';

// Trusted partners/brands
const trustedBrands = [
  { name: 'BASF', logo: 'BASF' },
  { name: 'Dow Chemical', logo: 'DOW' },
  { name: 'LyondellBasell', logo: 'LYONDELL' },
  { name: 'DuPont', logo: 'DUPONT' },
  { name: 'SABIC', logo: 'SABIC' },
  { name: 'Covestro', logo: 'COVESTRO' },
];

export default function Home() {
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<string | undefined>();

  const handleRequestQuote = (productName?: string) => {
    setSelectedProduct(productName);
    setIsQuoteModalOpen(true);
  };

  // Products with discounts/hot deals
  const hotDeals = products.filter(p => p.badge === 'Popular' || p.badge === 'Bestseller').slice(0, 4);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />

      <main style={{ flex: 1 }}>
        {/* Hero */}
        <HeroSection />

        {/* Promotional Banner */}
        <section style={{
          background: 'linear-gradient(135deg, #0066CC 0%, #00A3A3 100%)',
          padding: '1rem 0',
        }}>
          <div className="container">
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '1rem',
              flexWrap: 'wrap',
              textAlign: 'center',
            }}>
              <span style={{
                display: 'inline-flex',
                padding: '0.375rem 0.875rem',
                background: 'rgba(255, 255, 255, 0.2)',
                backdropFilter: 'blur(10px)',
                borderRadius: '9999px',
                fontSize: '0.875rem',
                fontWeight: 600,
                color: 'white',
              }}>
                🔥 LIMITED TIME
              </span>
              <p style={{
                fontSize: '1rem',
                fontWeight: 500,
                color: 'white',
                margin: 0,
              }}>
                Get up to <strong>20% OFF</strong> on bulk orders • Free shipping on orders over $5,000
              </p>
              <Link 
                href="/products" 
                style={{
                  padding: '0.5rem 1.25rem',
                  background: 'white',
                  color: 'var(--color-blue)',
                  fontWeight: 600,
                  fontSize: '0.875rem',
                  borderRadius: '0.5rem',
                  textDecoration: 'none',
                  transition: 'all 0.2s',
                }}
                className="promo-cta"
              >
                Shop Now →
              </Link>
            </div>
          </div>
        </section>

        {/* Hot Deals Section */}
        <section className="section" style={{ background: 'var(--color-gray-50)' }}>
          <div className="container">
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '2rem',
              flexWrap: 'wrap',
              gap: '1rem',
            }}>
              <div>
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.375rem 0.875rem',
                  background: 'linear-gradient(135deg, #FF6B6B 0%, #FF8E53 100%)',
                  borderRadius: '9999px',
                  marginBottom: '0.75rem',
                }}>
                  <span style={{ fontSize: '1rem' }}>🔥</span>
                  <span style={{
                    fontSize: '0.8125rem',
                    fontWeight: 600,
                    color: 'white',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                  }}>
                    Hot Deals
                  </span>
                </div>
                <h2 style={{
                  fontSize: 'clamp(1.75rem, 3vw, 2.25rem)',
                  fontWeight: 700,
                  color: 'var(--color-navy)',
                  marginBottom: '0.5rem',
                }}>
                  Limited Time Offers
                </h2>
                <p style={{
                  fontSize: '1rem',
                  color: 'var(--color-gray-500)',
                }}>
                  Exclusive discounts on high-demand chemicals • While stocks last
                </p>
              </div>
              <Link 
                href="/products?tag=hotdeals"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.875rem 1.5rem',
                  background: 'var(--color-white)',
                  border: '2px solid var(--color-gray-200)',
                  borderRadius: '0.75rem',
                  color: 'var(--color-navy)',
                  fontWeight: 600,
                  textDecoration: 'none',
                  transition: 'all var(--transition-fast)',
                }}
                className="view-all-deals"
              >
                View All Deals
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
              {hotDeals.map((product) => (
                <div key={product.id} style={{ position: 'relative' }}>
                  {/* Discount Badge - Top Right Corner to avoid overlap */}
                  <div style={{
                    position: 'absolute',
                    top: '0.75rem',
                    right: '0.75rem',
                    zIndex: 10,
                    padding: '0.5rem 0.75rem',
                    background: 'linear-gradient(135deg, #FF6B6B 0%, #FF8E53 100%)',
                    borderRadius: '0.5rem',
                    boxShadow: '0 4px 12px rgba(255, 107, 107, 0.3)',
                  }}>
                    <span style={{
                      fontSize: '0.875rem',
                      fontWeight: 700,
                      color: 'white',
                    }}>
                      -15%
                    </span>
                  </div>
                  <ProductCard
                    id={product.id}
                    name={product.name}
                    category={product.category}
                    description={product.description}
                    image={product.image}
                    badge={product.badge}
                    onRequestQuote={() => handleRequestQuote(product.name)}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="section">
          <div className="container">
            <div style={{
              textAlign: 'center',
              marginBottom: '3rem',
            }}>
              <h2 style={{
                fontSize: 'clamp(1.75rem, 3vw, 2.25rem)',
                fontWeight: 700,
                color: 'var(--color-navy)',
                marginBottom: '0.75rem',
              }}>
                Chemical & Raw Material Categories
              </h2>
              <p style={{
                fontSize: '1rem',
                color: 'var(--color-gray-500)',
                maxWidth: '32rem',
                margin: '0 auto',
              }}>
                Explore our comprehensive range of industrial chemicals and raw materials.
              </p>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
              gap: '1.5rem',
            }}>
              {categories.map((category) => (
                <CategoryCard
                  key={category.id}
                  id={category.id}
                  name={category.name}
                  description={category.description}
                  productCount={category.productCount}
                  icon={category.icon}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Stats */}
        <StatsSection stats={stats} />

        {/* Trusted Partners - Auto-scrolling Carousel */}
        <section style={{
          padding: '4rem 0',
          background: 'linear-gradient(135deg, #F0F9FF 0%, #E0F2FE 50%, #F0FDFA 100%)',
          borderTop: '1px solid rgba(0, 163, 163, 0.2)',
          borderBottom: '1px solid rgba(0, 163, 163, 0.2)',
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
                background: 'linear-gradient(90deg, var(--color-gray-50) 0%, transparent 100%)',
                zIndex: 2,
              }} />
              <div style={{
                position: 'absolute',
                right: 0,
                top: 0,
                bottom: 0,
                width: '150px',
                background: 'linear-gradient(90deg, transparent 0%, var(--color-gray-50) 100%)',
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
                    <span style={{
                      fontSize: '1.375rem',
                      fontWeight: 700,
                      background: 'linear-gradient(135deg, #0066CC 0%, #00A3A3 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                      letterSpacing: '0.05em',
                    }}>
                      {brand.logo}
                    </span>
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
                    <span style={{
                      fontSize: '1.375rem',
                      fontWeight: 700,
                      color: 'var(--color-gray-400)',
                      letterSpacing: '0.05em',
                    }}>
                      {brand.logo}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="section" style={{ background: 'var(--color-gray-50)' }}>
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
                  Popular Chemicals & Materials
                </h2>
                <p style={{
                  fontSize: '1rem',
                  color: 'var(--color-gray-500)',
                  maxWidth: '32rem',
                  margin: '0 auto',
                }}>
                  Most-requested products from verified chemical suppliers worldwide.
                </p>
              </div>
              <Link 
                href="/products"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  color: 'var(--color-blue)',
                  fontWeight: 600,
                  textDecoration: 'none',
                  transition: 'gap var(--transition-fast)',
                }}
                className="view-all-link"
              >
                View All Products
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
              {products.slice(0, 8).map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  category={product.category}
                  description={product.description}
                  image={product.image}
                  badge={product.badge}
                  onRequestQuote={() => handleRequestQuote(product.name)}
                />
              ))}
            </div>
          </div>
        </section>

        {/* CTA Banner */}
        <section style={{
          background: 'linear-gradient(135deg, var(--color-navy) 0%, var(--color-blue) 100%)',
          position: 'relative',
          overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `
              radial-gradient(circle at 20% 50%, rgba(0, 163, 163, 0.15) 0%, transparent 50%),
              radial-gradient(circle at 80% 50%, rgba(0, 163, 163, 0.15) 0%, transparent 50%)
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
                  className="btn btn-teal"
                  style={{
                    padding: '1rem 2rem',
                    fontSize: '1.0625rem',
                  }}
                >
                  Request a Quote
                </button>
                <Link 
                  href="/contact"
                  className="btn btn-ghost"
                  style={{
                    padding: '1rem 2rem',
                    fontSize: '1.0625rem',
                    color: 'white',
                    borderColor: 'rgba(255, 255, 255, 0.3)',
                  }}
                >
                  Contact Sales
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="section">
          <div className="container">
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <h2 style={{
                fontSize: 'clamp(1.75rem, 3vw, 2.25rem)',
                fontWeight: 700,
                color: 'var(--color-navy)',
                marginBottom: '0.75rem',
              }}>
                How It Works
              </h2>
              <p style={{
                fontSize: '1rem',
                color: 'var(--color-gray-500)',
              }}>
                Simple steps to source your chemicals
              </p>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '2rem',
            }}>
              {[
                { step: '01', title: 'Browse & Search', desc: 'Explore our extensive catalog of industrial chemicals and raw materials.' },
                { step: '02', title: 'Request Quote', desc: 'Submit your requirements and get competitive quotes from verified suppliers.' },
                { step: '03', title: 'Compare & Order', desc: 'Review offers, negotiate terms, and place your order with confidence.' },
              ].map((item) => (
                <div key={item.step} style={{
                  textAlign: 'center',
                  padding: '2rem 1.5rem',
                }}>
                  <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '4rem',
                    height: '4rem',
                    background: 'linear-gradient(135deg, rgba(0, 102, 204, 0.1) 0%, rgba(0, 163, 163, 0.1) 100%)',
                    borderRadius: '1rem',
                    marginBottom: '1.5rem',
                  }}>
                    <span style={{
                      fontSize: '1.5rem',
                      fontWeight: 700,
                      background: 'linear-gradient(135deg, var(--color-blue) 0%, var(--color-teal) 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}>
                      {item.step}
                    </span>
                  </div>
                  <h3 style={{
                    fontSize: '1.125rem',
                    fontWeight: 600,
                    color: 'var(--color-navy)',
                    marginBottom: '0.5rem',
                  }}>
                    {item.title}
                  </h3>
                  <p style={{
                    fontSize: '0.9375rem',
                    color: 'var(--color-gray-500)',
                    lineHeight: 1.6,
                  }}>
                    {item.desc}
                  </p>
                </div>
              ))}
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
          border-color: var(--color-blue);
        }
        
        .brand-logo-card:hover span {
          color: var(--color-navy);
        }

        .promo-cta:hover {
          background: rgba(255, 255, 255, 0.9);
          transform: translateY(-2px);
        }
        .view-all-deals:hover {
          border-color: var(--color-blue);
          background: var(--color-blue);
          color: white;
          transform: translateY(-2px);
          box-shadow: 0 8px 16px rgba(0, 102, 204, 0.2);
        }
        .view-all-link:hover {
          gap: 0.75rem;
        }
      `}</style>
    </div>
  );
}
