'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CategoryCard from '../components/CategoryCard';
import { ApiClient } from '@/lib/api-client';
import { StrategicVertical } from '@/types/api';

export default function CategoriesPage() {
  const [categories, setCategories] = useState<StrategicVertical[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await ApiClient.getVerticals();
        setCategories(data);
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCategories();
  }, []);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />

      <main style={{ flex: 1 }}>
        {/* Page Header */}
        <section style={{
          background: 'linear-gradient(180deg, var(--color-gray-50) 0%, var(--color-white) 100%)',
          padding: '4rem 0',
          textAlign: 'center',
        }}>
          <div className="container">
            <span className="badge badge-blue" style={{ marginBottom: '0.75rem' }}>
              Equipment Categories
            </span>
            <h1 style={{
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 700,
              color: 'var(--color-navy)',
              marginBottom: '1rem',
            }}>
              Browse by Category
            </h1>
            <p style={{
              fontSize: '1.125rem',
              color: 'var(--color-gray-500)',
              maxWidth: '32rem',
              margin: '0 auto',
            }}>
              Explore our comprehensive range of chemicals and raw materials organized by application.
            </p>
          </div>
        </section>

        {/* Categories Grid */}
        <section className="section">
          <div className="container">
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
              gap: '1.5rem',
            }}>
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
        <section style={{
          background: 'var(--color-gray-50)',
          padding: '4rem 0',
        }}>
          <div className="container">
            <div style={{
              background: 'var(--color-white)',
              borderRadius: '1.5rem',
              padding: '3rem',
              textAlign: 'center',
              border: '1px solid var(--color-gray-200)',
            }}>
              <h2 style={{
                fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                fontWeight: 700,
                color: 'var(--color-navy)',
                marginBottom: '0.75rem',
              }}>
                Can&apos;t Find What You&apos;re Looking For?
              </h2>
              <p style={{
                fontSize: '1rem',
                color: 'var(--color-gray-500)',
                marginBottom: '1.5rem',
                maxWidth: '28rem',
                margin: '0 auto 1.5rem',
              }}>
                Our team can help you source any industrial chemical or raw material. Get in touch and we&apos;ll find the right solution.
              </p>
              <Link href="/contact" className="btn btn-primary" style={{ padding: '0.875rem 2rem' }}>
                Contact Our Team
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
