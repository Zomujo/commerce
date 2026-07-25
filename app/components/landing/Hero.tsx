'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const backgroundImages = [
  '/images/landing/hero_industrial_port.png',
  '/images/landing/hero_logistics_cargo.png',
  '/images/landing/hero_mining_machinery.png',
];

interface HeroProps {
  onExploreClick?: () => void;
  onTradeWithUsClick?: () => void;
}

export default function Hero({ onExploreClick, onTradeWithUsClick }: HeroProps) {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % backgroundImages.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-screen min-h-[700px] bg-[#06231A] overflow-hidden">
      {/* Background Images Layer */}
      {backgroundImages.map((image, index) => {
        const isActive = index === currentSlideIndex;
        return (
          <div
            key={image}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              isActive ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            <div className="absolute inset-0 w-full h-full">
              <Image
                src={image}
                alt={`Hero background ${index + 1}`}
                fill
                priority={index === 0}
                className={`object-cover object-center transition-transform duration-[8000ms] ease-out ${
                  isActive ? 'scale-105' : 'scale-100'
                }`}
              />
            </div>
          </div>
        );
      })}

      {/* Overlays */}
      <div className="absolute inset-0 z-20 bg-black/40" />
      <div className="absolute inset-0 z-20 bg-gradient-to-t from-[#06231A] via-[#06231A]/20 to-transparent opacity-90" />
      <div className="absolute inset-0 z-20 bg-gradient-to-r from-[#06231A]/90 via-[#06231A]/50 to-transparent" />

      {/* Static Content */}
      <div className="absolute inset-0 z-30 flex flex-col justify-center pt-24 pb-24 px-6 sm:px-12 lg:px-24 overflow-y-auto scrollbar-hide">
        <div className="max-w-5xl">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight text-white leading-[1.15] mb-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <p className="m-0">
              The infrastructure powering trade across <span className="text-[#D4C9A8] font-semibold">Africa and the world</span>.
            </p>
          </h1>
          
          <div className="space-y-6 max-w-3xl mb-12">
            <h3 className="text-base sm:text-lg lg:text-xl text-white/90 font-light leading-relaxed animate-fade-in" style={{ animationDelay: '0.4s' }}>
              WG Trade connects businesses to the materials, markets and commercial capabilities required to produce, build and grow.
            </h3>
            
            <p className="text-sm sm:text-base text-white/70 font-light leading-relaxed animate-fade-in" style={{ animationDelay: '0.5s' }}>
              From critical minerals and industrial chemicals to polymers, metals, machinery and essential production inputs, we create stronger trade connections within Africa and between Africa and global markets.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6 animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <button
              onClick={onExploreClick}
              className="px-8 py-4 bg-[#D4C9A8] text-[#06231A] text-sm font-bold tracking-widest uppercase hover:bg-white transition-colors duration-300"
            >
              Explore WG Trade
            </button>
            
            <button
              onClick={onTradeWithUsClick}
              className="px-8 py-4 border border-white/30 text-white text-sm font-bold tracking-widest uppercase hover:border-white hover:bg-white hover:text-[#06231A] transition-all duration-300 backdrop-blur-sm"
            >
              Trade With Us
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Indicators */}
      <div className="absolute bottom-12 left-6 sm:left-12 lg:left-24 z-30 flex gap-4">
        {backgroundImages.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlideIndex(idx)}
            className="group relative h-1 flex items-center justify-start w-16 overflow-hidden bg-white/20 cursor-pointer"
            aria-label={`Go to slide ${idx + 1}`}
          >
            <div 
              className={`absolute top-0 left-0 h-full transition-all duration-[8000ms] ease-linear ${
                idx === currentSlideIndex ? 'w-full bg-[#D4C9A8]' : 'w-0 bg-white group-hover:w-full group-hover:opacity-50 group-hover:duration-300'
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
