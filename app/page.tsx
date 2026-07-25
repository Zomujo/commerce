'use client';

import Header from './components/Header';
import Footer from './components/Footer';
import { useRouter } from 'next/navigation';

// Landing Page Modular Sections (Sabi Design System)
import Hero from './components/landing/Hero';
import SectionFeaturedPost from './components/landing/SectionFeaturedPost';
import SectionAbout from './components/landing/SectionAbout';
import SectionFixedImage from './components/landing/SectionFixedImage';
import SectionServicesSlider from './components/landing/SectionServicesSlider';
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
        <Hero
          onExploreClick={() => scrollToSection('services')}
          onTradeWithUsClick={() => scrollToSection('contact')}
        />
        
        <SectionFeaturedPost />
        
        <SectionAbout />
        
        <SectionFixedImage />
        
        <div id="services">
          <SectionServicesSlider />
        </div>
        
        <SectionVerticalValues />

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
