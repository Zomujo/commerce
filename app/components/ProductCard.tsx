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
  // Handle vertical object or string depending on API response structure, 
  // though our type says vertical is StrategicVertical object.
  const categoryName = product.vertical?.name || 'Industrial';
  return (
    <div className="card" style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
    }}>
      {/* Image */}
      <div style={{
        position: 'relative',
        aspectRatio: '4/3',
        background: 'var(--color-gray-100)',
        overflow: 'hidden',
      }}>
        {image ? (
          <img 
            src={image}
            alt={name}
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
            background: 'linear-gradient(135deg, var(--color-gray-100) 0%, var(--color-gray-50) 100%)',
          }}>
            <svg 
              width="64" 
              height="64" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="var(--color-gray-300)" 
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

        {/* Badge */}
        {badge && (
          <span style={{
            position: 'absolute',
            top: '0.75rem',
            left: '0.75rem',
            padding: '0.25rem 0.75rem',
            background: badge === 'New' ? 'var(--color-teal)' : 'var(--color-blue)',
            color: 'white',
            fontSize: '0.75rem',
            fontWeight: 600,
            borderRadius: '9999px',
          }}>
            {badge}
          </span>
        )}
      </div>

      {/* Content */}
      <div style={{
        padding: '1.25rem',
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
      }}>
        {/* Category */}
        <span style={{
          fontSize: '0.75rem',
          fontWeight: 500,
          color: 'var(--color-blue)',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          marginBottom: '0.5rem',
        }}>
          {categoryName}
        </span>

        {/* Name */}
        <Link 
          href={`/products/${id}`}
          style={{
            fontSize: '1rem',
            fontWeight: 600,
            color: 'var(--color-navy)',
            textDecoration: 'none',
            marginBottom: '0.5rem',
            lineHeight: 1.4,
            transition: 'color var(--transition-fast)',
          }}
          onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-blue)'}
          onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-navy)'}
        >
          {name}
        </Link>

        {/* Description */}
        <p style={{
          fontSize: '0.875rem',
          color: 'var(--color-gray-500)',
          lineHeight: 1.6,
          marginBottom: '1rem',
          flex: 1,
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        }}>
          {description}
        </p>

        {/* CTA */}
        <button 
          onClick={onRequestQuote}
          className="btn btn-secondary"
          style={{
            width: '100%',
            justifyContent: 'center',
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
          Request Quote
        </button>
      </div>
    </div>
  );
}
