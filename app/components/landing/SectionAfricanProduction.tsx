'use client';

import { useState, useEffect } from 'react';

export default function SectionAfricanProduction() {
  const [activeIndex, setActiveIndex] = useState(0);

  const paragraphs = [
    {
      text: "Africa should not participate in global trade only as a destination for finished goods.",
      highlight: true
    },
    {
      text: "The continent has the resources, producers, manufacturers and growing industrial capacity to supply both regional and international markets.",
      highlight: false
    },
    {
      text: "WG Trade helps African businesses move beyond fragmented local networks, access credible demand and build stronger routes to market.",
      highlight: false
    },
    {
      text: "We also connect businesses across the continent to the international materials, equipment and partnerships required to expand production and compete globally.",
      highlight: false
    }
  ];

  // Auto-advance mobile slideshow
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % paragraphs.length);
    }, 4500); // 4.5 seconds per slide
    return () => clearInterval(interval);
  }, [paragraphs.length]);

  return (
    <section className="relative py-24 sm:py-32 bg-[#F8F7F3] border-t border-[#E2DDD3]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16 lg:gap-24">
          
          {/* Header */}
          <div className="lg:sticky lg:top-32 self-start">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-[#06231A] leading-[1.15]">
              From African production to global markets.
            </h2>
          </div>
          
          {/* Desktop Right: Standard Paragraph Stack */}
          <div className="hidden lg:flex flex-col gap-8">
            {paragraphs.map((p, idx) => (
              <div key={idx}>
                <p className={`text-lg font-light leading-relaxed ${p.highlight ? 'text-[#0F4534] font-medium' : 'text-gray-600'}`}>
                  {p.text}
                </p>
              </div>
            ))}
          </div>

          {/* Mobile Right: Sleek Slideshow Card */}
          <div className="flex lg:hidden flex-col bg-white p-8 sm:p-10 rounded-2xl shadow-sm border border-[#E2DDD3] min-h-[320px] sm:min-h-[280px]">
            <div className="relative flex-grow">
              {paragraphs.map((p, idx) => (
                <div 
                  key={idx}
                  className={`absolute inset-0 transition-opacity duration-700 ease-in-out flex flex-col justify-center ${
                    activeIndex === idx ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
                  }`}
                >
                  <p className={`text-xl sm:text-2xl font-light leading-relaxed ${p.highlight ? 'text-[#0F4534] font-medium' : 'text-[#06231A]'}`}>
                    "{p.text}"
                  </p>
                </div>
              ))}
            </div>
            
            {/* Interactive Progress Indicators */}
            <div className="flex gap-2 mt-8 pt-6 border-t border-[#E2DDD3]">
              {paragraphs.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveIndex(idx)}
                  className={`h-1.5 rounded-full transition-all duration-500 ease-out ${
                    activeIndex === idx ? 'w-10 bg-[#0F4534]' : 'w-2 bg-gray-200 hover:bg-gray-300'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
