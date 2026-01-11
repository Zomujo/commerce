'use client';

import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    products: [
      { href: '/categories/diagnostic', label: 'Diagnostic Equipment' },
      { href: '/categories/surgical', label: 'Surgical Instruments' },
      { href: '/categories/laboratory', label: 'Laboratory Equipment' },
      { href: '/categories/patient-care', label: 'Patient Care' },
      { href: '/categories/imaging', label: 'Imaging Systems' },
    ],
    company: [
      { href: '/about', label: 'About Us' },
      { href: '/contact', label: 'Contact' },
      { href: '/careers', label: 'Careers' },
      { href: '/blog', label: 'Blog' },
    ],
    support: [
      { href: '/faq', label: 'FAQ' },
      { href: '/shipping', label: 'Shipping Info' },
      { href: '/returns', label: 'Returns Policy' },
      { href: '/terms', label: 'Terms of Service' },
      { href: '/privacy', label: 'Privacy Policy' },
    ],
  };

  return (
    <footer style={{
      background: 'var(--color-navy)',
      color: 'var(--color-white)',
      paddingTop: '4rem',
      paddingBottom: '2rem',
    }}>
      <div className="container">
        {/* Main Footer Content */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '3rem',
          marginBottom: '3rem',
        }}>
          {/* Brand Column */}
          <div style={{ gridColumn: 'span 1' }}>
            <Link href="/" style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              textDecoration: 'none',
              marginBottom: '1.25rem',
            }}>
              <div style={{
                width: '2.5rem',
                height: '2.5rem',
                background: 'linear-gradient(135deg, var(--color-blue) 0%, var(--color-teal) 100%)',
                borderRadius: '0.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2v20M2 12h20" />
                </svg>
              </div>
              <span style={{
                fontSize: '1.25rem',
                fontWeight: 700,
                color: 'var(--color-white)',
                letterSpacing: '-0.02em',
              }}>
                Med<span style={{ color: 'var(--color-teal-light)' }}>Procure</span>
              </span>
            </Link>
            <p style={{
              color: 'var(--color-gray-400)',
              fontSize: '0.875rem',
              lineHeight: 1.7,
              marginBottom: '1.5rem',
            }}>
              Your trusted B2B marketplace for industrial chemicals and raw materials. Connect with verified suppliers worldwide.
            </p>
            {/* Social Links */}
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              {['linkedin', 'twitter', 'facebook'].map((social) => (
                <a
                  key={social}
                  href={`https://${social}.com`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    width: '2.25rem',
                    height: '2.25rem',
                    borderRadius: '0.5rem',
                    background: 'rgba(255,255,255,0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all var(--transition-fast)',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = 'var(--color-blue)'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                    {social === 'linkedin' && (
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2zM4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
                    )}
                    {social === 'twitter' && (
                      <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
                    )}
                    {social === 'facebook' && (
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                    )}
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Products Column */}
          <div>
            <h4 style={{
              fontSize: '0.875rem',
              fontWeight: 600,
              color: 'var(--color-white)',
              marginBottom: '1.25rem',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}>Products</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {footerLinks.products.map((link) => (
                <li key={link.href} style={{ marginBottom: '0.75rem' }}>
                  <Link href={link.href} style={{
                    color: 'var(--color-gray-400)',
                    textDecoration: 'none',
                    fontSize: '0.875rem',
                    transition: 'color var(--transition-fast)',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-white)'}
                  onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-gray-400)'}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h4 style={{
              fontSize: '0.875rem',
              fontWeight: 600,
              color: 'var(--color-white)',
              marginBottom: '1.25rem',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}>Company</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {footerLinks.company.map((link) => (
                <li key={link.href} style={{ marginBottom: '0.75rem' }}>
                  <Link href={link.href} style={{
                    color: 'var(--color-gray-400)',
                    textDecoration: 'none',
                    fontSize: '0.875rem',
                    transition: 'color var(--transition-fast)',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-white)'}
                  onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-gray-400)'}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Column */}
          <div>
            <h4 style={{
              fontSize: '0.875rem',
              fontWeight: 600,
              color: 'var(--color-white)',
              marginBottom: '1.25rem',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}>Support</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {footerLinks.support.map((link) => (
                <li key={link.href} style={{ marginBottom: '0.75rem' }}>
                  <Link href={link.href} style={{
                    color: 'var(--color-gray-400)',
                    textDecoration: 'none',
                    fontSize: '0.875rem',
                    transition: 'color var(--transition-fast)',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-white)'}
                  onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-gray-400)'}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div style={{
          background: 'rgba(255,255,255,0.05)',
          borderRadius: '1rem',
          padding: '2rem',
          marginBottom: '3rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
        }} className="newsletter-section">
          <div>
            <h4 style={{
              fontSize: '1.125rem',
              fontWeight: 600,
              color: 'var(--color-white)',
              marginBottom: '0.5rem',
            }}>Stay Updated</h4>
            <p style={{
              color: 'var(--color-gray-400)',
              fontSize: '0.875rem',
            }}>Get the latest product updates and industry news.</p>
          </div>
          <form style={{
            display: 'flex',
            gap: '0.75rem',
            flexDirection: 'column',
          }} className="newsletter-form">
            <input
              type="email"
              placeholder="Enter your email"
              style={{
                flex: 1,
                padding: '0.75rem 1rem',
                borderRadius: '0.5rem',
                border: '1px solid rgba(255,255,255,0.2)',
                background: 'rgba(255,255,255,0.1)',
                color: 'var(--color-white)',
                fontSize: '0.875rem',
              }}
            />
            <button type="submit" className="btn btn-teal" style={{ whiteSpace: 'nowrap' }}>
              Subscribe
            </button>
          </form>
        </div>

        {/* Bottom Bar */}
        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.1)',
          paddingTop: '2rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          alignItems: 'center',
          textAlign: 'center',
        }} className="footer-bottom">
          <p style={{
            color: 'var(--color-gray-400)',
            fontSize: '0.875rem',
          }}>
            © {currentYear} WasteGrid Procure. All rights reserved.
          </p>
        </div>
      </div>

      <style jsx global>{`
        @media (min-width: 768px) {
          .newsletter-section {
            flex-direction: row !important;
            align-items: center !important;
            justify-content: space-between !important;
          }
          .newsletter-form {
            flex-direction: row !important;
            width: auto !important;
          }
          .newsletter-form input {
            width: 280px !important;
          }
          .footer-bottom {
            flex-direction: row !important;
            justify-content: center !important;
          }
        }
      `}</style>
    </footer>
  );
}
