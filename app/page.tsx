'use client';

import Header from './components/Header';
import Footer from './components/Footer';
import { useRouter } from 'next/navigation';

// Landing Page Modular Sections (Sabi Design System)
import Hero from './components/landing/Hero';
import SectionAbout from './components/landing/SectionAbout';
import SectionFeaturedPost from './components/landing/SectionFeaturedPost';
import SectionFixedImage from './components/landing/SectionFixedImage';
import SectionTradeBoundaries from './components/landing/SectionTradeBoundaries';
import SectionServicesSlider from './components/landing/SectionServicesSlider';
import SectionAfricanProduction from './components/landing/SectionAfricanProduction';
import SectionVerticalValues from './components/landing/SectionVerticalValues';
import SectionContactTiles from './components/landing/SectionContactTiles';

export default function Home() {
  const router = useRouter();

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-1">
        {/* SECTION ONE */}
        <Hero
          onExploreClick={() => scrollToSection('services')}
          onTradeWithUsClick={() => scrollToSection('contact')}
        />
        
        {/* SECTION TWO */}
        <SectionAbout />
        
        {/* SECTION THREE */}
        <SectionFeaturedPost />
        
        {/* SECTION FOUR */}
        <SectionFixedImage />
        
        {/* SECTION FIVE */}
        <SectionTradeBoundaries />
        
        {/* SECTION SIX */}
        <div id="services">
          <SectionServicesSlider />
        </div>
        
        {/* SECTION SEVEN */}
        <SectionAfricanProduction />

        {/* STATEMENT SECTION */}
        <SectionVerticalValues />

        {/* CLOSING SECTION */}
        <div id="contact">
          <SectionContactTiles
            onSourceClick={() => router.push('/products')}
            onPartnerClick={() => router.push('/contact')}
          />
        </div>
      </main>

      <Footer />
    </div>
  );
}
