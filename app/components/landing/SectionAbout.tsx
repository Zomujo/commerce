import Link from 'next/link';

export default function SectionAbout() {
  return (
    <section className="w-full bg-white text-[#06231A] py-24 sm:py-32 px-6 sm:px-12 lg:px-24">
      <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row gap-12 lg:gap-24">
        
        {/* Left Column (Sticky Title) */}
        <div className="w-full lg:w-1/4">
          <div className="lg:sticky lg:top-32 animate-fade-in">
            <h2 className="text-sm font-bold uppercase tracking-widest text-gray-400">
              About WG Trade
            </h2>
          </div>
        </div>

        {/* Right Column (Content) */}
        <div className="w-full lg:w-3/4 flex flex-col">
          <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] font-medium leading-[1.1] tracking-tight mb-16 max-w-4xl animate-slide-in">
            WG Trade provides digital infrastructure, optimizing industrial supply chains for diverse market needs.
          </h3>
          
          <div className="mb-24 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <Link 
              href="/about"
              className="group flex items-center text-sm font-bold text-[#06231A] uppercase tracking-widest w-fit"
            >
              <span className="bg-gradient-to-t from-[#E5A93C]/40 to-transparent bg-no-repeat bg-[length:100%_40%] bg-bottom group-hover:bg-[length:100%_100%] transition-all duration-300">
                Read more
              </span>
              <svg className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-12 pt-16 border-t border-[#E2DDD3] animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <div className="max-w-xl text-lg sm:text-xl text-gray-600 font-light leading-relaxed">
              Serving a diverse industrial clientele, our platform provides holistic solutions for supply chain management, raw material sourcing, and trade financing.
            </div>
            
            <div className="flex-shrink-0">
              <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#06231A]">
                <rect width="60" height="60" rx="30" fill="currentColor" fillOpacity="0.05"/>
                <path d="M20 30L40 30M30 20L30 40" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M30 15L45 30L30 45L15 30L30 15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
