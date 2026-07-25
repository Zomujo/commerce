'use client';

import Link from 'next/link';

interface ContactTilesProps {
  onSourceClick?: () => void;
  onPartnerClick?: () => void;
}

export default function SectionContactTiles({ onSourceClick, onPartnerClick }: ContactTilesProps) {
  return (
    <section className="w-full bg-white pt-24 sm:pt-32">
      {/* Intro Text */}
      <div className="max-w-4xl mx-auto px-6 sm:px-8 text-center pb-24 sm:pb-32">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-medium tracking-tight text-[#06231A] mb-8 leading-[1.15]">
          Powering the movement of industry.
        </h2>
        <div className="space-y-6">
          <p className="text-lg sm:text-xl font-light text-gray-600 leading-relaxed">
            Across Africa and beyond, WG Trade is creating the trusted commercial connections through which businesses source, sell and scale.
          </p>
          <p className="text-lg sm:text-xl font-light text-gray-600 leading-relaxed">
            We are building a stronger bridge between African industry and the world—one supplier, one buyer and one transaction at a time.
          </p>
        </div>
      </div>

      {/* The Two Huge Tiles */}
      <div className="w-full flex flex-col md:flex-row min-h-[50vh]">
        {/* Left Tile (Source) */}
        <div className="w-full md:w-1/2 group relative flex flex-col justify-between p-12 sm:p-16 lg:p-24 transition-all duration-700 hover:scale-[1.02] z-10 hover:z-20 shadow-xl bg-[#F8F7F3]">
          
          <div className="relative z-10 flex flex-col flex-grow">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-medium tracking-tight text-[#06231A] transition-colors duration-500 leading-[1.1] max-w-sm mb-4">
              Source Through WG Trade
            </h3>
          </div>

          <div className="relative z-10 mt-16 lg:mt-32">
            {onSourceClick ? (
              <button
                onClick={onSourceClick}
                className="group/btn flex items-center text-sm font-bold text-[#06231A] uppercase tracking-widest w-fit"
              >
                <span className="bg-gradient-to-t from-[#D4C9A8]/40 to-transparent bg-no-repeat bg-[length:100%_40%] bg-bottom group-hover/btn:bg-[length:100%_100%] transition-all duration-300">
                  ACCESS CATALOG
                </span>
              </button>
            ) : (
              <Link
                href="#catalog"
                className="group/btn flex items-center text-sm font-bold text-[#06231A] uppercase tracking-widest w-fit"
              >
                <span className="bg-gradient-to-t from-[#D4C9A8]/40 to-transparent bg-no-repeat bg-[length:100%_40%] bg-bottom group-hover/btn:bg-[length:100%_100%] transition-all duration-300">
                  ACCESS CATALOG
                </span>
              </Link>
            )}
          </div>
        </div>

        {/* Right Tile (Partner) */}
        <div className="w-full md:w-1/2 group relative flex flex-col justify-between p-12 sm:p-16 lg:p-24 transition-all duration-700 hover:scale-[1.02] z-10 hover:z-20 shadow-xl bg-[#D0F0C0]">
          
          <div className="relative z-10 flex flex-col flex-grow">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-medium tracking-tight text-[#06231A] transition-colors duration-500 leading-[1.1] max-w-sm mb-4">
              Become a Trade Partner
            </h3>
          </div>

          <div className="relative z-10 mt-16 lg:mt-32">
            {onPartnerClick ? (
              <button
                onClick={onPartnerClick}
                className="group/btn flex items-center text-sm font-bold text-[#06231A] uppercase tracking-widest w-fit"
              >
                <span className="bg-gradient-to-t from-white/40 to-transparent bg-no-repeat bg-[length:100%_40%] bg-bottom group-hover/btn:bg-[length:100%_100%] transition-all duration-300">
                  TRADE WITH US
                </span>
              </button>
            ) : (
              <Link
                href="/contact"
                className="group/btn flex items-center text-sm font-bold text-[#06231A] uppercase tracking-widest w-fit"
              >
                <span className="bg-gradient-to-t from-white/40 to-transparent bg-no-repeat bg-[length:100%_40%] bg-bottom group-hover/btn:bg-[length:100%_100%] transition-all duration-300">
                  TRADE WITH US
                </span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
