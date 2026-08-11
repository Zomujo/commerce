'use client';

import Image from 'next/image';

const services = [
  {
    id: '01',
    title: 'Industrial Sourcing',
    description: 'Access manufacturers, producers and distributors of essential materials, equipment and commodities across African and international markets.',
    bgImage: '/images/landing/hero_logistics_cargo.webp',
    overlayColor: 'bg-[#06231A]',
    textColor: 'text-white',
  },
  {
    id: '02',
    title: 'Market Access',
    description: 'Reach credible buyers, enter new countries and establish stronger commercial and distribution relationships within Africa and globally.',
    bgImage: '/images/landing/african_manufacturing.webp',
    overlayColor: 'bg-[#155B45]',
    textColor: 'text-white',
  },
  {
    id: '03',
    title: 'Trade Execution',
    description: 'Move from opportunity to completed transaction with support across negotiation, documentation, payments, logistics and delivery.',
    bgImage: '/images/landing/hero_industrial_port.webp',
    overlayColor: 'bg-[#0F4534]',
    textColor: 'text-white',
  },
  {
    id: '04',
    title: 'Trade Finance',
    description: 'Connect eligible transactions to financing and structured payment solutions designed to keep commerce moving.',
    bgImage: '/images/landing/hero_mining_machinery.webp',
    overlayColor: 'bg-[#FDF7EA]',
    textColor: 'text-[#06231A]',
  },
  {
    id: '05',
    title: 'Market Intelligence',
    description: 'Understand pricing, supply conditions, product availability and emerging opportunities across key industrial markets.',
    bgImage: '/images/landing/african_manufacturing.webp',
    overlayColor: 'bg-[#D4C9A8]',
    textColor: 'text-[#06231A]',
  },
  {
    id: '06',
    title: 'Responsible Trade',
    description: 'Build more transparent, traceable and sustainable supply relationships from source to destination.',
    bgImage: '/images/landing/hero_industrial_port.webp',
    overlayColor: 'bg-[#111815]',
    textColor: 'text-white',
  }
];

export default function SectionServicesSlider() {
  // Duplicate the array to create a seamless infinite loop
  const displayServices = [...services, ...services];

  return (
    <section className="w-full bg-white overflow-hidden">
      {/* Headline */}
      <div className="max-w-[1400px] mx-auto px-6 sm:px-12 lg:px-24 py-24 sm:py-32 border-b border-[#E2DDD3]">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight text-[#06231A] leading-[1.1] max-w-4xl animate-fade-in">
          Built around the needs of industry.
        </h2>
      </div>

      {/* Slider Container */}
      <div className="relative w-full group overflow-hidden bg-white">
        
        {/* Continuous Scroll Track */}
        <div className="flex w-max animate-continuous-scroll">
          {displayServices.map((service, idx) => (
            <div 
              key={`${service.id}-${idx}`}
              className={`relative flex-shrink-0 w-[85vw] sm:w-[500px] lg:w-[600px] h-[600px] group/card overflow-hidden border-r border-[#E2DDD3] ${service.textColor}`}
            >
              {/* Background & Overlay */}
              <div className="absolute inset-0">
                <Image
                  src={service.bgImage}
                  alt={service.title}
                  fill
                  sizes="(max-width: 640px) 85vw, (max-width: 1024px) 500px, 600px"
                  className="object-cover transition-transform duration-[10000ms] group-hover/card:scale-110"
                />
                <div className={`absolute inset-0 ${service.overlayColor} opacity-90 transition-opacity duration-500 group-hover/card:opacity-95`} />
              </div>

              {/* Content Box */}
              <div className="absolute inset-0 p-8 sm:p-12 flex flex-col justify-between z-10">
                <div className="text-xl font-mono font-bold">{service.id}</div>
                
                <div className="flex flex-col">
                  <h3 className="text-3xl lg:text-4xl font-medium tracking-tight">
                    {service.title}
                  </h3>
                  
                  {/* Accordion style expansion for description */}
                  <div className="grid grid-rows-[1fr] lg:grid-rows-[0fr] lg:group-hover/card:grid-rows-[1fr] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
                    <div className="overflow-hidden">
                      <div className="flex flex-col gap-6 pt-6">
                        <p className="text-base lg:text-lg font-light leading-relaxed">
                          {service.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>

      <style jsx>{`
        @keyframes continuous-scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-continuous-scroll {
          animation: continuous-scroll 45s linear infinite;
          will-change: transform;
        }

        /* Pause animation on hover so users can read the cards */
        .group:hover .animate-continuous-scroll {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
