'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { stats } from '../../lib/data';

export default function AboutPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const heroY = useTransform(heroScroll, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(heroScroll, [0, 1], [1, 0.2]);
  const heroScale = useTransform(heroScroll, [0, 1], [1, 1.1]);

  const fadeUpVariant = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const } 
    }
  };

  const staggerVariant = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const lineVariant = {
    hidden: { scaleX: 0 },
    visible: { 
      scaleX: 1, 
      transition: { duration: 1, ease: [0.16, 1, 0.3, 1] as const } 
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#06231A] selection:bg-[#E6FFE6] selection:text-[#06231A]">
      <Header />

      <main className="flex-1 overflow-hidden">
        
        {/* 1. Parallax Hero */}
        <section ref={heroRef} className="relative h-[90vh] md:h-screen w-full flex items-center justify-center overflow-hidden">
          <motion.div 
            className="absolute inset-0 z-0 origin-bottom"
            style={{ y: heroY, opacity: heroOpacity, scale: heroScale }}
          >
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(/images/landing/factory_production_line.png)` }}
            />
            {/* Deep Green gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#06231A]/60 via-[#06231A]/40 to-[#06231A]" />
          </motion.div>

          <div className="relative z-10 max-w-[1400px] w-full mx-auto px-6 sm:px-12 lg:px-24 flex flex-col items-center justify-center text-center mt-20">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerVariant}
            >
              <motion.span 
                variants={fadeUpVariant}
                className="block text-[#E6FFE6] font-mono font-bold uppercase tracking-widest text-sm mb-6"
              >
                Connecting Global Industry
              </motion.span>
              <motion.h1 
                variants={fadeUpVariant}
                className="text-5xl sm:text-6xl md:text-8xl lg:text-[7rem] font-medium text-white tracking-tighter leading-[0.9]"
              >
                Trade Without <br /> Boundaries
              </motion.h1>
            </motion.div>
          </div>
        </section>

        {/* 2. Mission & Vision (Editorial Sticky Scrolling) */}
        <section className="relative bg-[#06231A] text-white py-24 lg:py-48 z-20">
          <div className="max-w-[1400px] mx-auto px-6 sm:px-12 lg:px-24">
            
            <div className="flex flex-col lg:flex-row items-start gap-12 lg:gap-32">
              {/* Sticky Title */}
              <div className="w-full lg:w-1/3 lg:sticky lg:top-40">
                <motion.h2 
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-100px" }}
                  variants={fadeUpVariant}
                  className="text-4xl sm:text-5xl md:text-7xl font-medium tracking-tight"
                >
                  Our <br className="hidden lg:block" /> Mission
                </motion.h2>
              </div>

              {/* Scrolling Content */}
              <div className="w-full lg:w-2/3 flex flex-col gap-24 lg:gap-40">
                <motion.div 
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-100px" }}
                  variants={fadeUpVariant}
                  className="max-w-3xl"
                >
                  <p className="text-2xl sm:text-3xl md:text-4xl font-light leading-tight text-[#E2DDD3]">
                    We are revolutionizing the industrial supply chain by providing a transparent, efficient, and reliable B2B marketplace.
                  </p>
                  <p className="mt-8 text-lg md:text-xl text-white/50 font-light leading-relaxed">
                    Procurement shouldn't be opaque. We strive to make sourcing faster, safer, and more cost-effective for businesses globally by cutting through the noise and connecting you directly with verified suppliers.
                  </p>
                </motion.div>

                <motion.div 
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-100px" }}
                  variants={fadeUpVariant}
                  className="max-w-3xl"
                >
                  <h3 className="text-2xl sm:text-3xl font-medium mb-6">Our Vision</h3>
                  <p className="text-2xl sm:text-3xl md:text-4xl font-light leading-tight text-[#E2DDD3]">
                    To become the world&apos;s definitive digital platform for industrial procurement, setting new standards for quality, reliability, and sustainability.
                  </p>
                  <p className="mt-8 text-lg md:text-xl text-white/50 font-light leading-relaxed">
                    We envision a future where every manufacturer, regardless of location, has seamless access to verified global supply. A frictionless trade environment that empowers businesses to build the future.
                  </p>
                </motion.div>
              </div>
            </div>
            
          </div>
        </section>

        {/* 3. Impact Stats (Massive Typography) */}
        <section className="bg-white text-[#06231A] py-32 lg:py-48">
          <div className="max-w-[1400px] mx-auto px-6 sm:px-12 lg:px-24">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeUpVariant}
              className="mb-24 lg:mb-32"
            >
              <h2 className="text-4xl sm:text-5xl md:text-7xl font-medium tracking-tight">
                Global Impact
              </h2>
            </motion.div>

            <div className="flex flex-col">
              {stats.map((stat, index) => (
                <motion.div 
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  variants={staggerVariant}
                  className="relative flex flex-col md:flex-row md:items-end justify-between py-12 lg:py-16 border-t border-[#E2DDD3] last:border-b group hover:bg-[#F8F7F3] transition-colors duration-500"
                >
                  <motion.div 
                    variants={lineVariant} 
                    className="absolute top-0 left-0 w-full h-[1px] bg-[#06231A] origin-left"
                  />
                  <motion.div variants={fadeUpVariant} className="mb-4 md:mb-0">
                    <span className="block text-sm font-mono font-bold text-[#0F4534] uppercase tracking-widest mb-4">
                      0{index + 1}
                    </span>
                    <span className="text-2xl sm:text-3xl lg:text-4xl font-light text-[#4B5563]">
                      {stat.label}
                    </span>
                  </motion.div>
                  <motion.div 
                    variants={fadeUpVariant}
                    className="text-7xl sm:text-8xl lg:text-[9rem] font-medium tracking-tighter leading-none"
                  >
                    {stat.value}
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. Core Values (Editorial List) */}
        <section className="bg-[#F8F7F3] text-[#06231A] py-32 lg:py-48 border-t border-[#E2DDD3]">
          <div className="max-w-[1400px] mx-auto px-6 sm:px-12 lg:px-24">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeUpVariant}
              className="mb-24 lg:mb-32 flex flex-col md:flex-row md:items-end justify-between gap-8"
            >
              <h2 className="text-4xl sm:text-5xl md:text-7xl font-medium tracking-tight">
                The Principles
              </h2>
              <p className="max-w-sm text-lg text-[#0F4534] font-light">
                The foundational values that dictate how we operate, source, and build relationships globally.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-24">
              {[
                { title: 'Trust & Transparency', desc: 'We verify every supplier and maintain complete transparency in all transactions, ensuring you work with reliable partners.' },
                { title: 'Quality First', desc: 'All products meet international quality standards. We rigorously vet suppliers to ensure consistent, high-quality materials.' },
                { title: 'Efficiency', desc: 'Streamlined procurement process that saves you time and resources, from quote requests to delivery.' },
                { title: 'Customer Focus', desc: 'Our dedicated team operates globally to help you source the exact materials and equipment for your operational needs.' },
                { title: 'Innovation', desc: 'Leveraging technology to continuously improve the B2B procurement experience and overall supply chain efficiency.' },
                { title: 'Sustainability', desc: 'Promoting environmentally responsible practices and eco-friendly alternatives across the heavy industrial sector.' },
              ].map((val, idx) => (
                <motion.div 
                  key={idx}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  variants={fadeUpVariant}
                  className="flex flex-col"
                >
                  <span className="text-[#06231A]/30 font-mono text-sm mb-6">0{idx + 1}</span>
                  <h3 className="text-3xl sm:text-4xl font-medium tracking-tight mb-6">
                    {val.title}
                  </h3>
                  <p className="text-lg text-[#4B5563] font-light leading-relaxed">
                    {val.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. Animated CTA */}
        <section className="bg-white text-white py-12 px-6 sm:px-12 lg:px-24 pb-32">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              hidden: { scale: 0.95, opacity: 0 },
              visible: { scale: 1, opacity: 1, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] as const } }
            }}
            className="bg-[#06231A] px-10 py-24 sm:p-32 flex flex-col items-center text-center rounded-sm overflow-hidden relative"
          >
            <div className="absolute inset-0 bg-[url('/images/landing/global_freight.png')] opacity-10 bg-cover bg-center mix-blend-overlay" />
            <div className="relative z-10 max-w-4xl">
              <h2 className="text-5xl sm:text-6xl lg:text-7xl font-medium tracking-tight mb-8">
                Ready to Get Started?
              </h2>
              <p className="text-xl sm:text-2xl text-[#E6FFE6] font-light mb-12">
                Join thousands of manufacturers who trust WG Trade for their industrial procurement needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Link 
                  href="/products" 
                  className="flex items-center justify-center px-12 py-5 bg-white text-[#06231A] font-medium uppercase tracking-widest text-sm hover:bg-[#E6FFE6] transition-colors"
                >
                  Browse Catalog
                </Link>
                <Link 
                  href="/contact" 
                  className="flex items-center justify-center px-12 py-5 bg-transparent border border-white/30 text-white font-medium uppercase tracking-widest text-sm hover:border-white transition-colors"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </motion.div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
