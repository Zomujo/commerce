'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
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

  const isLightBg = pathname !== '/';

  return (
    <>
      <header style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 40,
        background: 'transparent',
        borderBottom: isLightBg ? '1px solid rgba(6, 35, 26, 0.1)' : '1px solid rgba(255, 255, 255, 0.1)',
      }}>
        <div className="header-row" style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '4.5rem',
          width: '100%',
          padding: '0 1rem',
          position: 'relative',
        }}>
          {/* Logo */}
          <Link href="/" style={{
            display: 'flex',
            alignItems: 'center',
            textDecoration: 'none',
          }}>
            <Image
              src="/logo.png"
              alt="WG Trade"
              width={120}
              height={40}
              style={{
                height: '2.75rem',
                width: 'auto',
                maxWidth: '10rem',
              }}
              priority
            />
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
                  className={`nav-link ${isLightBg ? 'nav-link-light' : 'nav-link-dark'}`}
                  style={{
                    position: 'relative',
                    color: active ? 'var(--wg-gold-main)' : (isLightBg ? '#06231A' : 'rgba(255, 255, 255, 0.8)'),
                    textDecoration: 'none',
                    fontSize: '0.9375rem',
                    fontWeight: active ? 600 : 500,
                    padding: '0.5rem 1rem',
                    transition: 'color 0.3s ease',
                  }}
                >
                  <span className="relative z-10">{link.label}</span>
                  {/* Active indicator */}
                  {active && (
                    <span style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: '2px',
                      background: 'var(--wg-gold-main)',
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
            <Link 
              href="/login" 
              style={{ 
                padding: '0.5rem 1rem', 
                fontSize: '0.875rem',
                border: isLightBg ? '1px solid #06231A' : '1px solid white',
                color: isLightBg ? '#06231A' : 'white',
                textDecoration: 'none',
                fontWeight: 500,
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = isLightBg ? '#06231A' : 'white';
                e.currentTarget.style.color = isLightBg ? 'white' : '#06231A';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = isLightBg ? '#06231A' : 'white';
              }}
            >
              Login
            </Link>
            <button 
              onClick={() => setIsQuoteModalOpen(true)} 
              style={{ 
                padding: '0.5rem 1rem', 
                fontSize: '0.875rem',
                background: 'var(--wg-gold-main)',
                color: '#06231A',
                border: 'none',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Request Product
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
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={isLightBg && !isMobileMenuOpen ? '#06231A' : 'white'} strokeWidth="2" strokeLinecap="round">
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
            background: 'var(--wg-green-main)',
            borderBottom: '1px solid rgba(255,255,255,0.1)',
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
                      color: active ? 'var(--wg-gold-main)' : 'rgba(255, 255, 255, 0.8)',
                      textDecoration: 'none',
                      fontSize: '1rem',
                      fontWeight: active ? 600 : 500,
                      padding: '0.75rem 1rem',
                      borderRadius: 0,
                      transition: 'all var(--transition-fast)',
                      background: active ? 'rgba(255, 255, 255, 0.05)' : 'transparent',
                      borderLeft: active ? '3px solid var(--wg-gold-main)' : '3px solid transparent',
                    }}
                    onMouseEnter={(e) => {
                      if (!active) {
                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                        e.currentTarget.style.color = 'var(--color-white)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!active) {
                        e.currentTarget.style.background = 'transparent';
                        e.currentTarget.style.color = 'rgba(255, 255, 255, 0.8)';
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
              borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            }}>
              <Link href="/login" style={{ 
                width: '100%', 
                display: 'block', 
                textAlign: 'center', 
                padding: '0.75rem',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                color: 'var(--color-white)',
                fontWeight: 600,
                textDecoration: 'none'
              }}>
                Login
              </Link>
              <button 
                onClick={() => { setIsQuoteModalOpen(true); setIsMobileMenuOpen(false); }} 
                style={{ 
                  width: '100%',
                  padding: '0.75rem',
                  background: 'var(--wg-gold-main)',
                  color: 'var(--wg-green-deep)',
                  border: 'none',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                Request Product
              </button>
            </div>
          </div>
        )}

        <style jsx global>{`
          .nav-link {
            position: relative;
            overflow: hidden;
            z-index: 1;
          }

          .nav-link::before {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            height: 2px;
            background: var(--wg-gold-main);
            transition: height 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            z-index: -1;
            transform-origin: bottom;
          }
          
          .nav-link:hover::before {
            height: 100%;
          }
          
          .nav-link-dark:hover {
            color: white !important;
          }
          
          .nav-link-light:hover {
            color: #06231A !important;
          }

          @media (min-width: 768px) {
            .header-row {
              padding: 0 2.5rem !important;
            }

            .desktop-nav {
              display: flex !important;
              position: absolute;
              left: 50%;
              transform: translateX(-50%);
            }

            .desktop-cta {
              display: flex !important;
              margin-left: auto;
            }

            .mobile-menu-btn {
              display: none !important;
            }

            .mobile-menu {
              display: none !important;
            }
          }

          @media (min-width: 1280px) {
            .header-row {
              padding: 0 3.5rem !important;
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
