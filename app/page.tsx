'use client';

import { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import CategoryCard from './components/CategoryCard';
import ProductCard from './components/ProductCard';
import PageSpinner from './components/PageSpinner';
import StatsSection from './components/StatsSection';
import QuoteRequestModal from './components/QuoteRequestModal';
import Link from 'next/link';
import Image from 'next/image';
import { ApiClient } from '@/lib/api-client';
import { Product, StrategicVertical, PlatformStats } from '@/types/api';

// Landing Page Modular Sections (Sabi Design System)
import Hero from './components/landing/Hero';
import SectionFeaturedPost from './components/landing/SectionFeaturedPost';
import SectionAbout from './components/landing/SectionAbout';
import SectionFixedImage from './components/landing/SectionFixedImage';
import SectionServicesSlider from './components/landing/SectionServicesSlider';
import SectionVerticalValues from './components/landing/SectionVerticalValues';
import SectionContactTiles from './components/landing/SectionContactTiles';

// Trusted partners/brands
const trustedBrands = [
  { name: 'BASF', logo: '/logo_basf_1769368980780.png' },
  { name: 'Dow Chemical', logo: '/logo_dow_1769368995716.png' },
  { name: 'LyondellBasell', logo: '/logo_lyondellbasell_1769369007816.png' },
  { name: 'DuPont', logo: '/logo_dupont_1769369022483.png' },
  { name: 'SABIC', logo: '/logo_sabic_1769369039208.png' },
  { name: 'Covestro', logo: '/logo_covestro_1769369053388.png' },
];

export default function Home() {
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<{ id: string; name: string } | undefined>();
  const [catalogProducts, setCatalogProducts] = useState<Product[]>([]);
  const [hotDealProducts, setHotDealProducts] = useState<Product[]>([]);
  const [verticals, setVerticals] = useState<StrategicVertical[]>([]);
  const [stats, setStats] = useState<PlatformStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const hasUsableImage = (image?: string) => {
    if (!image) return false;
    return image.startsWith('http://') || image.startsWith('https://') || image.startsWith('/');
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [popularProducts, recentProducts, allProductsPage, fetchedVerticals, fetchedStats] = await Promise.all([
          ApiClient.getPopularProducts(4),
          ApiClient.getRecentProducts().catch(() => []),
          ApiClient.getProducts({ limit: 100 }).catch(() => null),
          ApiClient.getVerticals().catch(() => []),
          ApiClient.getStats().catch(() => null)
        ]);

        const pool = [
          ...popularProducts,
          ...recentProducts,
          ...(allProductsPage?.content || []),
        ];

        const uniqueById = new Map<string, Product>();
        pool.forEach((p) => {
          if (!uniqueById.has(p.id)) uniqueById.set(p.id, p);
        });

        const imageReadyProducts = Array.from(uniqueById.values()).filter((p) => hasUsableImage(p.image));

        const shuffledDeals = [...imageReadyProducts];
        for (let i = shuffledDeals.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [shuffledDeals[i], shuffledDeals[j]] = [shuffledDeals[j], shuffledDeals[i]];
        }

        setCatalogProducts(imageReadyProducts);
        setHotDealProducts(shuffledDeals.slice(0, Math.min(3, shuffledDeals.length)));
        setVerticals(fetchedVerticals);
        setStats(fetchedStats);
      } catch (error) {
        console.error('Failed to fetch home data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleRequestQuote = (productId?: string, productName?: string) => {
    if (productId && productName) {
      setSelectedProduct({ id: productId, name: productName });
    } else {
      setSelectedProduct(undefined);
    }
    setIsQuoteModalOpen(true);
  };

  const platformStats = stats ? [
    { label: 'Products Available', value: stats.productCount },
    { label: 'Verified Suppliers', value: stats.verifiedSuppliers },
    { label: 'Countries Served', value: stats.countriesServed },
    { label: 'Support Availability', value: stats.supportAvailability },
  ] : [
    { label: 'Products Available', value: '100+' },
    { label: 'Verified Suppliers', value: '20+' },
    { label: 'Countries Served', value: '60+' },
    { label: 'Support Availability', value: '24/7' },
  ];

  const previewProducts = catalogProducts.slice(0, 4);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />

      <main style={{ flex: 1 }}>
        {/* SECTION 01 — HERO */}
        <Hero
          onExploreClick={() => scrollToSection('services')}
          onTradeWithUsClick={() => setIsQuoteModalOpen(true)}
        />

        <SectionFeaturedPost />
        <SectionAbout />
        <SectionFixedImage />
        <div id="services">
          <SectionServicesSlider />
        </div>
        <SectionVerticalValues />

        {/* STRATEGIC VERTICALS & CATALOG SECTION */}
        <section id="catalog" className="py-24 bg-white text-[#111815] border-b border-[#E2DDD3]">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#0F4534] bg-[#0F4534]/10 px-3.5 py-1.5 rounded-full inline-block mb-4">
                INDUSTRIAL INPUTS & COMMODITIES
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#06231A]">
                Strategic Verticals & Active Catalog
              </h2>
            </div>

            {/* Strategic Verticals Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
              {verticals.length > 0 ? verticals.map((vertical) => (
                <CategoryCard key={vertical.id} category={vertical} />
              )) : (
                <p className="col-span-full text-center text-gray-500 py-8">Loading strategic verticals...</p>
              )}
            </div>

            {/* Featured Catalog Preview */}
            <div className="flex items-center justify-between mb-8 flex-wrap gap-4 pt-8 border-t border-gray-100">
              <div>
                <h3 className="text-2xl font-bold text-[#06231A]">Industrial Catalog Preview</h3>
                <p className="text-sm text-gray-600 font-light">Direct sourcing across verified producers and distributors.</p>
              </div>
              <Link
                href="/products"
                className="px-6 py-3 rounded-lg bg-[#0F4534] text-white font-semibold text-sm hover:bg-[#06231A] transition-colors flex items-center space-x-2"
              >
                <span>Access Full Catalog</span>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {isLoading ? (
                <div className="col-span-full flex justify-center py-8">
                  <PageSpinner />
                </div>
              ) : previewProducts.length > 0 ? previewProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onRequestQuote={() => handleRequestQuote(product.id, product.name)}
                />
              )) : (
                <p className="col-span-full text-center text-gray-500 py-8">No products listed currently.</p>
              )}
            </div>
          </div>
        </section>

        {/* TRUSTED PARTNERS MARQUEE */}
        <section className="py-20 bg-[#F8F7F3] border-b border-[#E2DDD3] overflow-hidden relative">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 text-center mb-12">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-gray-500 mb-2 block">
              OFFICIAL ALLIANCES
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-[#06231A]">
              Trusted by Global Industrial Leaders
            </h3>
          </div>

          <div className="partner-marquee-viewport relative w-full overflow-hidden">
            <div className="partner-marquee-row partner-marquee-row-top">
              {[...trustedBrands, ...trustedBrands].map((brand, index) => (
                <div key={`partner-top-${brand.name}-${index}`} className="partner-float-logo-wrap bg-white border border-[#E2DDD3] p-4 rounded-2xl shadow-xs">
                  <Image src={brand.logo} alt={brand.name} width={220} height={80} draggable={false} className="partner-logo" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* STATS SECTION */}
        <StatsSection stats={platformStats} />

        {/* CONTACT TILES */}
        <SectionContactTiles
          onSourceClick={() => scrollToSection('catalog')}
          onPartnerClick={() => setIsQuoteModalOpen(true)}
        />
      </main>

      <Footer />

      <QuoteRequestModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
        productId={selectedProduct?.id}
        productName={selectedProduct?.name}
      />

      <style jsx global>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .partner-marquee-viewport {
          -webkit-mask-image: linear-gradient(90deg, transparent 0%, black 8%, black 92%, transparent 100%);
          mask-image: linear-gradient(90deg, transparent 0%, black 8%, black 92%, transparent 100%);
        }

        .partner-marquee-row {
          display: flex;
          gap: 1.5rem;
          width: max-content;
          will-change: transform;
          padding: 0.5rem 0;
        }

        .partner-marquee-row-top {
          animation: scroll 30s linear infinite;
        }

        .partner-float-logo-wrap {
          flex: 0 0 auto;
          height: 5.5rem;
          width: 14rem;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 1rem;
          transition: transform 0.35s ease;
        }

        .partner-[#06231A]:hover {
          transform: translateY(-4px);
        }

        .partner-marquee-viewport:hover .partner-marquee-row {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}
