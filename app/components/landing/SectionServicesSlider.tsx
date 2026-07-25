'use client';

import { useRef } from 'react';
import Image from 'next/image';

const services = [
  {
    id: '01',
    title: 'Industrial Sourcing',
    description: 'Access manufacturers, producers and distributors of essential materials, equipment and commodities across African and international markets.',
    bgImage: '/images/landing/hero_logistics_cargo.png',
    overlayColor: 'bg-[#06231A]', // Deep Green
    textColor: 'text-white',
    btnBg: 'bg-white',
    btnIcon: 'text-[#06231A]'
  },
  {
    id: '02',
    title: 'Market Access',
    description: 'Reach credible buyers, enter new countries and establish stronger commercial and distribution relationships within Africa and globally.',
    bgImage: '/images/landing/african_manufacturing.png',
    overlayColor: 'bg-[#155B45]', // Mid Green
    textColor: 'text-white',
    btnBg: 'bg-white',
    btnIcon: 'text-[#155B45]'
  },
  {
    id: '03',
    title: 'Trade Execution',
    description: 'Move from opportunity to completed transaction with support across negotiation, documentation, payments, logistics and delivery.',
    bgImage: '/images/landing/hero_industrial_port.png',
    overlayColor: 'bg-[#0F4534]', // Main Green
    textColor: 'text-white',
    btnBg: 'bg-white',
    btnIcon: 'text-[#0F4534]'
  },
  {
    id: '04',
    title: 'Trade Finance',
    description: 'Connect eligible transactions to financing and structured payment solutions designed to keep commerce moving.',
    bgImage: '/images/landing/hero_mining_machinery.png',
    overlayColor: 'bg-[#FDF7EA]', // Subtle Gold/Sand
    textColor: 'text-[#06231A]',
    btnBg: 'bg-[#06231A]',
    btnIcon: 'text-white'
  },
  {
    id: '05',
    title: 'Market Intelligence',
    description: 'Understand pricing, supply conditions, product availability and emerging opportunities across key industrial markets.',
    bgImage: '/images/landing/african_manufacturing.png',
    overlayColor: 'bg-[#D4C9A8]', // Gold
    textColor: 'text-[#06231A]',
    btnBg: 'bg-[#06231A]',
    btnIcon: 'text-[#D4C9A8]'
  },
  {
    id: '06',
    title: 'Responsible Trade',
    description: 'Build more transparent, traceable and sustainable supply relationships from source to destination.',
    bgImage: '/images/landing/hero_industrial_port.png',
    overlayColor: 'bg-[#111815]', // Charcoal
    textColor: 'text-white',
    btnBg: 'bg-white',
    btnIcon: 'text-[#111815]'
  }
];

export default function SectionServicesSlider() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -400, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 400, behavior: 'smooth' });
    }
  };

  return (
    <section className="w-full bg-white overflow-hidden">
      {/* Headline */}
      <div className="max-w-[1400px] mx-auto px-6 sm:px-12 lg:px-24 py-24 sm:py-32 border-b border-[#E2DDD3]">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight text-[#06231A] leading-[1.1] max-w-4xl animate-fade-in">
          Built around the needs of industry.
        </h2>
      </div>

      {/* Slider Container */}
      <div className="relative w-full group">
        
        {/* Custom Navigation Arrows (visible on hover) */}
        <div className="absolute top-1/2 -translate-y-1/2 left-4 right-4 z-20 flex justify-between pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button 
            onClick={scrollLeft}
            className="w-12 h-12 bg-white/90 shadow-lg flex items-center justify-center pointer-events-auto hover:scale-110 transition-transform text-[#06231A]"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button 
            onClick={scrollRight}
            className="w-12 h-12 bg-white/90 shadow-lg flex items-center justify-center pointer-events-auto hover:scale-110 transition-transform text-[#06231A]"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Scrollable Track */}
        <div 
          ref={scrollRef}
          className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {services.map((service) => (
            <div 
              key={service.id} 
              className={`relative flex-shrink-0 w-full md:w-[60vw] lg:w-[45vw] h-[600px] snap-center group/card overflow-hidden ${service.textColor}`}
            >
              {/* Background & Overlay */}
              <div className="absolute inset-0">
                <Image
                  src={service.bgImage}
                  alt={service.title}
                  fill
                  className="object-cover transition-transform duration-[10000ms] group-hover/card:scale-110"
                />
                <div className={`absolute inset-0 ${service.overlayColor} opacity-90 transition-opacity duration-500 group-hover/card:opacity-95`} />
              </div>

              {/* Content Default State */}
              <div className="absolute inset-0 p-12 flex flex-col justify-between z-10 transition-transform duration-500 group-hover/card:-translate-y-8">
                <div className="text-xl font-mono font-bold">{service.id}</div>
                <h3 className="text-3xl lg:text-4xl font-medium tracking-tight mb-8">
                  {service.title}
                </h3>
              </div>

              {/* Content Hover State */}
              <div className="absolute inset-x-0 bottom-0 p-12 translate-y-full opacity-0 group-hover/card:translate-y-0 group-hover/card:opacity-100 transition-all duration-500 z-20 flex flex-col gap-6">
                <p className="text-base lg:text-lg font-light leading-relaxed">
                  {service.description}
                </p>
                <button className={`w-12 h-12 flex items-center justify-center ${service.btnBg} ${service.btnIcon} transition-transform hover:scale-105`}>
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
