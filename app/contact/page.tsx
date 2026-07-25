'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { ApiClient } from '@/lib/api-client';
import { ContactSubject } from '@/types/api';

const fadeUpVariant = {
  hidden: { opacity: 0, y: 30 },
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
    transition: { staggerChildren: 0.15 }
  }
};

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    try {
      await ApiClient.submitContact({
        name: formData.name,
        email: formData.email,
        company: formData.company,
        phone: formData.phone,
        subject: formData.subject.toUpperCase() as ContactSubject,
        message: formData.message,
      });
      setIsSuccess(true);
      setFormData({ name: '', email: '', company: '', phone: '', subject: '', message: '' });
    } catch (err) {
      console.error('Contact submission failed:', err);
      setError(err instanceof Error ? err.message : 'Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen flex flex-col selection:bg-[#06231A] selection:text-white">
      <Header />

      <main className="flex-1 bg-white">
        {/* Page Header */}
        <section className="bg-white pt-40 pb-24 lg:pt-48 lg:pb-32 relative overflow-hidden border-b border-[#E2DDD3]">
          <div className="max-w-[1400px] mx-auto px-6 sm:px-12 lg:px-24">
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={staggerVariant}
            >
              <motion.span 
                variants={fadeUpVariant}
                className="block text-[#0F4534] font-mono font-bold uppercase tracking-widest text-sm mb-6"
              >
                Global Support
              </motion.span>
              <motion.h1 
                variants={fadeUpVariant}
                className="text-5xl sm:text-6xl md:text-8xl font-medium text-[#06231A] tracking-tighter leading-[0.9] mb-8"
              >
                Start a <br /> Conversation
              </motion.h1>
              <motion.p 
                variants={fadeUpVariant}
                className="text-lg sm:text-xl text-[#4B5563] font-light max-w-2xl leading-relaxed"
              >
                Have questions? Our team operates globally to help you source the right chemicals, raw materials, and heavy equipment.
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* Contact Content */}
        <section className="py-24 lg:py-32">
          <div className="max-w-[1400px] mx-auto px-6 sm:px-12 lg:px-24">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-16 lg:gap-24">
              
              {/* Contact Info */}
              <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={staggerVariant}
              >
                <motion.h2 
                  variants={fadeUpVariant}
                  className="text-2xl sm:text-3xl font-medium text-[#06231A] mb-12 tracking-tight"
                >
                  Contact Details
                </motion.h2>
                
                <div className="flex flex-col">
                  {[
                    {
                      icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
                      label: 'Email',
                      value: 'admin@wgtradeafrica.com\ntrade@wgtradeafrica.com\nexports@wgtradeafrica.com',
                      href: 'mailto:admin@wgtradeafrica.com',
                    },
                    {
                      icon: 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z',
                      label: 'Phone',
                      value: '030 395 9173 \n024 119 7843',
                      href: 'tel:+233303959173',
                    },
                    {
                      icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z',
                      label: 'Headquarters',
                      value: 'Accra, Ghana',
                    },
                  ].map((contact, index) => (
                    <motion.div 
                      key={index} 
                      variants={fadeUpVariant}
                      className="flex items-start gap-6 py-8 border-t border-[#E2DDD3] last:border-b"
                    >
                      <div className="w-12 h-12 bg-[#06231A] flex items-center justify-center flex-shrink-0">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d={contact.icon} />
                        </svg>
                      </div>
                      <div>
                        <div className="text-xs font-mono font-bold text-[#0F4534] uppercase tracking-widest mb-2">
                          {contact.label}
                        </div>
                        {contact.href ? (
                          <a href={contact.href} className="text-base text-[#06231A] font-medium whitespace-pre-line leading-relaxed hover:text-[#0F4534] transition-colors">
                            {contact.value}
                          </a>
                        ) : (
                          <div className="text-base text-[#06231A] font-medium whitespace-pre-line leading-relaxed">
                            {contact.value}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Office Hours */}
                <motion.div variants={fadeUpVariant} className="mt-12">
                  <h3 className="text-xs font-mono font-bold text-[#0F4534] uppercase tracking-widest mb-4">
                    Business Hours
                  </h3>
                  <div className="text-sm text-[#06231A] leading-loose">
                    <div>Monday - Friday: 9:00 AM - 6:00 PM EST</div>
                    <div>Saturday: 10:00 AM - 2:00 PM EST</div>
                    <div>Sunday: Closed</div>
                  </div>
                </motion.div>
              </motion.div>

              {/* Contact Form */}
              <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUpVariant}
                className="bg-[#F8F7F3] border border-[#E2DDD3] p-8 sm:p-12"
              >
                {isSuccess ? (
                  <div className="text-center py-16">
                    <div className="w-16 h-16 bg-[#06231A] flex items-center justify-center mx-auto mb-8">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20,6 9,17 4,12" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-medium text-[#06231A] mb-4 tracking-tight">
                      Message Sent
                    </h3>
                    <p className="text-[#0F4534] font-light mb-12">
                      Thank you for reaching out. A representative will be in touch within 24 hours.
                    </p>
                    <button 
                      onClick={() => setIsSuccess(false)}
                      className="px-8 py-4 bg-transparent border border-[#06231A] text-[#06231A] font-medium uppercase tracking-widest text-sm hover:bg-[#06231A] hover:text-white transition-colors"
                    >
                      Send Another
                    </button>
                  </div>
                ) : (
                  <>
                    <h2 className="text-2xl sm:text-3xl font-medium text-[#06231A] mb-8 tracking-tight">
                      Direct Inquiry
                    </h2>
                    
                    {error && (
                      <div className="mb-8 p-4 bg-red-50 border border-red-200 text-red-600 text-sm">
                        {error}
                      </div>
                    )}

                    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="flex flex-col gap-2">
                          <label className="text-xs font-mono font-bold text-[#0F4534] uppercase tracking-widest">
                            Full Name *
                          </label>
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full bg-white border border-[#E2DDD3] px-4 py-3 text-[#06231A] focus:outline-none focus:border-[#06231A] transition-colors"
                            placeholder="John Doe"
                            required
                            minLength={2}
                          />
                        </div>
                        <div className="flex flex-col gap-2">
                          <label className="text-xs font-mono font-bold text-[#0F4534] uppercase tracking-widest">
                            Email *
                          </label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full bg-white border border-[#E2DDD3] px-4 py-3 text-[#06231A] focus:outline-none focus:border-[#06231A] transition-colors"
                            placeholder="john@example.com"
                            required
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="flex flex-col gap-2">
                          <label className="text-xs font-mono font-bold text-[#0F4534] uppercase tracking-widest">
                            Company
                          </label>
                          <input
                            type="text"
                            name="company"
                            value={formData.company}
                            onChange={handleChange}
                            className="w-full bg-white border border-[#E2DDD3] px-4 py-3 text-[#06231A] focus:outline-none focus:border-[#06231A] transition-colors"
                            placeholder="Acme Corp"
                          />
                        </div>
                        <div className="flex flex-col gap-2">
                          <label className="text-xs font-mono font-bold text-[#0F4534] uppercase tracking-widest">
                            Phone
                          </label>
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full bg-white border border-[#E2DDD3] px-4 py-3 text-[#06231A] focus:outline-none focus:border-[#06231A] transition-colors"
                            placeholder="+1 (555) 000-0000"
                          />
                        </div>
                      </div>

                      <div className="flex flex-col gap-2">
                        <label className="text-xs font-mono font-bold text-[#0F4534] uppercase tracking-widest">
                          Subject *
                        </label>
                        <select
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          className="w-full bg-white border border-[#E2DDD3] px-4 py-3 text-[#06231A] focus:outline-none focus:border-[#06231A] transition-colors appearance-none cursor-pointer"
                          required
                        >
                          <option value="">Select a subject</option>
                          <option value="quote">Request a Product</option>
                          <option value="product">Product Inquiry</option>
                          <option value="support">Technical Support</option>
                          <option value="partnership">Partnership Opportunity</option>
                          <option value="other">Other</option>
                        </select>
                      </div>

                      <div className="flex flex-col gap-2">
                        <label className="text-xs font-mono font-bold text-[#0F4534] uppercase tracking-widest">
                          Message *
                        </label>
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          className="w-full bg-white border border-[#E2DDD3] px-4 py-3 text-[#06231A] focus:outline-none focus:border-[#06231A] transition-colors resize-y min-h-[160px]"
                          placeholder="How can we help you?"
                          required
                          minLength={10}
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="mt-4 w-full flex items-center justify-center gap-2 px-8 py-4 bg-[#06231A] border border-[#06231A] text-white font-medium uppercase tracking-widest text-sm hover:bg-[#0F4534] transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? (
                          <>
                            <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24" fill="none">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Sending...
                          </>
                        ) : (
                          'Send Message'
                        )}
                      </button>
                    </form>
                  </>
                )}
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
