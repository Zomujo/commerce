'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { ApiClient } from '@/lib/api-client';
import { QuoteRequest } from '@/types/api';

const statusColor: Record<string, { bg: string; text: string; dot: string }> = {
  PENDING:  { bg: 'rgba(245,158,11,0.1)', text: '#b45309', dot: '#f59e0b' },
  REVIEWED: { bg: 'rgba(59,130,246,0.1)', text: '#1d4ed8', dot: '#3b82f6' },
  QUOTED:   { bg: 'rgba(16,185,129,0.1)', text: '#047857', dot: '#10b981' },
  REJECTED: { bg: 'rgba(239,68,68,0.1)',  text: '#b91c1c', dot: '#ef4444' },
};

export default function QuoteLookupPage() {
  const params = useParams();
  const id = params.id as string;

  const [quote, setQuote] = useState<QuoteRequest | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    ApiClient.getPublicQuoteById(id)
      .then(setQuote)
      .catch(() => setNotFound(true))
      .finally(() => setIsLoading(false));
  }, [id]);

  const fmt = (d: string) => new Date(d).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <main style={{ flex: 1, background: 'var(--color-gray-50)', padding: '4rem 0' }}>
        <div className="container" style={{ maxWidth: '640px' }}>
          {isLoading ? (
            <p style={{ textAlign: 'center', color: 'var(--color-gray-500)' }}>Loading your quote...</p>
          ) : notFound || !quote ? (
            <div style={{ textAlign: 'center' }}>
              <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-navy)', marginBottom: '0.75rem' }}>Quote Not Found</h1>
              <p style={{ color: 'var(--color-gray-500)', marginBottom: '1.5rem' }}>The quote reference you entered doesn't exist or has been removed.</p>
              <Link href="/contact" className="btn btn-primary">Contact Support</Link>
            </div>
          ) : (
            <>
              <div style={{ marginBottom: '1.5rem' }}>
                <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.375rem', fontSize: '0.875rem', color: 'var(--color-gray-500)', textDecoration: 'none' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="15 18 9 12 15 6"/></svg>
                  Home
                </Link>
              </div>

              <div style={{ background: 'var(--color-white)', borderRadius: '1rem', border: '1px solid var(--color-gray-200)', overflow: 'hidden' }}>
                {/* Header */}
                <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--color-gray-100)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    <h1 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-navy)' }}>Quote Request</h1>
                    <p style={{ fontSize: '0.8125rem', color: 'var(--color-gray-400)', marginTop: '0.25rem' }}>Submitted {fmt(quote.createdAt)}</p>
                  </div>
                  {(() => {
                    const s = statusColor[quote.status] || statusColor.PENDING;
                    return (
                      <span style={{
                        display: 'inline-flex', alignItems: 'center', gap: '0.375rem',
                        padding: '0.375rem 0.875rem', borderRadius: '9999px',
                        background: s.bg, color: s.text, fontSize: '0.8125rem', fontWeight: 600,
                      }}>
                        <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: s.dot, display: 'inline-block' }} />
                        {quote.status}
                      </span>
                    );
                  })()}
                </div>

                {/* Contact */}
                <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid var(--color-gray-100)' }}>
                  <p style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-gray-400)', marginBottom: '0.75rem' }}>Contact</p>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                    {[['Name', quote.name], ['Email', quote.email], ['Company', quote.company || '—'], ['Phone', quote.phone || '—']].map(([l, v]) => (
                      <div key={l}>
                        <p style={{ fontSize: '0.75rem', color: 'var(--color-gray-400)', marginBottom: '0.125rem' }}>{l}</p>
                        <p style={{ fontSize: '0.9375rem', color: 'var(--color-navy)', fontWeight: 500 }}>{v}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Product */}
                <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid var(--color-gray-100)' }}>
                  <p style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-gray-400)', marginBottom: '0.75rem' }}>Product Interest</p>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                    {[
                      ['Product', quote.productName || quote.product?.name || '—'],
                      ['Quantity', quote.quantity || '—'],
                      ['Delivery', quote.deliveryLocation || '—'],
                      ['Incoterms', quote.incoterms || '—'],
                    ].map(([l, v]) => (
                      <div key={l}>
                        <p style={{ fontSize: '0.75rem', color: 'var(--color-gray-400)', marginBottom: '0.125rem' }}>{l}</p>
                        <p style={{ fontSize: '0.9375rem', color: 'var(--color-navy)', fontWeight: 500 }}>{v}</p>
                      </div>
                    ))}
                  </div>
                  {quote.message && (
                    <div style={{ marginTop: '0.75rem' }}>
                      <p style={{ fontSize: '0.75rem', color: 'var(--color-gray-400)', marginBottom: '0.25rem' }}>Message</p>
                      <p style={{ fontSize: '0.9375rem', color: 'var(--color-gray-600)', lineHeight: 1.6, background: 'var(--color-gray-50)', borderRadius: '0.5rem', padding: '0.75rem' }}>{quote.message}</p>
                    </div>
                  )}
                </div>

                {/* Footer CTA */}
                <div style={{ padding: '1.25rem 1.5rem', background: 'var(--color-gray-50)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <p style={{ fontSize: '0.875rem', color: 'var(--color-gray-500)' }}>Questions? Contact our team.</p>
                  <Link href="/contact" className="btn btn-secondary" style={{ padding: '0.5rem 1.25rem', fontSize: '0.875rem' }}>Contact Us</Link>
                </div>
              </div>
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
