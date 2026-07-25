import React from 'react';
import Link from 'next/link';
import { StrategicVertical } from '@/types/api';
import { resolveCategoryImage } from '@/lib/category-image';

interface CategoryCardProps {
  category: StrategicVertical;
}

export default function CategoryCard({ category }: CategoryCardProps) {
  const imageUrl = resolveCategoryImage(category);
  
  // Use DB description or fallback
  const description = category.description || category.tagline || 'Industrial grade materials';

  return (
    <Link 
      href={`/categories/${category.id}`}
      style={{
        display: 'block',
        textDecoration: 'none',
        height: '100%',
      }}
      className="group"
    >
      <div 
        style={{
          position: 'relative',
          background: 'white',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
        }}
        className="border border-[#E2DDD3] group-hover:border-[#06231A]"
      >
        {/* Image */}
        <div style={{
          position: 'relative',
          height: '240px',
          overflow: 'hidden',
          borderBottom: '1px solid #E2DDD3',
        }}>
          <div style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `url(${imageUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }} className="transition-transform duration-700 group-hover:scale-105" />
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(180deg, rgba(6, 35, 26, 0.05) 0%, rgba(6, 35, 26, 0.4) 100%)',
          }} />
          
          {/* Product Count Badge */}
          <div style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            background: '#06231A',
            color: 'white',
            padding: '0.25rem 0.75rem',
            fontSize: '0.75rem',
            fontWeight: 600,
            fontFamily: 'monospace',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
          }}>
            {category.productCount || 0} PRODUCTS
          </div>
        </div>

        {/* Content */}
        <div style={{
          position: 'relative',
          padding: '1.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          flex: 1,
        }}>
          <div>
            <h3 style={{
              fontSize: '1.25rem',
              fontWeight: 500,
              color: '#06231A',
              lineHeight: 1.2,
              marginBottom: '0.5rem',
              letterSpacing: '-0.02em',
            }}>
              {category.name}
            </h3>
            
            <p style={{
              fontSize: '0.875rem',
              color: '#4B5563',
              lineHeight: 1.6,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              fontWeight: 300,
            }}>
              {description}
            </p>
          </div>

          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontSize: '0.875rem',
            fontWeight: 600,
            color: '#06231A',
            marginTop: 'auto',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
          }}>
            Explore
            <svg 
              width="16" 
              height="16" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              className="transition-transform duration-300 group-hover:translate-x-1"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
}
