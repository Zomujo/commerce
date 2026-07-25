export default function SectionFixedImage() {
  return (
    <section className="relative w-full h-[60vh] min-h-[400px] lg:h-[80vh] overflow-hidden">
      <div 
        className="absolute inset-0 w-full h-full bg-fixed bg-center bg-cover bg-no-repeat transition-transform duration-1000 ease-out hover:scale-105"
        style={{ backgroundImage: 'url(/images/landing/hero_industrial_port.png)' }}
      />
      {/* Subtle overlay to blend with the aesthetic */}
      <div className="absolute inset-0 bg-[#06231A]/20" />
    </section>
  );
}
