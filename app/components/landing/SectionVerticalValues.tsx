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
              className={`group block py-12 ${index !== 0 ? 'border-t border-[#E2DDD3]' : ''} hover:bg-[#F8F7F3] -mx-6 px-6 sm:-mx-12 sm:px-12 transition-colors duration-300 animate-slide-in`}
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <div className="flex flex-col sm:flex-row justify-between items-center gap-8">
                <h3 className="text-xl font-bold tracking-tight">{point}</h3>
                <div className="flex-shrink-0 text-[#E2DDD3] group-hover:text-[#D4C9A8] transition-colors duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="m6.171 17.513 11.18-11.18M6.171 6.334h11.18v11.179" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
        
      </div>
    </section>
  );
}
