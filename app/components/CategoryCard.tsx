import React from 'react';
import Link from 'next/link';
import { StrategicVertical } from '@/types/api';

interface CategoryCardProps {
  category: StrategicVertical;
}

// Map category IDs to image filenames
const categoryImages: Record<string, string> = {
  'critical-minerals': '/minerals.png',
  'industrial-chemicals': '/solvents.png',
  'bulk-raw-materials': '/polymers.png',
  // Fallbacks for potential other IDs
  polymers: '/polymers.png',
  solvents: '/solvents.png',
  pigments: '/pigments.png',
  additives: '/additives.png',
  minerals: '/minerals.png',
  specialty: '/specialty.png',
};

export default function CategoryCard({ category }: CategoryCardProps) {
  const imageUrl = categoryImages[category.id] || '/polymers.png';
  
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
          height: '320px',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          border: '1px solid var(--color-gray-200)',
        }}
      >
        {/* Background Image */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url(${imageUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          transition: 'transform 0.3s ease',
        }} className="category-bg" />

        {/* Gradient Overlay */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, rgba(10, 22, 40, 0.3) 0%, rgba(10, 22, 40, 0.85) 100%)',
          transition: 'background 0.3s ease',
        }} className="category-overlay" />

        {/* Content */}
        <div style={{
          position: 'relative',
          height: '100%',
          padding: '1.75rem',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
        }}>
          {/* Product Count Badge */}
          <div style={{
            position: 'absolute',
            top: '1.25rem',
            right: '1.25rem',
            padding: '0.375rem 0.875rem',
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
            borderRadius: '9999px',
            fontSize: '0.8125rem',
            fontWeight: 600,
            color: 'var(--color-navy)',
          }}>
            {category.productCount || 0}+ Products
          </div>

          {/* Title */}
          <h3 style={{
            fontSize: '1.5rem',
            fontWeight: 700,
            color: 'var(--color-white)',
            marginBottom: '0.625rem',
            lineHeight: 1.2,
            textShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
          }}>
            {category.name}
          </h3>

          {/* Description */}
          <p style={{
            fontSize: '0.9375rem',
            color: 'rgba(255, 255, 255, 0.9)',
            lineHeight: 1.5,
            marginBottom: '1.25rem',
            textShadow: '0 1px 4px rgba(0, 0, 0, 0.3)',
          }}>
            {description}
          </p>

          {/* CTA */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontSize: '0.9375rem',
            fontWeight: 600,
            color: 'var(--color-white)',
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
            transform: scale(1.05);
          }
          .category-card:hover .category-overlay {
            background: linear-gradient(180deg, rgba(10, 22, 40, 0.2) 0%, rgba(10, 22, 40, 0.75) 100%);
          }
          .category-card:hover .category-arrow {
            transform: translateX(4px);
          }
          .category-card:hover {
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
            transform: translateY(-4px);
          }
        `}</style>
      </div>
    </Link>
  );
}
