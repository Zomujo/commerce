import Link from 'next/link';

interface ContactTilesProps {
  onSourceClick?: () => void;
  onPartnerClick?: () => void;
}

export default function SectionContactTiles({ onSourceClick, onPartnerClick }: ContactTilesProps) {
  return (
    <div className="w-full flex flex-col md:flex-row min-h-[50vh]">
      
      {/* Left Tile (Source) */}
      <div className="w-full md:w-1/2 group relative flex flex-col justify-between p-12 sm:p-16 lg:p-24 transition-all duration-700 hover:scale-[1.02] z-10 hover:z-20 shadow-2xl"
           style={{ backgroundImage: 'linear-gradient(to bottom, #F8F7F3 40%, #0F4534 60%)' }}>
        
        {/* Hover overlay that smoothly transitions the gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#EFECE4] to-[#0A3326] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

        <div className="relative z-10 flex flex-col flex-grow">
          <div className="mb-8">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-gray-400 group-hover:text-white transition-colors duration-500">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
          <h3 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-[#06231A] group-hover:text-white transition-colors duration-500 leading-[1.1] max-w-sm mb-4">
            Source Through WG Trade
          </h3>
          <p className="text-lg text-gray-500 group-hover:text-gray-300 transition-colors duration-500 max-w-sm font-light">
            Access our active catalog of industrial materials and production inputs.
          </p>
        </div>

        <div className="relative z-10 mt-16 lg:mt-32">
          {onSourceClick ? (
            <button
              onClick={onSourceClick}
              className="group/btn flex items-center text-sm font-bold text-white uppercase tracking-widest w-fit"
            >
              <span className="bg-gradient-to-t from-[#E5A93C]/40 to-transparent bg-no-repeat bg-[length:100%_40%] bg-bottom group-hover/btn:bg-[length:100%_100%] transition-all duration-300">
                ACCESS CATALOG
              </span>
              <svg className="w-5 h-5 ml-3 transition-transform group-hover/btn:translate-x-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          ) : (
            <Link
              href="#catalog"
              className="group/btn flex items-center text-sm font-bold text-white uppercase tracking-widest w-fit"
            >
              <span className="bg-gradient-to-t from-[#E5A93C]/40 to-transparent bg-no-repeat bg-[length:100%_40%] bg-bottom group-hover/btn:bg-[length:100%_100%] transition-all duration-300">
                ACCESS CATALOG
              </span>
              <svg className="w-5 h-5 ml-3 transition-transform group-hover/btn:translate-x-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          )}
        </div>
      </div>

      {/* Right Tile (Partner) */}
      <div className="w-full md:w-1/2 group relative flex flex-col justify-between p-12 sm:p-16 lg:p-24 transition-all duration-700 hover:scale-[1.02] z-10 hover:z-20 shadow-2xl"
           style={{ backgroundImage: 'linear-gradient(to bottom, #155B45 40%, #06231A 60%)' }}>
        
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0F4534] to-[#041611] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

        <div className="relative z-10 flex flex-col flex-grow">
          <div className="mb-8">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-gray-400 group-hover:text-[#E5A93C] transition-colors duration-500">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </div>
          <h3 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-white group-hover:text-white transition-colors duration-500 leading-[1.1] max-w-sm mb-4">
            Become a Trade Partner
          </h3>
          <p className="text-lg text-gray-300 group-hover:text-gray-200 transition-colors duration-500 max-w-sm font-light">
            Join the network connecting African industry to the global market.
          </p>
        </div>

        <div className="relative z-10 mt-16 lg:mt-32">
          {onPartnerClick ? (
            <button
              onClick={onPartnerClick}
              className="group/btn flex items-center text-sm font-bold text-[#E5A93C] uppercase tracking-widest w-fit"
            >
              <span className="bg-gradient-to-t from-[#E5A93C]/20 to-transparent bg-no-repeat bg-[length:100%_40%] bg-bottom group-hover/btn:bg-[length:100%_100%] transition-all duration-300">
                TRADE WITH US
              </span>
              <svg className="w-5 h-5 ml-3 transition-transform group-hover/btn:translate-x-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          ) : (
            <Link
              href="/contact"
              className="group/btn flex items-center text-sm font-bold text-[#E5A93C] uppercase tracking-widest w-fit"
            >
              <span className="bg-gradient-to-t from-[#E5A93C]/20 to-transparent bg-no-repeat bg-[length:100%_40%] bg-bottom group-hover/btn:bg-[length:100%_100%] transition-all duration-300">
                TRADE WITH US
              </span>
              <svg className="w-5 h-5 ml-3 transition-transform group-hover/btn:translate-x-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
