'use client';

import { useEffect, useRef, useState } from 'react';

const tradePoints = [
  {
    id: '01',
    title: 'Factories',
    description: 'Need raw materials to maintain continuous production cycles.',
    image: '/images/landing/factory_production_line.png',
  },
  {
    id: '02',
    title: 'Infrastructure',
    description: 'Requires steady supplies of steel, chemicals, machinery and energy.',
    image: '/images/landing/steel_infrastructure.png',
  },
  {
    id: '03',
    title: 'Mines',
    description: 'Depend heavily on specialized equipment and essential operating inputs.',
    image: '/images/landing/mining_excavation.png',
  },
  {
    id: '04',
    title: 'Manufacturers',
    description: 'Rely on thousands of products moving continuously between businesses, countries and continents.',
    image: '/images/landing/global_freight.png',
  }
];

export default function SectionFixedImage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute('data-index'));
            setActiveIndex(index);
          }
        });
      },
      {
        root: null,
        rootMargin: '-40% 0px -40% 0px',
        threshold: 0.1, // Trigger as soon as the item enters the middle 20% zone
      }
    );

    const items = document.querySelectorAll('.scroll-text-item');
    items.forEach((item) => observer.observe(item));

    return () => {
      items.forEach((item) => observer.unobserve(item));
    };
  }, []);

  return (
    <section className="w-full bg-[#E6FFE6] text-[#06231A] pt-24 pb-32">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-12 lg:px-24">
        
        {/* Header */}
        <div className="mb-16 md:mb-24 max-w-4xl">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight leading-[1.1]">
            The world runs on industrial trade.
          </h2>
        </div>

        {/* Sticky Scroll Container */}
        <div ref={containerRef} className="relative flex flex-row-reverse lg:flex-row items-start gap-6 sm:gap-10 lg:gap-24">
          
          {/* Left (Desktop) / Right (Mobile): Sticky Image Crossfade Area */}
          <div className="sticky top-28 lg:top-32 z-10 flex-shrink-0 w-28 h-28 sm:w-40 sm:h-40 lg:w-1/2 lg:h-[70vh] rounded-2xl overflow-hidden shadow-xl lg:shadow-2xl">
            {tradePoints.map((point, idx) => (
              <div 
                key={point.id}
                className={`absolute inset-0 transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  activeIndex === idx 
                    ? 'opacity-100 scale-100 z-20' 
                    : 'opacity-0 scale-105 z-10'
                }`}
              >
                <img 
                  src={point.image} 
                  alt={point.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#E6FFE6]/90 via-transparent to-transparent" />
              </div>
            ))}
          </div>

          {/* Right (Desktop) / Left (Mobile): Scrolling Text Items */}
          <div className="flex-1 w-full lg:w-1/2 flex flex-col pt-8 lg:pt-0 pb-[30vh]">
            {tradePoints.map((point, idx) => (
              <div 
                key={point.id}
                data-index={idx}
                className={`scroll-text-item flex flex-col justify-center min-h-[40vh] lg:min-h-[70vh] transition-opacity duration-700 ${
                  activeIndex === idx ? 'opacity-100' : 'opacity-20'
                }`}
              >
                <span className="text-base lg:text-lg font-mono font-bold text-[#0F4534] mb-4 lg:mb-6 block tracking-widest">
                  {point.id} — {point.title}
                </span>
                <h3 className="text-2xl sm:text-3xl lg:text-5xl font-medium tracking-tight mb-8 leading-tight max-w-lg">
                  {point.description}
                </h3>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
