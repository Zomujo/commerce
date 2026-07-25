import Link from 'next/link';
import Image from 'next/image';

export default function SectionFeaturedPost() {
  return (
    <section className="w-full flex flex-col md:flex-row bg-[#F8F7F3] border-b border-[#E2DDD3]">
      {/* Featured Text Block (Left) */}
      <div className="w-full md:w-1/2 p-8 sm:p-12 lg:p-20 flex flex-col justify-between min-h-[400px] lg:min-h-[600px] border-b md:border-b-0 md:border-r border-[#E2DDD3] animate-fade-in">
        <div className="flex justify-between items-center mb-12">
          <div className="text-xs font-mono font-bold uppercase tracking-widest text-[#0F4534] bg-[#0F4534]/10 px-3 py-1 rounded">
            Infrastructure
          </div>
          <div className="text-sm font-medium text-gray-500">
            WG Trade
          </div>
        </div>
        
        <div className="flex-grow flex flex-col justify-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#06231A] mb-6 leading-tight">
            Building stronger supply chains from Africa to the world.
          </h2>
          <p className="text-base sm:text-lg text-gray-600 font-light leading-relaxed max-w-lg mb-12">
            Africa's industries depend on reliable access to materials, equipment, financing and markets. WG Trade connects producers, manufacturers and suppliers with the capacity to serve growing demand across Africa and beyond.
          </p>
        </div>

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

      {/* Featured Media Block (Right) */}
      <div className="w-full md:w-1/2 relative min-h-[400px] lg:min-h-[600px] animate-fade-in overflow-hidden group">
        <Image
          src="/images/landing/african_manufacturing.png"
          alt="African Manufacturing"
          fill
          className="object-cover object-center group-hover:scale-105 transition-transform duration-[10000ms] ease-out"
        />
        
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-500" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />

        <div className="absolute top-8 left-8 sm:top-12 sm:left-12 text-white font-medium text-lg tracking-wide">
          Digital Commerce Infrastructure
        </div>

        <div className="absolute bottom-8 left-8 sm:bottom-12 sm:left-12 flex items-center justify-between w-[calc(100%-4rem)] sm:w-[calc(100%-6rem)]">
          <button className="flex items-center space-x-3 text-white uppercase text-xs font-bold tracking-widest group/btn">
            <div className="w-10 h-10 rounded-full border border-white/50 flex items-center justify-center bg-white/10 backdrop-blur-sm group-hover/btn:bg-white group-hover/btn:text-[#06231A] transition-all duration-300">
              <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
              </svg>
            </div>
            <span className="bg-gradient-to-t from-[#E5A93C]/60 to-transparent bg-no-repeat bg-[length:100%_40%] bg-bottom group-hover/btn:bg-[length:100%_100%] transition-all duration-300 pb-0.5">
              Watch full overview
            </span>
          </button>
          
          <div className="text-white text-xs font-mono tracking-wider opacity-80">
            01:24:00
          </div>
        </div>
      </div>
    </section>
  );
}
