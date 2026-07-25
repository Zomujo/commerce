'use client';

export default function SectionAbout() {
  return (
    <section className="relative py-24 sm:py-32 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center">
          <div className="lg:col-span-5">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-medium tracking-tight text-[#06231A] leading-[1.15]">
              Building stronger supply chains from Africa to the world.
            </h2>
          </div>
          
          <div className="lg:col-span-7 space-y-6 lg:border-l lg:border-[#E2DDD3] lg:pl-16">
            <p className="text-base sm:text-lg font-light text-gray-600 leading-relaxed">
              Africa’s industries depend on reliable access to materials, equipment, financing and markets.
            </p>
            <p className="text-base sm:text-lg font-light text-gray-600 leading-relaxed">
              At the same time, the continent is home to producers, manufacturers and suppliers with the capacity to serve growing demand across Africa and beyond.
            </p>
            <p className="text-base sm:text-lg font-light text-gray-600 leading-relaxed text-[#0F4534] font-medium">
              WG Trade connects both sides.
            </p>
            <p className="text-base sm:text-lg font-light text-gray-600 leading-relaxed">
              We help businesses source more effectively, reach new markets and move goods across borders with greater confidence.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
