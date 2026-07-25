'use client';

import { useState, useMemo, useEffect } from 'react';
import Header from '../components/Header';
import PageSpinner from '../components/PageSpinner';
import ProductCard from '../components/ProductCard';
import QuoteRequestModal from '../components/QuoteRequestModal';
import { ApiClient } from '@/lib/api-client';
import { Product, StrategicVertical } from '@/types/api';

function normalize(value?: string) {
  return (value || '').trim().toLowerCase();
}

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<{ id: string; name: string } | undefined>();
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
    const verticalIdByName = new Map<string, string>();
    verticals.forEach((vertical) => {
      verticalIdByName.set(normalize(vertical.name), vertical.id);
    });

    const getProductVerticalId = (product: Product) => {
      if (product.vertical?.id) return product.vertical.id;
      const productVerticalName = normalize(product.vertical?.name || product.verticalName);
      return verticalIdByName.get(productVerticalName);
    };

    return products.filter((product) => {
      const matchesCategory = selectedCategory === 'all' || getProductVerticalId(product) === selectedCategory;
      const matchesSearch = !searchQuery || 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (product.description || '').toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery, products, verticals]);

  const handleRequestQuote = (productId: string, productName: string) => {
    setSelectedProduct({ id: productId, name: productName });
    setIsQuoteModalOpen(true);
  };

  if (isLoading) {
    return (
      <div
        style={{
          minHeight: '100vh',
          display: 'grid',
          gridTemplateRows: 'auto 1fr auto',
        }}
      >
        <Header />
        <main
          style={{
            minHeight: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#F8F7F3',
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
          paddingTop: '8rem', // accounts for floating header
          paddingBottom: '4rem',
        }}>
          <div className="max-w-[1400px] mx-auto px-6 sm:px-12 lg:px-24">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium text-[#06231A] tracking-tight mb-4">
              Industrial Catalog
            </h1>
            <p className="text-lg text-[#0F4534] font-light max-w-2xl">
              Browse our complete catalog of verified industrial chemicals, raw materials, and heavy equipment ready for global procurement.
            </p>
          </div>
        </section>

        {/* Filters & Products */}
        <section className="py-12 sm:py-16">
          <div className="max-w-[1400px] mx-auto px-6 sm:px-12 lg:px-24">
            <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-12">
              
              {/* Sidebar Filters */}
              <aside className="bg-white border border-[#E2DDD3] p-8 h-fit">
                {/* Search */}
                <div className="mb-8">
                  <label className="block text-sm font-mono font-bold text-[#D4C9A8] uppercase tracking-widest mb-4">
                    Search
                  </label>
                  <div className="relative">
                    <svg 
                      width="18" 
                      height="18" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="#0F4534" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                      className="absolute left-4 top-1/2 -translate-y-1/2"
                    >
                      <circle cx="11" cy="11" r="8" />
                      <path d="m21 21-4.3-4.3" />
                    </svg>
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search products..."
                      className="w-full bg-white border border-[#E2DDD3] text-[#06231A] text-sm py-3 pl-12 pr-4 focus:outline-none focus:border-[#0F4534] transition-colors"
                    />
                  </div>
                </div>

                {/* Category Filter */}
                <div>
                  <label className="block text-sm font-mono font-bold text-[#D4C9A8] uppercase tracking-widest mb-4">
                    Categories
                  </label>
                  <div className="flex flex-col gap-2">
                    <button
                      onClick={() => setSelectedCategory('all')}
                      className={`w-full flex justify-between items-center px-4 py-3 text-sm text-left transition-all ${
                        selectedCategory === 'all' 
                          ? 'bg-[#06231A] text-white font-medium' 
                          : 'bg-transparent text-[#0F4534] hover:bg-[#F8F7F3]'
                      }`}
                    >
                      All Categories
                      <span className={`text-xs ${selectedCategory === 'all' ? 'text-[#D4C9A8]' : 'text-gray-400'}`}>
                        {products.length}
                      </span>
                    </button>
                    {verticals.map((vertical) => {
                      const count = products.filter((p) => {
                        if (p.vertical?.id) return p.vertical.id === vertical.id;
                        const productVerticalName = normalize(p.vertical?.name || p.verticalName);
                        return productVerticalName === normalize(vertical.name);
                      }).length;
                      
                      const isActive = selectedCategory === vertical.id;
                      
                      return (
                        <button
                          key={vertical.id}
                          onClick={() => setSelectedCategory(vertical.id)}
                          className={`w-full flex justify-between items-center px-4 py-3 text-sm text-left transition-all ${
                            isActive 
                              ? 'bg-[#06231A] text-white font-medium' 
                              : 'bg-transparent text-[#0F4534] hover:bg-[#F8F7F3]'
                          }`}
                        >
                          {vertical.name}
                          <span className={`text-xs ${isActive ? 'text-[#D4C9A8]' : 'text-gray-400'}`}>
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
                <div className="flex justify-between items-center mb-8 border-b border-[#E2DDD3] pb-4">
                  <p className="text-sm font-mono tracking-widest text-[#0F4534]">
                    SHOWING <strong className="text-[#06231A] font-bold mx-1">{filteredProducts.length}</strong> RESULTS
                  </p>
                </div>

                {/* Grid */}
                {filteredProducts.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8">
                    {filteredProducts.map((product) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        onRequestQuote={() => handleRequestQuote(product.id, product.name)}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-24 bg-white border border-[#E2DDD3]">
                    <svg 
                      width="48" 
                      height="48" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="#E2DDD3" 
                      strokeWidth="1.5" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                      className="mx-auto mb-6"
                    >
                      <circle cx="11" cy="11" r="8" />
                      <path d="m21 21-4.3-4.3" />
                    </svg>
                    <h3 className="text-xl font-medium text-[#06231A] mb-2">
                      No products found
                    </h3>
                    <p className="text-[#0F4534] font-light">
                      Try adjusting your search or filter criteria
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      <QuoteRequestModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
        productId={selectedProduct?.id}
        productName={selectedProduct?.name}
      />
    </div>
  );
}
