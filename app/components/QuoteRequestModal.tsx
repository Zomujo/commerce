'use client';

import { useState, useEffect } from 'react';
import { ApiClient } from '@/lib/api-client';

interface QuoteRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  productName?: string;
  productId?: string;
}

export default function QuoteRequestModal({ isOpen, onClose, productName, productId }: QuoteRequestModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    product: productName || '',
    quantity: '',
    deliveryLocation: '',
    incoterms: '',
    preferredCurrency: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Sync productName prop into form when it changes
  useEffect(() => {
    setFormData(prev => ({ ...prev, product: productName || '' }));
  }, [productName]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    try {
      await ApiClient.submitQuote({
        name: formData.name,
        email: formData.email,
        company: formData.company,
        phone: formData.phone,
        ...(productId && { productId }),
        productName: formData.product,
        quantity: formData.quantity || undefined,
        deliveryLocation: formData.deliveryLocation || undefined,
        incoterms: formData.incoterms || undefined,
        preferredCurrency: formData.preferredCurrency || undefined,
        message: formData.message,
      });

      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        setFormData({ name: '', email: '', company: '', phone: '', product: '', quantity: '', deliveryLocation: '', incoterms: '', preferredCurrency: '', message: '' });
        onClose();
      }, 2000);
    } catch (err) {
      console.error('Quote submission failed:', err);
      setError(err instanceof Error ? err.message : 'Failed to submit product request. Please try again.');
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

  const InputLabel = ({ children }: { children: React.ReactNode }) => (
    <label className="block text-xs font-mono font-bold text-[#06231A] uppercase tracking-widest mb-2">
      {children}
    </label>
  );

  const inputClass = "w-full bg-[#F8F7F3] border border-[#E2DDD3] text-[#06231A] text-sm py-3 px-4 focus:outline-none focus:border-[#0F4534] transition-colors rounded-none";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#06231A]/80 backdrop-blur-sm animate-fade-in" onClick={onClose}>
      <div 
        className="bg-white w-full max-w-2xl border border-[#E2DDD3] shadow-2xl overflow-hidden animate-scale-in flex flex-col max-h-[90vh]" 
        onClick={(e) => e.stopPropagation()}
      >
        {isSuccess ? (
          <div className="p-16 text-center flex flex-col items-center justify-center">
            <div className="w-16 h-16 bg-[#E6FFE6] flex items-center justify-center mb-6">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#0F4534" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20,6 9,17 4,12" />
              </svg>
            </div>
            <h3 className="text-2xl font-medium text-[#06231A] mb-2 tracking-tight">
              Product Request Sent
            </h3>
            <p className="text-[#0F4534] font-light">
              We&apos;ll get back to you within 24 hours.
            </p>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="p-6 sm:p-8 border-b border-[#E2DDD3] flex items-start justify-between bg-[#F8F7F3]">
              <div>
                <h2 className="text-xl sm:text-2xl font-medium text-[#06231A] mb-1 tracking-tight">
                  Request a Product
                </h2>
                <p className="text-sm font-light text-[#0F4534]">
                  Fill out the form below and we&apos;ll respond within 24 hours.
                </p>
              </div>
              <button 
                onClick={onClose}
                className="w-8 h-8 flex items-center justify-center text-[#0F4534] hover:text-[#06231A] transition-colors"
                aria-label="Close"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Form */}
            <div className="overflow-y-auto p-6 sm:p-8 custom-scrollbar">
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                
                {/* Name & Email Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <InputLabel>Full Name *</InputLabel>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={inputClass}
                      placeholder="John Doe"
                      required
                    />
                  </div>
                  <div>
                    <InputLabel>Email *</InputLabel>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={inputClass}
                      placeholder="john@acmetrading.com"
                      required
                    />
                  </div>
                </div>

                {/* Company & Phone Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <InputLabel>Company</InputLabel>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className={inputClass}
                      placeholder="Acme Industrial Trading Ltd"
                    />
                  </div>
                  <div>
                    <InputLabel>Phone</InputLabel>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className={inputClass}
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                </div>

                {/* Product Interest */}
                <div>
                  <InputLabel>Product Interest</InputLabel>
                  <input
                    type="text"
                    name="product"
                    value={formData.product}
                    onChange={handleChange}
                    className={inputClass}
                    placeholder="e.g., Lithium Carbonate, Caustic Soda"
                  />
                </div>

                {/* Quantity & Delivery Location Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <InputLabel>Quantity</InputLabel>
                    <input
                      type="text"
                      name="quantity"
                      value={formData.quantity}
                      onChange={handleChange}
                      className={inputClass}
                      placeholder="e.g., 500 MT"
                    />
                  </div>
                  <div>
                    <InputLabel>Delivery Location</InputLabel>
                    <input
                      type="text"
                      name="deliveryLocation"
                      value={formData.deliveryLocation}
                      onChange={handleChange}
                      className={inputClass}
                      placeholder="e.g., Tema Port, Ghana"
                    />
                  </div>
                </div>

                {/* Incoterms & Currency Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <InputLabel>Incoterms</InputLabel>
                    <select
                      name="incoterms"
                      value={formData.incoterms}
                      onChange={handleChange}
                      className={inputClass}
                    >
                      <option value="">Select...</option>
                      <option value="EXW">EXW — Ex Works</option>
                      <option value="FOB">FOB — Free on Board</option>
                      <option value="CIF">CIF — Cost, Insurance & Freight</option>
                      <option value="CFR">CFR — Cost & Freight</option>
                      <option value="DDP">DDP — Delivered Duty Paid</option>
                      <option value="DAP">DAP — Delivered at Place</option>
                    </select>
                  </div>
                  <div>
                    <InputLabel>Preferred Currency</InputLabel>
                    <select
                      name="preferredCurrency"
                      value={formData.preferredCurrency}
                      onChange={handleChange}
                      className={inputClass}
                    >
                      <option value="">Select...</option>
                      <option value="USD">USD — US Dollar</option>
                      <option value="EUR">EUR — Euro</option>
                      <option value="GBP">GBP — British Pound</option>
                      <option value="GHS">GHS — Ghanaian Cedi</option>
                      <option value="NGN">NGN — Nigerian Naira</option>
                      <option value="ZAR">ZAR — South African Rand</option>
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <InputLabel>Additional Details</InputLabel>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className={inputClass}
                    rows={3}
                    placeholder="Any other requirements, certifications needed, timeline, etc."
                    style={{ resize: 'vertical' }}
                  />
                </div>

                {/* Error Message */}
                {error && (
                  <div className="p-4 bg-red-50 border border-red-200 text-red-600 text-sm">
                    {error}
                  </div>
                )}

                {/* Submit Button */}
                <div className="pt-4 mt-2 border-t border-[#E2DDD3]">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2 py-4 bg-[#06231A] text-white font-medium uppercase tracking-widest text-sm hover:bg-[#0F4534] transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="animate-spin">
                          <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                        </svg>
                        Sending...
                      </>
                    ) : (
                      <>
                        Submit Request
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M5 12h14" />
                          <path d="m12 5 7 7-7 7" />
                        </svg>
                      </>
                    )}
                  </button>
                </div>

              </form>
            </div>
          </>
        )}
      </div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #F8F7F3;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #E2DDD3;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #D4C9A8;
        }
      `}</style>
    </div>
  );
}
