'use client';

import { useState } from 'react';
import { useParams, notFound } from 'next/navigation';
import Link from 'next/link';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ProductCard from '../../components/ProductCard';
import QuoteRequestModal from '../../components/QuoteRequestModal';
import { products } from '../../../lib/data';

export default function ProductDetailPage() {
  const params = useParams();
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);

  const product = products.find(p => p.id === params.id);

  if (!product) {
    notFound();
  }

  const relatedProducts = products
    .filter(p => p.categoryId === product.categoryId && p.id !== product.id)
    .slice(0, 4);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />

      <main style={{ flex: 1, background: 'var(--color-gray-50)' }}>
        {/* Breadcrumb */}
        <section style={{
          background: 'var(--color-white)',
          borderBottom: '1px solid var(--color-gray-200)',
          padding: '1rem 0',
        }}>
          <div className="container">
            <nav style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontSize: '0.875rem',
            }}>
              <Link href="/" style={{ color: 'var(--color-gray-500)', textDecoration: 'none' }}>
                Home
              </Link>
              <span style={{ color: 'var(--color-gray-300)' }}>/</span>
              <Link href="/products" style={{ color: 'var(--color-gray-500)', textDecoration: 'none' }}>
                Products
              </Link>
              <span style={{ color: 'var(--color-gray-300)' }}>/</span>
              <span style={{ color: 'var(--color-navy)' }}>{product.name}</span>
            </nav>
          </div>
        </section>

        {/* Product Detail */}
        <section className="section">
          <div className="container">
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr',
              gap: '3rem',
            }} className="product-detail-grid">
              {/* Image */}
              <div style={{
                background: 'var(--color-white)',
                borderRadius: '1rem',
                border: '1px solid var(--color-gray-200)',
                aspectRatio: '4/3',
                position: 'relative',
                overflow: 'hidden',
              }}>
                {product.badge && (
                  <span style={{
                    position: 'absolute',
                    top: '1rem',
                    left: '1rem',
                    padding: '0.375rem 1rem',
                    background: product.badge === 'New' ? 'var(--color-teal)' : 'var(--color-blue)',
                    color: 'white',
                    fontSize: '0.8125rem',
                    fontWeight: 600,
                    borderRadius: '9999px',
                    zIndex: 1,
                  }}>
                    {product.badge}
                  </span>
                )}
                {product.image ? (
                  <img 
                    src={product.image}
                    alt={product.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                ) : (
                  // Fallback placeholder
                  <div style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'linear-gradient(135deg, var(--color-gray-100) 0%, var(--color-gray-50) 100%)',
                  }}>
                    <svg 
                      width="96" 
                      height="96" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="var(--color-gray-200)" 
                      strokeWidth="1" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    >
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                      <circle cx="8.5" cy="8.5" r="1.5" />
                      <polyline points="21,15 16,10 5,21" />
                    </svg>
                  </div>
                )}
              </div>

              {/* Info */}
              <div>
                <span className="badge badge-blue" style={{ marginBottom: '0.75rem' }}>
                  {product.category}
                </span>
                <h1 style={{
                  fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                  fontWeight: 700,
                  color: 'var(--color-navy)',
                  marginBottom: '1rem',
                  lineHeight: 1.3,
                }}>
                  {product.name}
                </h1>
                <p style={{
                  fontSize: '1.0625rem',
                  color: 'var(--color-gray-600)',
                  lineHeight: 1.7,
                  marginBottom: '2rem',
                }}>
                  {product.description}
                </p>

                {/* Features */}
                {product.features && (
                  <div style={{ marginBottom: '2rem' }}>
                    <h3 style={{
                      fontSize: '0.9375rem',
                      fontWeight: 600,
                      color: 'var(--color-navy)',
                      marginBottom: '0.75rem',
                    }}>
                      Key Features
                    </h3>
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(2, 1fr)',
                      gap: '0.625rem',
                    }}>
                      {product.features.map((feature, index) => (
                        <div key={index} style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          fontSize: '0.9375rem',
                          color: 'var(--color-gray-600)',
                        }}>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-teal)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20,6 9,17 4,12" />
                          </svg>
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Price Box */}
                <div style={{
                  background: 'linear-gradient(135deg, rgba(0, 102, 204, 0.05) 0%, rgba(0, 163, 163, 0.05) 100%)',
                  border: '1px solid rgba(0, 102, 204, 0.1)',
                  borderRadius: '1rem',
                  padding: '1.5rem',
                  marginBottom: '1.5rem',
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    marginBottom: '0.75rem',
                  }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-blue)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="12" y1="1" x2="12" y2="23" />
                      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                    </svg>
                    <span style={{
                      fontSize: '1rem',
                      fontWeight: 600,
                      color: 'var(--color-navy)',
                    }}>
                      Quote-Based Pricing
                    </span>
                  </div>
                  <p style={{
                    fontSize: '0.875rem',
                    color: 'var(--color-gray-600)',
                    lineHeight: 1.6,
                  }}>
                    Pricing varies based on configuration, quantity, and delivery requirements. 
                    Request a quote for competitive pricing from our verified suppliers.
                  </p>
                </div>

                {/* CTAs */}
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.75rem',
                }} className="product-ctas">
                  <button 
                    onClick={() => setIsQuoteModalOpen(true)}
                    className="btn btn-primary"
                    style={{
                      padding: '1rem 2rem',
                      fontSize: '1rem',
                    }}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                    </svg>
                    Request Quote for This Product
                  </button>
                  <Link 
                    href="/contact" 
                    className="btn btn-secondary"
                    style={{
                      padding: '1rem 2rem',
                      fontSize: '1rem',
                      justifyContent: 'center',
                    }}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                    Contact Sales Team
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="section" style={{ paddingTop: 0 }}>
            <div className="container">
              <h2 style={{
                fontSize: '1.5rem',
                fontWeight: 700,
                color: 'var(--color-navy)',
                marginBottom: '1.5rem',
              }}>
                Related Products
              </h2>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: '1.5rem',
              }}>
                {relatedProducts.map((relatedProduct) => (
                  <ProductCard
                    key={relatedProduct.id}
                    product={{
                      id: relatedProduct.id,
                      name: relatedProduct.name,
                      description: relatedProduct.description,
                      image: relatedProduct.image || '',
                      badge: relatedProduct.badge,
                      vertical: { id: relatedProduct.categoryId, name: relatedProduct.category },
                      originCountry: '',
                      purityGrade: '',
                      certifications: [],
                      createdAt: '',
                    }}
                    onRequestQuote={() => {
                      window.location.href = `/products/${relatedProduct.id}`;
                    }}
                  />
                ))}
              </div>
            </div>
          </section>
        )}

        <style jsx global>{`
          @media (min-width: 1024px) {
            .product-detail-grid {
              grid-template-columns: 1fr 1fr !important;
            }
            .product-ctas {
              flex-direction: row !important;
            }
          }
        `}</style>
      </main>

      <Footer />

      <QuoteRequestModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
        productName={product.name}
      />
    </div>
  );
}
