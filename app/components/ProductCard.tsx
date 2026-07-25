'use client';

import Link from 'next/link';
import { Product } from '@/types/api';

interface ProductCardProps {
  product: Product;
  onRequestQuote?: () => void;
}

export default function ProductCard({ 
  product,
  onRequestQuote 
}: ProductCardProps) {
  const { id, name, description, image, badge } = product;
  const categoryName = product.verticalName || 'Industrial';
  return (
    <div className="group bg-white border border-[#E2DDD3] hover:border-[#D4C9A8] transition-all duration-300" style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
    }}>
      {/* Image */}
      <div style={{
        position: 'relative',
        aspectRatio: '4/3',
        background: '#F8F7F3',
        overflow: 'hidden',
        borderBottom: '1px solid #E2DDD3',
      }}>
        {image ? (
          <img 
            src={image}
            alt={name}
            className="group-hover:scale-105 transition-transform duration-700"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        ) : (
          // Fallback placeholder if no image
          <div style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#F8F7F3',
          }}>
            <svg 
              width="64" 
              height="64" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="#D4C9A8" 
              strokeWidth="1" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <rect x="3" y="3" width="18" height="18" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21,15 16,10 5,21" />
            </svg>
          </div>
        )}

        {/* Badge */}
        {badge && (
          <span style={{
            position: 'absolute',
            top: '1rem',
            left: '1rem',
            padding: '0.25rem 0.75rem',
            background: badge === 'New' ? '#0F4534' : '#06231A',
            color: 'white',
            fontSize: '0.75rem',
            fontWeight: 600,
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
          }}>
            {badge}
          </span>
        )}
      </div>

      {/* Content */}
      <div style={{
        padding: '1.5rem',
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
      }}>
        {/* Category */}
        <span style={{
          fontSize: '0.75rem',
          fontWeight: 600,
          color: '#D4C9A8',
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          marginBottom: '0.75rem',
          fontFamily: 'monospace',
        }}>
          {categoryName}
        </span>

        {/* Name */}
        <Link 
          href={`/products/${id}`}
          style={{
            fontSize: '1.25rem',
            fontWeight: 500,
            color: '#06231A',
            textDecoration: 'none',
            marginBottom: '0.75rem',
            lineHeight: 1.3,
            transition: 'color 0.2s ease',
          }}
          onMouseEnter={(e) => e.currentTarget.style.color = '#0F4534'}
          onMouseLeave={(e) => e.currentTarget.style.color = '#06231A'}
        >
          {name}
        </Link>

        {/* Description */}
        <p style={{
          fontSize: '0.875rem',
          color: '#4B5563',
          lineHeight: 1.6,
          fontWeight: 300,
          marginBottom: '1.5rem',
          flex: 1,
          display: '-webkit-box',
          WebkitLineClamp: 3,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        }}>
          {description}
        </p>

        {/* CTA */}
        <button 
          onClick={onRequestQuote}
          className="group/btn"
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
            padding: '0.75rem 1rem',
            background: 'transparent',
            border: '1px solid #06231A',
            color: '#06231A',
            fontSize: '0.875rem',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#06231A';
            e.currentTarget.style.color = 'white';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.color = '#06231A';
          }}
        >
          Request Quote
          <svg 
            width="16" 
            height="16" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            className="transition-transform duration-300 group-hover/btn:translate-x-1"
          >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}
