'use client';

import { useEffect, useState } from 'react';

const accessPoints = [
  'Access to reliable suppliers.',
  'Access to essential materials.',
  'Access to working capital.',
  'Access to efficient logistics.',
  'Access to regional and global markets.'
];

export default function SectionVerticalValues() {
  const [visibleRows, setVisibleRows] = useState<boolean[]>(new Array(accessPoints.length).fill(false));

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    // We use an IntersectionObserver to detect when each row scrolls into view
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number(entry.target.getAttribute('data-index'));
          setVisibleRows((prev) => {
            const next = [...prev];
            next[index] = entry.isIntersecting;
            return next;
          });
        });
      },
      {
        root: null,
        // Triggers when the item is within the middle of the viewport
        rootMargin: '-30% 0px -30% 0px',
        threshold: 0
      }
    );

    const rows = document.querySelectorAll('.value-row-item');
    rows.forEach((row) => observer.observe(row));

    return () => {
      rows.forEach((row) => observer.unobserve(row));
    };
  }, []);

  return (
    <section className="w-full bg-white text-[#06231A] py-24 sm:py-32 border-t border-[#E2DDD3]">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-12 lg:px-24 flex flex-col lg:flex-row gap-16 lg:gap-24">
        
        {/* Left Column (Sticky Intro) */}
        <div className="w-full lg:w-5/12">
          <div className="lg:sticky lg:top-32 animate-fade-in">
            <h4 className="text-2xl sm:text-3xl md:text-4xl font-medium leading-[1.2] tracking-tight mb-12">
              Africa’s industrial future will be built through access.
            </h4>
            <p className="text-lg font-medium text-[#0F4534]">
              WG Trade brings these connections together.
            </p>
          </div>
        </div>

        {/* Right Column (Values list) */}
        <div className="w-full lg:w-7/12 flex flex-col">
          {accessPoints.map((point, index) => (
            <div
              key={index}
              data-index={index}
              className={`value-row-item group relative block py-12 ${index !== 0 ? 'border-t border-[#E2DDD3]' : ''} -mx-6 px-6 sm:-mx-12 sm:px-12 animate-slide-in overflow-hidden`}
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              {/* Sweep fill background */}
              {/* On mobile (max-lg), it fills based on scroll state. On desktop (lg), it fills based on hover. */}
              <div 
                className={`absolute inset-0 bg-[#E6FFE6] origin-left transition-transform duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] z-0 ${
                  visibleRows[index] ? 'max-lg:scale-x-100' : 'max-lg:scale-x-0'
                } lg:scale-x-0 lg:group-hover:scale-x-100`} 
              />
              
              <div className="relative z-10 flex flex-col sm:flex-row justify-between items-center gap-8">
                <h3 className="text-xl font-bold tracking-tight transition-colors duration-300 delay-100">{point}</h3>
              </div>
            </div>
          ))}
        </div>
        
      </div>
    </section>
  );
}
