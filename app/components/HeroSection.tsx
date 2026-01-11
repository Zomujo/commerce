'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function HeroSection() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <section style={{
      position: 'relative',
      backgroundImage: 'url(/background-image.png)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      overflow: 'hidden',
    }}>
      {/* Dark Overlay for text readability */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(180deg, rgba(10, 22, 40, 0.85) 0%, rgba(10, 22, 40, 0.75) 100%)',
      }} />

      {/* Background Pattern on top of image */}
      <div style={{
        position: 'absolute',
        inset: 0,
        opacity: 0.15,
        backgroundImage: `
          radial-gradient(circle at 20% 80%, rgba(0, 163, 163, 0.3) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(0, 163, 163, 0.3) 0%, transparent 50%)
        `,
      }} />

      <div className="container" style={{
        position: 'relative',
        paddingTop: '5rem',
        paddingBottom: '5rem',
      }}>
        <div style={{
          maxWidth: '48rem',
          margin: '0 auto',
          textAlign: 'center',
        }}>
          {/* Badge */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.5rem 1rem',
            background: 'rgba(255, 255, 255, 0.15)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '9999px',
            marginBottom: '1.5rem',
          }}>
            <span style={{
              width: '0.5rem',
              height: '0.5rem',
              borderRadius: '50%',
              background: 'var(--color-teal-light)',
            }} />
            <span style={{
              fontSize: '0.875rem',
              fontWeight: 500,
              color: 'var(--color-white)',
            }}>
              Trusted by 800+ Manufacturing Companies
            </span>
          </div>

          {/* Main Heading */}
          <h1 style={{
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            fontWeight: 700,
            color: 'var(--color-white)',
            lineHeight: 1.15,
            marginBottom: '1.5rem',
            letterSpacing: '-0.02em',
          }}>
            Source Industrial Chemicals
            <br />
            <span style={{ color: 'var(--color-teal-light)' }}>with Confidence</span>
          </h1>

          {/* Subheading */}
          <p style={{
            fontSize: '1.125rem',
            color: 'rgba(255, 255, 255, 0.9)',
            lineHeight: 1.7,
            marginBottom: '2.5rem',
            maxWidth: '36rem',
            margin: '0 auto 2.5rem',
          }}>
            Connect with verified chemical suppliers worldwide. Request quotes for polymers, 
            solvents, pigments, additives, and specialty chemicals — all in one platform.
          </p>

          {/* Search Bar */}
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              if (searchQuery.trim()) {
                window.location.href = `/products?search=${encodeURIComponent(searchQuery)}`;
              }
            }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem',
              maxWidth: '32rem',
              margin: '0 auto 2rem',
            }}
            className="hero-search"
          >
            <div style={{
              display: 'flex',
              gap: '0.75rem',
              flexDirection: 'column',
            }} className="search-input-group">
              <div style={{
                position: 'relative',
                flex: 1,
              }}>
                <svg 
                  width="20" 
                  height="20" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="var(--color-gray-400)" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                  style={{
                    position: 'absolute',
                    left: '1rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                  }}
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.3-4.3" />
                </svg>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search chemicals and raw materials..."
                  className="input"
                  style={{
                    paddingLeft: '3rem',
                    height: '3.25rem',
                    fontSize: '1rem',
                    boxShadow: 'var(--shadow-sm)',
                  }}
                />
              </div>
              <button 
                type="submit" 
                className="btn btn-primary"
                style={{
                  height: '3.25rem',
                  paddingLeft: '2rem',
                  paddingRight: '2rem',
                  whiteSpace: 'nowrap',
                }}
              >
                Search Products
              </button>
            </div>
          </form>

          {/* Quick Links */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '0.5rem',
          }}>
            <span style={{ fontSize: '0.875rem', color: 'rgba(255, 255, 255, 0.7)' }}>Popular:</span>
            {['PET Resin', 'Titanium Dioxide', 'Solvents', 'Carbon Black'].map((term) => (
              <Link 
                key={term}
                href={`/products?search=${encodeURIComponent(term)}`}
                style={{
                  fontSize: '0.875rem',
                  color: 'var(--color-white)',
                  textDecoration: 'none',
                  padding: '0.25rem 0.75rem',
                  background: 'rgba(255, 255, 255, 0.15)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '9999px',
                  transition: 'all var(--transition-fast)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.25)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                }}
              >
                {term}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <style jsx global>{`
        @media (min-width: 640px) {
          .search-input-group {
            flex-direction: row !important;
          }
        }
      `}</style>
    </section>
  );
}
