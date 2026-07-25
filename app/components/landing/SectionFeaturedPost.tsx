'use client';

export default function SectionFeaturedPost() {
  return (
    <section className="py-24 sm:py-32 bg-[#F8F7F3] border-y border-[#E2DDD3]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          <div className="order-2 lg:order-1 relative group">
            <div className="aspect-[4/3] bg-gray-200 overflow-hidden relative">
              <img 
                src="/images/landing/hero_industrial_port.png" 
                alt="Industrial port operations"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
            </div>


          </div>

          <div className="order-1 lg:order-2 space-y-8">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-medium tracking-tight text-[#06231A] leading-[1.15]">
              Connecting African industry to global opportunity.
            </h2>
            
            <div className="w-12 h-[2px] bg-[#D4C9A8]" />
            
            <p className="text-base text-gray-600 font-light leading-relaxed">
              The future of African industry will be shaped by how efficiently businesses can access the world—and how effectively the world can access African production.
            </p>

            <p className="text-base text-gray-600 font-light leading-relaxed">
              WG Trade creates trusted commercial channels between African businesses and manufacturers, producers, distributors and buyers across global markets.
            </p>

            <div className="pt-6 border-t border-[#E2DDD3]">
              <p className="text-lg font-medium text-[#0F4534] leading-relaxed">
                "Global supply. African opportunity. Connected through WG Trade."
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
