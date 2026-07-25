import Link from 'next/link';

const values = [
  {
    id: 'value-1',
    title: 'Verified Suppliers Network',
    description: 'Direct channels to African commodities and industrial materials, ensuring verified execution and stringent quality standards.',
    link: '#catalog'
  },
  {
    id: 'value-2',
    title: 'Direct Sourcing Platform',
    description: 'Seamless access to restocking and logistics for industrial chemicals, polymers, and manufacturing inputs across key markets.',
    link: '#catalog'
  },
  {
    id: 'value-3',
    title: 'Trade Financing',
    description: 'Working with regulated financial institutions, we provide inventory and commodity finance to help users easily scale their businesses.',
    link: '#services'
  }
];

export default function SectionVerticalValues() {
  return (
    <section className="w-full bg-white text-[#06231A] py-24 sm:py-32">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-12 lg:px-24 flex flex-col lg:flex-row gap-16 lg:gap-24">
        
        {/* Left Column (Sticky Intro) */}
        <div className="w-full lg:w-5/12">
          <div className="lg:sticky lg:top-32 animate-fade-in">
            <h4 className="text-3xl sm:text-4xl md:text-[2.75rem] font-medium leading-[1.2] tracking-tight mb-12">
              At WG Trade, we blend commercial infrastructure with local insight to create solutions tailored for industry.
            </h4>
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
        </div>

        {/* Right Column (Vertical Values) */}
        <div className="w-full lg:w-7/12 flex flex-col">
          {values.map((val, index) => (
            <Link
              key={val.id}
              href={val.link}
              className={`group block py-12 ${index !== 0 ? 'border-t border-[#E2DDD3]' : ''} hover:bg-[#F8F7F3] -mx-6 px-6 sm:-mx-12 sm:px-12 transition-colors duration-300 animate-slide-in`}
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <div className="flex flex-col sm:flex-row justify-between items-start gap-8">
                <div className="max-w-xl">
                  <h3 className="text-2xl font-bold mb-4 uppercase tracking-wider">{val.title}</h3>
                  <p className="text-lg text-gray-600 font-light leading-relaxed">{val.description}</p>
                </div>
                <div className="flex-shrink-0 text-[#0F4534] group-hover:text-[#E5A93C] transition-colors duration-300 mt-1 sm:mt-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="m6.171 17.513 11.18-11.18M6.171 6.334h11.18v11.179" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
        
      </div>
    </section>
  );
}
