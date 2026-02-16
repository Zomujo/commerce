'use client';

import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { ApiClient } from '@/lib/api-client';
import { ContactSubject } from '@/types/api';

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
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />

      <main style={{ flex: 1 }}>
        {/* Page Header */}
        <section style={{
          background: 'linear-gradient(180deg, var(--color-gray-50) 0%, var(--color-white) 100%)',
          padding: '4rem 0',
          textAlign: 'center',
        }}>
          <div className="container">
            <span className="badge badge-blue" style={{ marginBottom: '0.75rem' }}>
              Get in Touch
            </span>
            <h1 style={{
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 700,
              color: 'var(--color-navy)',
              marginBottom: '1rem',
            }}>
              Contact Us
            </h1>
            <p style={{
              fontSize: '1.125rem',
              color: 'var(--color-gray-500)',
              maxWidth: '32rem',
              margin: '0 auto',
            }}>
              Have questions? Our team is here to help you source the right chemicals and raw materials.
            </p>
          </div>
        </section>

        {/* Contact Content */}
        <section className="section">
          <div className="container">
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr',
              gap: '3rem',
              maxWidth: '72rem',
              margin: '0 auto',
            }} className="contact-grid">
              {/* Contact Info */}
              <div>
                <h2 style={{
                  fontSize: '1.5rem',
                  fontWeight: 700,
                  color: 'var(--color-navy)',
                  marginBottom: '1.5rem',
                }}>
                  Contact Information
                </h2>
                
                <div style={{
                  display: 'grid',
                  gap: '1.5rem',
                }}>
                  {[
                    {
                      icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
                      label: 'Email',
                      value: 'sales@medprocure.com',
                      href: 'mailto:sales@medprocure.com',
                    },
                    {
                      icon: 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z',
                      label: 'Phone',
                      value: '+1 (800) 555-0123',
                      href: 'tel:+18005550123',
                    },
                    {
                      icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z',
                      label: 'Address',
                      value: '123 Medical Drive, Suite 100\nSan Francisco, CA 94102',
                    },
                  ].map((contact, index) => (
                    <div key={index} style={{
                      display: 'flex',
                      gap: '1rem',
                      padding: '1.25rem',
                      background: 'var(--color-gray-50)',
                      borderRadius: '0.75rem',
                    }}>
                      <div style={{
                        width: '2.75rem',
                        height: '2.75rem',
                        borderRadius: '0.5rem',
                        background: 'linear-gradient(135deg, rgba(0, 102, 204, 0.1) 0%, rgba(0, 163, 163, 0.1) 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-blue)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d={contact.icon} />
                        </svg>
                      </div>
                      <div>
                        <div style={{
                          fontSize: '0.8125rem',
                          fontWeight: 500,
                          color: 'var(--color-gray-500)',
                          marginBottom: '0.25rem',
                        }}>
                          {contact.label}
                        </div>
                        {contact.href ? (
                          <a href={contact.href} style={{
                            fontSize: '0.9375rem',
                            color: 'var(--color-navy)',
                            textDecoration: 'none',
                            fontWeight: 500,
                          }}>
                            {contact.value}
                          </a>
                        ) : (
                          <div style={{
                            fontSize: '0.9375rem',
                            color: 'var(--color-navy)',
                            whiteSpace: 'pre-line',
                            lineHeight: 1.5,
                          }}>
                            {contact.value}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Office Hours */}
                <div style={{ marginTop: '2rem' }}>
                  <h3 style={{
                    fontSize: '1rem',
                    fontWeight: 600,
                    color: 'var(--color-navy)',
                    marginBottom: '0.75rem',
                  }}>
                    Business Hours
                  </h3>
                  <div style={{
                    fontSize: '0.9375rem',
                    color: 'var(--color-gray-600)',
                    lineHeight: 1.8,
                  }}>
                    <div>Monday - Friday: 9:00 AM - 6:00 PM EST</div>
                    <div>Saturday: 10:00 AM - 2:00 PM EST</div>
                    <div>Sunday: Closed</div>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div style={{
                background: 'var(--color-white)',
                borderRadius: '1rem',
                border: '1px solid var(--color-gray-200)',
                padding: '2rem',
              }}>
                {isSuccess ? (
                  <div style={{
                    textAlign: 'center',
                    padding: '3rem 2rem',
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
                      Message Sent!
                    </h3>
                    <p style={{
                      color: 'var(--color-gray-500)',
                      fontSize: '0.9375rem',
                      marginBottom: '1.5rem',
                    }}>
                      Thank you for reaching out. We&apos;ll get back to you within 24 hours.
                    </p>
                    <button 
                      onClick={() => {
                        setIsSuccess(false);
                      }}
                      className="btn btn-secondary"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <>
                    <h2 style={{
                      fontSize: '1.25rem',
                      fontWeight: 600,
                      color: 'var(--color-navy)',
                      marginBottom: '1.5rem',
                    }}>
                      Send us a Message
                    </h2>
                    
                    {error && (
                      <div style={{
                        marginBottom: '1.5rem',
                        padding: '0.75rem 1rem',
                        background: 'rgba(239, 68, 68, 0.1)',
                        border: '1px solid rgba(239, 68, 68, 0.2)',
                        borderRadius: '0.5rem',
                        color: '#dc2626',
                        fontSize: '0.875rem',
                      }}>
                        {error}
                      </div>
                    )}

                    <form onSubmit={handleSubmit}>
                      <div style={{
                        display: 'grid',
                        gap: '1rem',
                      }}>
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
                              minLength={2}
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

                        <div>
                          <label style={{
                            display: 'block',
                            fontSize: '0.875rem',
                            fontWeight: 500,
                            color: 'var(--color-navy)',
                            marginBottom: '0.5rem',
                            }}>
                            Subject *
                          </label>
                          <select
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            className="input"
                            required
                            style={{ cursor: 'pointer' }}
                          >
                            <option value="">Select a subject</option>
                            <option value="quote">Request a Quote</option>
                            <option value="product">Product Inquiry</option>
                            <option value="support">Technical Support</option>
                            <option value="partnership">Partnership Opportunity</option>
                            <option value="other">Other</option>
                          </select>
                        </div>

                        <div>
                          <label style={{
                            display: 'block',
                            fontSize: '0.875rem',
                            fontWeight: 500,
                            color: 'var(--color-navy)',
                            marginBottom: '0.5rem',
                          }}>
                            Message *
                          </label>
                          <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            className="input"
                            rows={5}
                            placeholder="How can we help you? (Minimum 10 characters)"
                            required
                            minLength={10}
                            style={{ resize: 'vertical' }}
                          />
                        </div>
                      </div>

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
                            Send Message
                          </>
                        )}
                      </button>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </section>

        <style jsx global>{`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          @media (min-width: 1024px) {
            .contact-grid {
              grid-template-columns: 1fr 1.5fr !important;
            }
          }
          @media (max-width: 480px) {
            .form-row {
              grid-template-columns: 1fr !important;
            }
          }
        `}</style>
      </main>

      <Footer />
    </div>
  );
}
