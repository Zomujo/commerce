'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface HeroSlide {
  id: string;
  image: string;
  titlePrefix: string;
  italicText: string;
  titleSuffix?: string;
  description: string;
  ctaText?: string;
  ctaLink?: string;
}

const slides: HeroSlide[] = [
  {
    id: 'slide-1',
    image: '/images/landing/hero_industrial_port.png',
    titlePrefix: 'The infrastructure powering trade across ',
    italicText: 'Africa and the world',
    titleSuffix: '.',
    description: 'WG Trade connects businesses to the materials, markets and commercial capabilities required to produce, build and grow.',
    ctaText: 'Explore WG Trade',
    ctaLink: '#catalog'
  },
  {
    id: 'slide-2',
    image: '/images/landing/hero_logistics_cargo.png',
    titlePrefix: 'Sourcing critical minerals, chemicals & ',
    italicText: 'industrial materials',
    titleSuffix: '.',
    description: 'From industrial chemicals and polymers to metals, machinery and essential production inputs, we keep industry moving.',
    ctaText: 'View Materials',
    ctaLink: '#catalog'
  },
  {
    id: 'slide-3',
    image: '/images/landing/hero_mining_machinery.png',
    titlePrefix: 'Creating stronger connections within ',
    italicText: 'Africa & global markets',
    titleSuffix: '.',
    description: 'Connecting producers, manufacturers and buyers across borders with verified trust, execution, and trade financing.',
    ctaText: 'Trade With Us',
    ctaLink: '/contact'
  },
];

interface HeroProps {
  onExploreClick?: () => void;
  onTradeWithUsClick?: () => void;
}

export default function Hero({ onExploreClick, onTradeWithUsClick }: HeroProps) {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % slides.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-screen min-h-[600px] bg-[#06231A] overflow-hidden">
      {slides.map((slide, index) => {
        const isActive = index === currentSlideIndex;
        return (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              isActive ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            {/* Background Image Container */}
            <div className="absolute inset-0 w-full h-full">
              <Image
                src={slide.image}
                alt={slide.titlePrefix}
                fill
                priority={index === 0}
                className={`object-cover object-center transition-transform duration-[8000ms] ease-out ${
                  isActive ? 'scale-105' : 'scale-100'
                }`}
              />
            </div>
            
            {/* Dark Gradient Overlay - Sabi Style */}
            <div className="absolute inset-0 bg-black/40" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#06231A] via-transparent to-transparent opacity-80" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#06231A]/80 via-[#06231A]/30 to-transparent" />

            {/* Content Container */}
            <div className="absolute inset-0 flex flex-col justify-end pb-32 sm:pb-40 px-6 sm:px-12 lg:px-24">
              <div className="max-w-4xl">
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[5rem] font-medium tracking-tight text-white leading-[1.1] mb-6 animate-fade-in" style={{ animationDelay: '0.2s' }}>
                  <p className="m-0">
                    {slide.titlePrefix}
                    <em className="font-serif-italic font-normal text-[#E5A93C] not-italic">{slide.italicText}</em>
                    {slide.titleSuffix}
                  </p>
                </h1>
                
                <h3 className="text-lg sm:text-xl lg:text-2xl text-white/90 font-light max-w-3xl leading-relaxed mb-8 animate-fade-in" style={{ animationDelay: '0.4s' }}>
                  {slide.description}
                </h3>

                {/* Sabi-style Subtle CTA */}
                <div className="inline-block animate-fade-in" style={{ animationDelay: '0.6s' }}>
                  {index === 2 && onTradeWithUsClick ? (
                    <button
                      onClick={onTradeWithUsClick}
                      className="group flex items-center justify-center w-14 h-14 rounded-full border border-white/30 hover:border-[#E5A93C] transition-colors duration-300 backdrop-blur-sm"
                      aria-label="Action"
                    >
                      <svg className="w-5 h-5 text-white group-hover:text-[#E5A93C] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </button>
                  ) : (
                    <Link
                      href={slide.ctaLink || '#'}
                      onClick={(e) => {
                        if (index === 0 && onExploreClick) {
                          e.preventDefault();
                          onExploreClick();
                        }
                      }}
                      className="group flex items-center justify-center w-14 h-14 rounded-full border border-white/30 hover:border-[#E5A93C] transition-colors duration-300 backdrop-blur-sm"
                      aria-label="Action"
                    >
                      <svg className="w-5 h-5 text-white group-hover:text-[#E5A93C] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {/* Sabi-style Bottom Indicators */}
      <div className="absolute bottom-12 left-6 sm:left-12 lg:left-24 z-20 flex gap-4">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlideIndex(idx)}
            className="group relative h-1 flex items-center justify-start w-16 overflow-hidden bg-white/20 cursor-pointer"
            aria-label={`Go to slide ${idx + 1}`}
          >
            <div 
              className={`absolute top-0 left-0 h-full transition-all duration-[8000ms] ease-linear ${
                idx === currentSlideIndex ? 'w-full bg-[#E5A93C]' : 'w-0 bg-white group-hover:w-full group-hover:opacity-50 group-hover:duration-300'
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
