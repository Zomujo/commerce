'use client';

const tradePoints = [
  {
    title: 'Factories',
    description: 'Need reliable access to raw materials to maintain continuous production cycles.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    )
  },
  {
    title: 'Infrastructure',
    description: 'Requires steady supplies of steel, chemicals, heavy machinery, and energy.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    )
  },
  {
    title: 'Mines',
    description: 'Depend heavily on specialized equipment, parts, and essential operating inputs.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  },
  {
    title: 'Manufacturers',
    description: 'Rely on thousands of products moving continuously between businesses, countries, and continents.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
      </svg>
    )
  }
];

export default function SectionFixedImage() {
  return (
    <section className="relative py-24 sm:py-32 flex items-center justify-center overflow-hidden min-h-screen">
      {/* Fixed Background Image */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat bg-fixed"
        style={{
          backgroundImage: 'url(/images/landing/hero_mining_machinery.png)',
        }}
      />
      
      {/* Gradient Overlays */}
      <div className="absolute inset-0 z-10 bg-[#06231A]/80 backdrop-blur-sm" />
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#06231A] via-transparent to-[#06231A] opacity-90" />

      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full">
        <div className="max-w-3xl mx-auto text-center mb-16 sm:mb-24">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight text-white mb-6 leading-[1.15]">
            The world runs on industrial trade.
          </h2>
        </div>
        
        {/* Glassmorphic Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-16 sm:mb-24">
          {tradePoints.map((point, index) => (
            <div 
              key={index}
              className="group relative p-8 sm:p-10 border border-white/10 bg-white/5 backdrop-blur-md hover:bg-white/10 transition-colors duration-500 overflow-hidden"
            >
              {/* Subtle hover gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#D4C9A8]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10 flex flex-col sm:flex-row gap-6 items-start">
                <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-white/10 text-[#D4C9A8] group-hover:scale-110 transition-transform duration-500">
                  {point.icon}
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-medium text-white mb-3 tracking-tight">
                    {point.title}
                  </h3>
                  <p className="text-base sm:text-lg text-white/70 font-light leading-relaxed">
                    {point.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="max-w-4xl mx-auto text-center pt-12 sm:pt-16 border-t border-white/10">
          <p className="text-xl sm:text-2xl md:text-3xl text-white font-medium leading-relaxed">
            WG Trade is building the commercial infrastructure that <span className="text-[#D4C9A8]">keeps them moving</span>.
          </p>
        </div>
      </div>
    </section>
  );
}
