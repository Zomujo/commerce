'use client';

import { useState, useMemo, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import QuoteRequestModal from '../components/QuoteRequestModal';
import { ApiClient } from '@/lib/api-client';
import { Product, StrategicVertical } from '@/types/api';

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<string | undefined>();
  const [products, setProducts] = useState<Product[]>([]);
  const [verticals, setVerticals] = useState<StrategicVertical[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsData, verticalsData] = await Promise.all([
          ApiClient.getProducts({ limit: 100 }),
          ApiClient.getVerticals().catch(() => []),
        ]);
        setProducts(productsData.content);
        setVerticals(verticalsData);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory = selectedCategory === 'all' || product.vertical?.id === selectedCategory;
      const matchesSearch = !searchQuery || 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (product.description || '').toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery, products]);

  const handleRequestQuote = (productName?: string) => {
    setSelectedProduct(productName);
    setIsQuoteModalOpen(true);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />

      <main style={{ flex: 1, background: 'var(--color-gray-50)' }}>
        {/* Page Header */}
        <section style={{
          background: 'var(--color-white)',
          borderBottom: '1px solid var(--color-gray-200)',
          padding: '3rem 0',
        }}>
          <div className="container">
            <h1 style={{
              fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
              fontWeight: 700,
              color: 'var(--color-navy)',
              marginBottom: '0.5rem',
            }}>
              Industrial Chemicals & Raw Materials
            </h1>
            <p style={{
              fontSize: '1rem',
              color: 'var(--color-gray-500)',
            }}>
              Browse our complete catalog of industrial chemicals and raw materials
            </p>
          </div>
        </section>

        {/* Filters & Products */}
        <section className="section">
          <div className="container">
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr',
              gap: '2rem',
            }} className="products-layout">
              {/* Sidebar Filters */}
              <aside style={{
                background: 'var(--color-white)',
                borderRadius: '1rem',
                padding: '1.5rem',
                border: '1px solid var(--color-gray-200)',
                height: 'fit-content',
              }} className="filters-sidebar">
                {/* Search */}
                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{
                    display: 'block',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    color: 'var(--color-navy)',
                    marginBottom: '0.5rem',
                  }}>
                    Search
                  </label>
                  <div style={{ position: 'relative' }}>
                    <svg 
                      width="18" 
                      height="18" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="var(--color-gray-400)" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                      style={{
                        position: 'absolute',
                        left: '0.75rem',
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
                      placeholder="Search products..."
                      className="input"
                      style={{ paddingLeft: '2.5rem' }}
                    />
                  </div>
                </div>

                {/* Category Filter */}
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    color: 'var(--color-navy)',
                    marginBottom: '0.75rem',
                  }}>
                    Category
                  </label>
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.5rem',
                  }}>
                    <button
                      onClick={() => setSelectedCategory('all')}
                      style={{
                        padding: '0.625rem 0.875rem',
                        borderRadius: '0.5rem',
                        border: 'none',
                        background: selectedCategory === 'all' ? 'rgba(0, 102, 204, 0.1)' : 'transparent',
                        color: selectedCategory === 'all' ? 'var(--color-blue)' : 'var(--color-gray-600)',
                        fontSize: '0.875rem',
                        fontWeight: selectedCategory === 'all' ? 600 : 400,
                        textAlign: 'left',
                        cursor: 'pointer',
                        transition: 'all var(--transition-fast)',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      All Categories
                      <span style={{
                        fontSize: '0.75rem',
                        color: 'var(--color-gray-400)',
                      }}>
                        {products.length}
                      </span>
                    </button>
                    {verticals.map((vertical) => {
                      const count = products.filter(p => p.vertical?.id === vertical.id).length;
                      return (
                        <button
                          key={vertical.id}
                          onClick={() => setSelectedCategory(vertical.id)}
                          style={{
                            padding: '0.625rem 0.875rem',
                            borderRadius: '0.5rem',
                            border: 'none',
                            background: selectedCategory === vertical.id ? 'rgba(0, 102, 204, 0.1)' : 'transparent',
                            color: selectedCategory === vertical.id ? 'var(--color-blue)' : 'var(--color-gray-600)',
                            fontSize: '0.875rem',
                            fontWeight: selectedCategory === vertical.id ? 600 : 400,
                            textAlign: 'left',
                            cursor: 'pointer',
                            transition: 'all var(--transition-fast)',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                          }}
                        >
                          {vertical.name}
                          <span style={{
                            fontSize: '0.75rem',
                            color: 'var(--color-gray-400)',
                          }}>
                            {count}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </aside>

              {/* Products Grid */}
              <div>
                {/* Results Count */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '1.5rem',
                }}>
                  <p style={{
                    fontSize: '0.9375rem',
                    color: 'var(--color-gray-500)',
                  }}>
                    Showing <strong style={{ color: 'var(--color-navy)' }}>{filteredProducts.length}</strong> products
                  </p>
                </div>

                {/* Grid */}
                {filteredProducts.length > 0 ? (
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                    gap: '1.5rem',
                  }}>
                    {filteredProducts.map((product) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        onRequestQuote={() => handleRequestQuote(product.name)}
                      />
                    ))}
                  </div>
                ) : (
                  <div style={{
                    textAlign: 'center',
                    padding: '4rem 2rem',
                    background: 'var(--color-white)',
                    borderRadius: '1rem',
                    border: '1px solid var(--color-gray-200)',
                  }}>
                    <svg 
                      width="48" 
                      height="48" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="var(--color-gray-300)" 
                      strokeWidth="1.5" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                      style={{ margin: '0 auto 1rem' }}
                    >
                      <circle cx="11" cy="11" r="8" />
                      <path d="m21 21-4.3-4.3" />
                    </svg>
                    <h3 style={{
                      fontSize: '1.125rem',
                      fontWeight: 600,
                      color: 'var(--color-navy)',
                      marginBottom: '0.5rem',
                    }}>
                      No products found
                    </h3>
                    <p style={{
                      fontSize: '0.9375rem',
                      color: 'var(--color-gray-500)',
                    }}>
                      Try adjusting your search or filter criteria
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        <style jsx global>{`
          @media (min-width: 1024px) {
            .products-layout {
              grid-template-columns: 280px 1fr !important;
            }
          }
        `}</style>
      </main>

      <Footer />

      <QuoteRequestModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
        productName={selectedProduct}
      />
    </div>
  );
}
