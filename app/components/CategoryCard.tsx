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
      }}
    >
      <div 
        className="category-card"
        style={{
          position: 'relative',
          borderRadius: '1rem',
          overflow: 'hidden',
          background: 'var(--color-white)',
          cursor: 'pointer',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease',
          border: '1px solid var(--color-gray-200)',
          boxShadow: 'var(--shadow-sm)',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
        }}
      >
        {/* Image */}
        <div style={{
          position: 'relative',
          height: '210px',
          overflow: 'hidden',
          borderBottom: '1px solid var(--color-gray-200)',
        }}>
          <div style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `url(${imageUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            transition: 'transform 0.5s ease',
          }} className="category-bg" />
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(180deg, rgba(17, 33, 23, 0.08) 0%, rgba(17, 33, 23, 0.38) 100%)',
          }} />
        </div>

        {/* Content */}
        <div style={{
          position: 'relative',
          padding: '1.25rem 1.25rem 1.35rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.75rem',
          flex: 1,
        }}>
           <div style={{
             display: 'flex',
             alignItems: 'center',
             justifyContent: 'flex-end',
             paddingBottom: '0.55rem',
             borderBottom: '1px solid var(--color-gray-200)',
           }}>
             <span style={{
               fontSize: '0.78rem',
               fontWeight: 600,
               color: 'var(--color-gray-600)',
               fontVariantNumeric: 'tabular-nums',
               whiteSpace: 'nowrap',
             }}>
               {category.productCount || 0}+ products
             </span>
           </div>

          <h3 style={{
            fontSize: '1.4rem',
            fontWeight: 700,
            color: 'var(--color-navy)',
            lineHeight: 1.2,
          }}>
            {category.name}
          </h3>

          <p style={{
            fontSize: '0.93rem',
            color: 'var(--color-gray-500)',
            lineHeight: 1.6,
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            minHeight: '4.5em',
          }}>
            {description}
          </p>

          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontSize: '0.9375rem',
            fontWeight: 600,
            color: 'var(--color-navy)',
            marginTop: 'auto',
          }}>
            <span>Explore Category</span>
            <svg 
              width="18" 
              height="18" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              style={{
                transition: 'transform 0.3s ease',
              }}
              className="category-arrow"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </div>
        </div>

        {/* Hover Styles */}
        <style jsx>{`
          .category-card:hover .category-bg {
            transform: scale(1.08);
          }
          .category-card:hover .category-arrow {
            transform: translateX(4px);
          }
          .category-card:hover {
            box-shadow: var(--shadow-xl);
            transform: translateY(-4px);
            border-color: rgba(29, 201, 98, 0.45);
          }
        `}</style>
      </div>
    </Link>
  );
}
