'use client';

import { useState } from 'react';

interface QuoteRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  productName?: string;
}

export default function QuoteRequestModal({ isOpen, onClose, productName }: QuoteRequestModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    product: productName || '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSuccess(true);
    
    // Reset after showing success
    setTimeout(() => {
      setIsSuccess(false);
      setFormData({ name: '', email: '', company: '', phone: '', product: '', message: '' });
      onClose();
    }, 2000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="modal-overlay animate-fade-in" onClick={onClose}>
      <div 
        className="modal-content animate-scale-in" 
        onClick={(e) => e.stopPropagation()}
      >
        {isSuccess ? (
          <div style={{
            padding: '3rem',
            textAlign: 'center',
          }}>
            <div style={{
              width: '4rem',
              height: '4rem',
              borderRadius: '50%',
              background: 'rgba(16, 185, 129, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.5rem',
            }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--color-success)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20,6 9,17 4,12" />
              </svg>
            </div>
            <h3 style={{
              fontSize: '1.25rem',
              fontWeight: 600,
              color: 'var(--color-navy)',
              marginBottom: '0.5rem',
            }}>
              Quote Request Sent!
            </h3>
            <p style={{
              color: 'var(--color-gray-500)',
              fontSize: '0.9375rem',
            }}>
              We&apos;ll get back to you within 24 hours.
            </p>
          </div>
        ) : (
          <>
            {/* Header */}
            <div style={{
              padding: '1.5rem',
              borderBottom: '1px solid var(--color-gray-200)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
              <div>
                <h2 style={{
                  fontSize: '1.25rem',
                  fontWeight: 600,
                  color: 'var(--color-navy)',
                  marginBottom: '0.25rem',
                }}>
                  Request a Quote
                </h2>
                <p style={{
                  fontSize: '0.875rem',
                  color: 'var(--color-gray-500)',
                }}>
                  Fill out the form below and we&apos;ll respond within 24 hours.
                </p>
              </div>
              <button 
                onClick={onClose}
                style={{
                  width: '2rem',
                  height: '2rem',
                  borderRadius: '0.5rem',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-gray-400)" strokeWidth="2" strokeLinecap="round">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} style={{ padding: '1.5rem' }}>
              <div style={{
                display: 'grid',
                gap: '1rem',
              }}>
                {/* Name & Email Row */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '1rem',
                }} className="form-row">
                  <div>
                    <label style={{
                      display: 'block',
                      fontSize: '0.875rem',
                      fontWeight: 500,
                      color: 'var(--color-navy)',
                      marginBottom: '0.5rem',
                    }}>
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="input"
                      placeholder="John Doe"
                      required
                    />
                  </div>
                  <div>
                    <label style={{
                      display: 'block',
                      fontSize: '0.875rem',
                      fontWeight: 500,
                      color: 'var(--color-navy)',
                      marginBottom: '0.5rem',
                    }}>
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="input"
                      placeholder="john@hospital.com"
                      required
                    />
                  </div>
                </div>

                {/* Company & Phone Row */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '1rem',
                }} className="form-row">
                  <div>
                    <label style={{
                      display: 'block',
                      fontSize: '0.875rem',
                      fontWeight: 500,
                      color: 'var(--color-navy)',
                      marginBottom: '0.5rem',
                    }}>
                      Company / Hospital
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="input"
                      placeholder="Metro Medical Center"
                    />
                  </div>
                  <div>
                    <label style={{
                      display: 'block',
                      fontSize: '0.875rem',
                      fontWeight: 500,
                      color: 'var(--color-navy)',
                      marginBottom: '0.5rem',
                    }}>
                      Phone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="input"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                </div>

                {/* Product Interest */}
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    color: 'var(--color-navy)',
                    marginBottom: '0.5rem',
                  }}>
                    Product Interest
                  </label>
                  <input
                    type="text"
                    name="product"
                    value={formData.product}
                    onChange={handleChange}
                    className="input"
                    placeholder="e.g., Digital Ultrasound System"
                  />
                </div>

                {/* Message */}
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    color: 'var(--color-navy)',
                    marginBottom: '0.5rem',
                  }}>
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="input"
                    rows={4}
                    placeholder="Tell us about your requirements, quantity needed, timeline, etc."
                    style={{ resize: 'vertical' }}
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-primary"
                style={{
                  width: '100%',
                  marginTop: '1.5rem',
                  height: '3rem',
                  opacity: isSubmitting ? 0.7 : 1,
                }}
              >
                {isSubmitting ? (
                  <>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{
                      animation: 'spin 1s linear infinite',
                    }}>
                      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                    </svg>
                    Sending...
                  </>
                ) : (
                  <>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
                    </svg>
                    Submit Quote Request
                  </>
                )}
              </button>
            </form>

            <style jsx global>{`
              @keyframes spin {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
              }
              @media (max-width: 480px) {
                .form-row {
                  grid-template-columns: 1fr !important;
                }
              }
            `}</style>
          </>
        )}
      </div>
    </div>
  );
}
