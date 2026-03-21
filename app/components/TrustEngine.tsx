'use client';

import type { ReactNode } from 'react';

type TrustLane = {
  id: string;
  title: string;
  subtitle: string;
  detail: string;
  stat: string;
  icon: ReactNode;
};

export default function TrustEngine() {
  const lanes: TrustLane[] = [
    {
      id: 'verified',
      title: 'Verified at Origin',
      subtitle: 'Supplier intake and on-site validation',
      detail:
        'Physical audits, compliance checks, and financial diligence before any supplier enters active sourcing pools.',
      stat: '5-point onboarding protocol',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2l7 4v6c0 5-3.4 8.7-7 10-3.6-1.3-7-5-7-10V6l7-4z" />
          <path d="M9 12l2 2 4-4" />
        </svg>
      ),
    },
    {
      id: 'qa',
      title: 'Third-Party QA',
      subtitle: 'Independent batch certification',
      detail:
        'COAs are issued by trusted labs and linked to each shipment before cargo release, not after disputes happen.',
      stat: 'Pre-shipment COA issuance',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
          <path d="M7 3h10" />
          <path d="M9 3v6" />
          <path d="M15 3v6" />
          <path d="M8 9l-4 7a4 4 0 0 0 3.5 6h9a4 4 0 0 0 3.5-6l-4-7" />
          <path d="M9 14h6" />
        </svg>
      ),
    },
    {
      id: 'logistics',
      title: 'Predictive Logistics',
      subtitle: 'Route and timeline intelligence',
      detail:
        'Incoterm-aware planning with live movement milestones, reducing schedule variance for procurement teams.',
      stat: 'FOB/CIF forecast tracking',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 7h11v9H3z" />
          <path d="M14 10h4l3 3v3h-7z" />
          <circle cx="7" cy="18" r="2" />
          <circle cx="17" cy="18" r="2" />
        </svg>
      ),
    },
    {
      id: 'finance',
      title: 'Financial Security',
      subtitle: 'Transaction risk protection',
      detail:
        'Escrow-backed settlement and multi-currency controls protect buyer capital and supplier delivery confidence.',
      stat: 'Escrow + multi-currency rails',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="5" width="20" height="14" rx="2" />
          <path d="M2 10h20" />
          <path d="M7 15h3" />
          <path d="M15.5 13.5c.3-.5.9-.8 1.5-.8.9 0 1.7.7 1.7 1.6 0 1.2-.9 1.8-1.7 1.8-.6 0-1.2-.3-1.5-.8" />
        </svg>
      ),
    },
  ];

  return (
    <section
      className="section"
      style={{
        position: 'relative',
        overflow: 'hidden',
        background:
          'radial-gradient(circle at 12% 8%, rgba(29, 201, 98, 0.2) 0%, rgba(29, 201, 98, 0) 34%), radial-gradient(circle at 90% 86%, rgba(249, 115, 22, 0.13) 0%, rgba(249, 115, 22, 0) 30%), linear-gradient(180deg, #0c1a12 0%, #102118 100%)',
      }}
    >
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.2,
          backgroundImage:
            'linear-gradient(to right, rgba(255,255,255,0.07) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.07) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
          pointerEvents: 'none',
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <div style={{ textAlign: 'center', marginBottom: 'clamp(1.8rem, 5vw, 2.75rem)' }}>
          <p
            style={{
              fontSize: '0.78rem',
              fontWeight: 700,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.75)',
              marginBottom: '0.95rem',
            }}
          >
            Procurement Confidence System
          </p>
          <h2
            style={{
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 800,
              color: 'var(--color-white)',
              letterSpacing: '-0.03em',
              lineHeight: 1.12,
              marginBottom: '0.95rem',
            }}
          >
            The WG Trade Trust Engine
          </h2>
          <p
            style={{
              fontSize: '1.08rem',
              color: 'rgba(255,255,255,0.74)',
              maxWidth: '44rem',
              margin: '0 auto',
              lineHeight: 1.7,
            }}
          >
            Solving the fragmentation of trust with one standardized, lane-based process from supplier onboarding to settlement.
          </p>
        </div>

        <div
          style={{
            border: '1px solid rgba(255,255,255,0.14)',
            borderRadius: '1.35rem',
            background: 'linear-gradient(180deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
            backdropFilter: 'blur(8px)',
            boxShadow: '0 24px 60px rgba(0, 0, 0, 0.26)',
            padding: 'clamp(1rem, 3vw, 1.5rem)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div
            aria-hidden
            style={{
              position: 'absolute',
              left: '-18%',
              top: '-42%',
              width: '50%',
              height: '130%',
              background: 'linear-gradient(120deg, rgba(29, 201, 98, 0.24) 0%, rgba(29, 201, 98, 0) 70%)',
            }}
          />

          <div className="trust-lanes-wrap" style={{ position: 'relative', zIndex: 2 }}>
            {lanes.map((lane, index) => (
              <div key={lane.id} className="trust-lane" style={{ position: 'relative' }}>
                <div
                  className="trust-lane-line"
                  style={{
                    position: 'absolute',
                    left: '1.15rem',
                    top: '3.2rem',
                    bottom: '-1rem',
                    width: '2px',
                    background:
                      index === lanes.length - 1
                        ? 'transparent'
                        : 'linear-gradient(180deg, rgba(29,201,98,0.5) 0%, rgba(29,201,98,0.05) 100%)',
                  }}
                />

                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '2.3rem 1fr auto',
                    alignItems: 'start',
                    gap: '0.9rem',
                    borderRadius: '1rem',
                    padding: '0.9rem',
                    transition: 'background 0.3s ease, transform 0.3s ease',
                  }}
                  className="trust-lane-inner"
                >
                  <div
                    style={{
                      width: '2.3rem',
                      height: '2.3rem',
                      borderRadius: '0.7rem',
                      border: '1px solid rgba(255,255,255,0.2)',
                      display: 'grid',
                      placeItems: 'center',
                      color: '#f0fff6',
                      background: 'linear-gradient(145deg, rgba(29, 201, 98, 0.35) 0%, rgba(29, 201, 98, 0.1) 100%)',
                      boxShadow: '0 0 0 1px rgba(29, 201, 98, 0.35), 0 0 20px rgba(29, 201, 98, 0.2)',
                    }}
                  >
                    {lane.icon}
                  </div>

                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.25rem' }}>
                      <h3
                        style={{
                          fontSize: '1.05rem',
                          fontWeight: 700,
                          color: 'var(--color-white)',
                          lineHeight: 1.25,
                        }}
                      >
                        {lane.title}
                      </h3>
                      <span
                        style={{
                          fontSize: '0.72rem',
                          fontWeight: 700,
                          letterSpacing: '0.08em',
                          color: 'rgba(255,255,255,0.62)',
                        }}
                      >
                        0{index + 1}
                      </span>
                    </div>
                    <p
                      style={{
                        fontSize: '0.86rem',
                        color: 'rgba(232, 255, 241, 0.8)',
                        marginBottom: '0.35rem',
                      }}
                    >
                      {lane.subtitle}
                    </p>
                    <p
                      style={{
                        fontSize: '0.92rem',
                        color: 'rgba(255,255,255,0.72)',
                        lineHeight: 1.62,
                        maxWidth: '42rem',
                      }}
                    >
                      {lane.detail}
                    </p>
                  </div>

                  <div className="trust-stat-meta">
                    <span className="trust-stat-label">Control</span>
                    <span className="trust-stat-value">{lane.stat}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .trust-lanes-wrap {
          display: grid;
          gap: 0.3rem;
        }

        .trust-lane-inner:hover {
          background: rgba(255, 255, 255, 0.06);
          transform: translateX(4px);
        }

        .trust-stat-meta {
          align-self: center;
          justify-self: end;
          min-width: 12.5rem;
          padding-left: 0.9rem;
          border-left: 2px solid rgba(29, 201, 98, 0.55);
          display: grid;
          gap: 0.22rem;
          text-align: left;
        }

        .trust-stat-label {
          font-size: 0.64rem;
          font-weight: 800;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.56);
        }

        .trust-stat-value {
          font-size: 0.82rem;
          font-weight: 600;
          color: rgba(233, 255, 243, 0.92);
          line-height: 1.35;
        }

        @media (max-width: 900px) {
          .trust-lane-inner {
            grid-template-columns: 2.3rem 1fr !important;
          }

          .trust-stat-meta {
            grid-column: 2;
            justify-self: start;
            margin-top: 0.65rem;
            min-width: 0;
          }
        }
      `}</style>
    </section>
  );
}
