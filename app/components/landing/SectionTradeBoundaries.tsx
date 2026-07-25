'use client';

export default function SectionTradeBoundaries() {
  return (
    <section className="py-24 sm:py-32 bg-white">
      <div className="max-w-4xl mx-auto px-6 sm:px-8 text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-medium tracking-tight text-[#06231A] mb-12 leading-[1.15]">
          Trade without boundaries.
        </h2>
        
        <div className="space-y-8">
          <p className="text-lg sm:text-xl font-light text-gray-600 leading-relaxed">
            The right supplier may be in Accra, Lagos, Johannesburg, Dubai, Shanghai or Hamburg.
          </p>
          <p className="text-lg sm:text-xl font-light text-gray-600 leading-relaxed">
            The next major buyer may be across the border or across the world.
          </p>
          <div className="w-16 h-[2px] bg-[#D4C9A8] mx-auto my-8" />
          <p className="text-lg sm:text-xl font-medium text-[#0F4534] leading-relaxed">
            WG Trade helps businesses discover and act on opportunities wherever they exist—combining global reach with the local knowledge required to trade successfully across African markets.
          </p>
        </div>
      </div>
    </section>
  );
}
