'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import QuoteRequestModal from './QuoteRequestModal';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/products', label: 'Products' },
    { href: '/categories', label: 'Categories' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ];

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <>
      <header style={{
        position: 'sticky',
        top: 0,
        zIndex: 40,
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid var(--color-gray-200)',
      }}>
        <div className="container" style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '4.5rem',
        }}>
          {/* Logo */}
          <Link href="/" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            textDecoration: 'none',
          }}>
            <div style={{
              width: '2.5rem',
              height: '2.5rem',
              background: 'linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%)',
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
              color: 'var(--color-navy)',
              letterSpacing: '-0.02em',
            }}>
              WG<span style={{ color: 'var(--primary)' }}>Trade</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav style={{
            display: 'none',
            gap: '2rem',
          }} className="desktop-nav">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link 
                  key={link.href} 
                  href={link.href}
                  className="nav-link"
                  style={{
                    position: 'relative',
                    color: active ? 'var(--color-blue)' : 'var(--color-gray-600)',
                    textDecoration: 'none',
                    fontSize: '0.9375rem',
                    fontWeight: active ? 600 : 500,
                    transition: 'color var(--transition-fast)',
                    padding: '0.5rem 0',
                  }}
                >
                  {link.label}
                  {/* Active indicator */}
                  {active && (
                    <span style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: '2px',
                      background: 'linear-gradient(90deg, var(--color-blue) 0%, var(--color-teal) 100%)',
                      borderRadius: '2px',
                    }} />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Desktop CTA Buttons */}
          <div style={{
            display: 'none',
            gap: '0.75rem',
          }} className="desktop-cta">
            <Link href="/contact" className="btn btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}>
              Login
            </Link>
            <button 
              onClick={() => setIsQuoteModalOpen(true)} 
              className="btn btn-primary" 
              style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}
            >
              Request Quote
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            style={{
              display: 'flex',
              padding: '0.5rem',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
            }}
            className="mobile-menu-btn"
            aria-label="Toggle menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--color-navy)" strokeWidth="2" strokeLinecap="round">
              {isMobileMenuOpen ? (
                <>
                  <path d="M18 6L6 18" />
                  <path d="M6 6l12 12" />
                </>
              ) : (
                <>
                  <path d="M3 12h18" />
                  <path d="M3 6h18" />
                  <path d="M3 18h18" />
                </>
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            background: 'var(--color-white)',
            borderBottom: '1px solid var(--color-gray-200)',
            padding: '1rem',
            boxShadow: 'var(--shadow-lg)',
          }} className="mobile-menu">
            <nav style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem',
            }}>
              {navLinks.map((link) => {
                const active = isActive(link.href);
                return (
                  <Link 
                    key={link.href} 
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    style={{
                      color: active ? 'var(--color-blue)' : 'var(--color-gray-600)',
                      textDecoration: 'none',
                      fontSize: '1rem',
                      fontWeight: active ? 600 : 500,
                      padding: '0.75rem 1rem',
                      borderRadius: '0.5rem',
                      transition: 'all var(--transition-fast)',
                      background: active ? 'rgba(0, 102, 204, 0.08)' : 'transparent',
                      borderLeft: active ? '3px solid var(--color-blue)' : '3px solid transparent',
                    }}
                    onMouseEnter={(e) => {
                      if (!active) {
                        e.currentTarget.style.background = 'var(--color-gray-50)';
                        e.currentTarget.style.color = 'var(--color-blue)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!active) {
                        e.currentTarget.style.background = 'transparent';
                        e.currentTarget.style.color = 'var(--color-gray-600)';
                      }
                    }}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem',
              marginTop: '1rem',
              paddingTop: '1rem',
              borderTop: '1px solid var(--color-gray-200)',
            }}>
              <Link href="/contact" className="btn btn-secondary" style={{ width: '100%' }}>
                Login
              </Link>
              <button 
                onClick={() => { setIsQuoteModalOpen(true); setIsMobileMenuOpen(false); }} 
                className="btn btn-primary" 
                style={{ width: '100%' }}
              >
                Request Quote
              </button>
            </div>
          </div>
        )}

        <style jsx global>{`
          .nav-link::before {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            height: 2px;
            background: linear-gradient(90deg, var(--color-blue) 0%, var(--color-teal) 100%);
            transform: scaleX(0);
            transition: transform 0.3s ease;
            border-radius: 2px;
          }
          
          .nav-link:hover::before {
            transform: scaleX(1);
          }
          
          .nav-link:hover {
            color: var(--color-blue) !important;
          }

          @media (min-width: 768px) {
            .desktop-nav {
              display: flex !important;
            }
            .desktop-cta {
              display: flex !important;
            }
            .mobile-menu-btn {
              display: none !important;
            }
            .mobile-menu {
              display: none !important;
            }
          }
        `}</style>
      </header>

      <QuoteRequestModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
      />
    </>
  );
}
