'use client';

import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { stats } from '../../lib/data';

export default function AboutPage() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />

      <main style={{ flex: 1 }}>
        {/* Hero Section */}
        <section style={{
          background: 'linear-gradient(135deg, var(--color-navy) 0%, var(--color-blue) 100%)',
          padding: '5rem 0 4rem',
          position: 'relative',
          overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `
              radial-gradient(circle at 20% 50%, rgba(0, 163, 163, 0.2) 0%, transparent 50%),
              radial-gradient(circle at 80% 50%, rgba(0, 163, 163, 0.2) 0%, transparent 50%)
            `,
          }} />
          <div className="container" style={{ position: 'relative', textAlign: 'center' }}>
            <h1 style={{
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              fontWeight: 700,
              color: 'white',
              marginBottom: '1.5rem',
              lineHeight: 1.2,
            }}>
              About WasteGrid Procure
            </h1>
            <p style={{
              fontSize: '1.25rem',
              color: 'rgba(255, 255, 255, 0.9)',
              maxWidth: '42rem',
              margin: '0 auto',
              lineHeight: 1.7,
            }}>
              Your trusted partner in industrial chemical procurement, connecting manufacturers 
              with verified suppliers worldwide since 2020.
            </p>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="section">
          <div className="container">
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr',
              gap: '3rem',
            }} className="about-grid">
              <div style={{
                background: 'linear-gradient(135deg, rgba(0, 102, 204, 0.05) 0%, rgba(0, 163, 163, 0.05) 100%)',
                padding: '3rem',
                borderRadius: '1rem',
                border: '1px solid rgba(0, 102, 204, 0.1)',
              }}>
                <div style={{
                  width: '3.5rem',
                  height: '3.5rem',
                  borderRadius: '0.75rem',
                  background: 'linear-gradient(135deg, var(--color-blue) 0%, var(--color-teal) 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1.5rem',
                }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2L2 7l10 5 10-5-10-5z" />
                    <path d="M2 17l10 5 10-5M2 12l10 5 10-5" />
                  </svg>
                </div>
                <h2 style={{
                  fontSize: '1.75rem',
                  fontWeight: 700,
                  color: 'var(--color-navy)',
                  marginBottom: '1rem',
                }}>
                  Our Mission
                </h2>
                <p style={{
                  fontSize: '1.0625rem',
                  color: 'var(--color-gray-600)',
                  lineHeight: 1.7,
                }}>
                  To revolutionize the industrial chemical supply chain by providing a transparent, 
                  efficient, and reliable B2B marketplace that connects manufacturers with high-quality 
                  suppliers. We strive to make chemical procurement faster, safer, and more cost-effective 
                  for businesses worldwide.
                </p>
              </div>

              <div style={{
                background: 'var(--color-white)',
                padding: '3rem',
                borderRadius: '1rem',
                border: '1px solid var(--color-gray-200)',
              }}>
                <div style={{
                  width: '3.5rem',
                  height: '3.5rem',
                  borderRadius: '0.75rem',
                  background: 'linear-gradient(135deg, var(--color-teal) 0%, var(--color-blue) 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1.5rem',
                }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                  </svg>
                </div>
                <h2 style={{
                  fontSize: '1.75rem',
                  fontWeight: 700,
                  color: 'var(--color-navy)',
                  marginBottom: '1rem',
                }}>
                  Our Vision
                </h2>
                <p style={{
                  fontSize: '1.0625rem',
                  color: 'var(--color-gray-600)',
                  lineHeight: 1.7,
                }}>
                  To become the world's leading digital platform for industrial chemical procurement, 
                  setting new standards for quality, reliability, and sustainability in the chemical 
                  industry. We envision a future where every manufacturer has seamless access to 
                  verified suppliers and competitive pricing.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section style={{
          background: 'var(--color-gray-50)',
          padding: '4rem 0',
        }}>
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
                Our Impact
              </h2>
              <p style={{
                fontSize: '1rem',
                color: 'var(--color-gray-500)',
              }}>
                Trusted by manufacturing companies worldwide
              </p>
            </div>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '2rem',
            }}>
              {stats.map((stat, index) => (
                <div key={index} style={{
                  textAlign: 'center',
                  padding: '2rem 1rem',
                  background: 'white',
                  borderRadius: '1rem',
                  border: '1px solid var(--color-gray-200)',
                }}>
                  <div style={{
                    fontSize: 'clamp(2rem, 4vw, 2.5rem)',
                    fontWeight: 700,
                    background: 'linear-gradient(135deg, var(--color-blue) 0%, var(--color-teal) 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    marginBottom: '0.5rem',
                  }}>
                    {stat.value}
                  </div>
                  <div style={{
                    fontSize: '0.9375rem',
                    color: 'var(--color-gray-600)',
                    fontWeight: 500,
                  }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Values */}
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
                Our Core Values
              </h2>
              <p style={{
                fontSize: '1rem',
                color: 'var(--color-gray-500)',
              }}>
                The principles that guide everything we do
              </p>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '2rem',
            }}>
              {[
                {
                  icon: (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    </svg>
                  ),
                  title: 'Trust & Transparency',
                  desc: 'We verify every supplier and maintain complete transparency in all transactions, ensuring you work with reliable partners.',
                },
                {
                  icon: (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                    </svg>
                  ),
                  title: 'Quality First',
                  desc: 'All products meet international quality standards. We rigorously vet suppliers to ensure consistent, high-quality materials.',
                },
                {
                  icon: (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                  ),
                  title: 'Efficiency',
                  desc: 'Streamlined procurement process that saves you time and resources, from quote requests to delivery.',
                },
                {
                  icon: (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                  ),
                  title: 'Customer Focus',
                  desc: '24/7 support team dedicated to helping you find the right materials and suppliers for your needs.',
                },
                {
                  icon: (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" />
                      <path d="M12 16v-4M12 8h.01" />
                    </svg>
                  ),
                  title: 'Innovation',
                  desc: 'Leveraging technology to continuously improve the procurement experience and supply chain efficiency.',
                },
                {
                  icon: (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 2L2 7l10 5 10-5-10-5z" />
                      <path d="M2 17l10 5 10-5" />
                    </svg>
                  ),
                  title: 'Sustainability',
                  desc: 'Promoting environmentally responsible practices and eco-friendly alternatives in the chemical industry.',
                },
              ].map((value, index) => (
                <div key={index} className="card" style={{
                  padding: '2rem',
                  transition: 'all var(--transition-fast)',
                }}>
                  <div style={{
                    width: '3rem',
                    height: '3rem',
                    borderRadius: '0.75rem',
                    background: 'linear-gradient(135deg, rgba(0, 102, 204, 0.1) 0%, rgba(0, 163, 163, 0.1) 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--color-blue)',
                    marginBottom: '1.25rem',
                  }}>
                    {value.icon}
                  </div>
                  <h3 style={{
                    fontSize: '1.125rem',
                    fontWeight: 600,
                    color: 'var(--color-navy)',
                    marginBottom: '0.75rem',
                  }}>
                    {value.title}
                  </h3>
                  <p style={{
                    fontSize: '0.9375rem',
                    color: 'var(--color-gray-600)',
                    lineHeight: 1.6,
                  }}>
                    {value.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section style={{
          background: 'linear-gradient(135deg, var(--color-navy) 0%, var(--color-blue) 100%)',
          padding: '4rem 0',
        }}>
          <div className="container" style={{ textAlign: 'center' }}>
            <h2 style={{
              fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
              fontWeight: 700,
              color: 'white',
              marginBottom: '1rem',
            }}>
              Ready to Get Started?
            </h2>
            <p style={{
              fontSize: '1.125rem',
              color: 'rgba(255, 255, 255, 0.9)',
              marginBottom: '2rem',
              maxWidth: '36rem',
              margin: '0 auto 2rem',
            }}>
              Join thousands of manufacturers who trust WasteGrid Procure for their chemical procurement needs.
            </p>
            <div style={{
              display: 'flex',
              gap: '1rem',
              justifyContent: 'center',
              flexWrap: 'wrap',
            }}>
              <Link href="/products" className="btn btn-teal" style={{
                padding: '1rem 2rem',
                fontSize: '1.0625rem',
              }}>
                Browse Products
              </Link>
              <Link href="/contact" className="btn btn-ghost" style={{
                padding: '1rem 2rem',
                fontSize: '1.0625rem',
                color: 'white',
                borderColor: 'rgba(255, 255, 255, 0.3)',
              }}>
                Contact Us
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      <style jsx global>{`
        @media (min-width: 768px) {
          .about-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
