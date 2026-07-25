'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from '../components/Header';
import PageSpinner from '../components/PageSpinner';
import CategoryCard from '../components/CategoryCard';
import { ApiClient } from '@/lib/api-client';
import { Product, StrategicVertical } from '@/types/api';

function normalize(value?: string) {
  return (value || '').trim().toLowerCase();
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<StrategicVertical[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const [verticals, productsPage] = await Promise.all([
          ApiClient.getVerticals(),
          ApiClient.getProducts({ limit: 100 }).catch(() => null),
        ]);

        const products = productsPage?.content || [];
        const productsByVerticalName = new Map<string, number>();

        products.forEach((product: Product) => {
          const key = normalize(product.vertical?.name || product.verticalName);
          if (!key) return;
          productsByVerticalName.set(key, (productsByVerticalName.get(key) || 0) + 1);
        });

        const verticalsWithCounts = verticals.map((vertical) => {
          const existingCount = vertical.productCount;
          if (typeof existingCount === 'number' && existingCount > 0) {
            return vertical;
          }

          const derivedCount = productsByVerticalName.get(normalize(vertical.name)) || 0;
          return {
            ...vertical,
            productCount: derivedCount,
          };
        });

        setCategories(verticalsWithCounts);
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCategories();
  }, []);

  if (isLoading) {
    return (
      <div
        style={{
          minHeight: '100vh',
          display: 'grid',
          gridTemplateRows: 'auto 1fr',
        }}
      >
        <Header />
        <main
          style={{
            minHeight: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'white',
          }}
        >
          <PageSpinner />
        </main>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />

      <main style={{ flex: 1, background: 'white' }}>
        {/* Page Header */}
        <section style={{
          background: 'white',
          borderBottom: '1px solid #E2DDD3',
          paddingTop: '8rem',
          paddingBottom: '4rem',
        }}>
          <div className="max-w-[1400px] mx-auto px-6 sm:px-12 lg:px-24">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium text-[#06231A] tracking-tight mb-4">
              Browse Categories
            </h1>
            <p className="text-lg text-[#0F4534] font-light max-w-2xl">
              Explore our comprehensive range of verified industrial chemicals, raw materials, and heavy equipment organized by application.
            </p>
          </div>
        </section>

        {/* Categories Grid */}
        <section className="py-12 sm:py-16 border-b border-[#E2DDD3]">
          <div className="max-w-[1400px] mx-auto px-6 sm:px-12 lg:px-24">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
              {categories.map((category) => (
                <CategoryCard
                  key={category.id}
                  category={category}
                />
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 sm:py-24 bg-white">
          <div className="max-w-[1400px] mx-auto px-6 sm:px-12 lg:px-24">
            <div className="bg-[#06231A] border border-[#06231A] p-10 sm:p-16 flex flex-col items-center text-center">
              <h2 className="text-3xl sm:text-4xl font-medium text-white mb-4 tracking-tight">
                Can&apos;t Find What You&apos;re Looking For?
              </h2>
              <p className="text-[#E6FFE6] font-light max-w-2xl mb-8 text-lg">
                Our global sourcing team can help you acquire any industrial chemical or heavy machinery. Get in touch and we&apos;ll find the right solution.
              </p>
              <Link 
                href="/contact" 
                className="group flex items-center gap-2 px-8 py-4 bg-transparent border border-white text-white font-medium uppercase tracking-widest text-sm hover:bg-white hover:text-[#06231A] transition-colors"
              >
                Contact Our Team
                <svg 
                  width="18" 
                  height="18" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                  className="transition-transform duration-300 group-hover:translate-x-1"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
