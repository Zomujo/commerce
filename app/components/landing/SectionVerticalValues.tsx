'use client';

const accessPoints = [
  'Access to reliable suppliers.',
  'Access to essential materials.',
  'Access to working capital.',
  'Access to efficient logistics.',
  'Access to regional and global markets.'
];

export default function SectionVerticalValues() {
  return (
    <section className="w-full bg-white text-[#06231A] py-24 sm:py-32 border-t border-[#E2DDD3]">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-12 lg:px-24 flex flex-col lg:flex-row gap-16 lg:gap-24">
        
        {/* Left Column (Sticky Intro) */}
        <div className="w-full lg:w-5/12">
          <div className="lg:sticky lg:top-32 animate-fade-in">
            <h4 className="text-2xl sm:text-3xl md:text-4xl font-medium leading-[1.2] tracking-tight mb-12">
              Africa’s industrial future will be built through access.
            </h4>
            <p className="text-lg font-medium text-[#0F4534]">
              WG Trade brings these connections together.
            </p>
          </div>
        </div>

        {/* Right Column (Values list) */}
        <div className="w-full lg:w-7/12 flex flex-col">
          {accessPoints.map((point, index) => (
            <div
              key={index}
              className={`group relative block py-12 ${index !== 0 ? 'border-t border-[#E2DDD3]' : ''} -mx-6 px-6 sm:-mx-12 sm:px-12 animate-slide-in overflow-hidden`}
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              {/* Sweep fill background */}
              <div className="absolute inset-0 bg-[#E6FFE6] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] z-0" />
              
              <div className="relative z-10 flex flex-col sm:flex-row justify-between items-center gap-8">
                <h3 className="text-xl font-bold tracking-tight transition-colors duration-300 delay-100">{point}</h3>
              </div>
            </div>
          ))}
        </div>
        
      </div>
    </section>
  );
}
