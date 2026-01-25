'use client';

// Note: Assuming images are moved to public or accessible. 
// Using artifact paths for demonstration.

export default function TrustEngine() {
  const features = [
    {
      id: 'verified',
      title: 'Verified at Origin',
      description: 'Every supplier undergoes our 5-Point Onboarding Protocol, including physical site audits, financial solvency checks, and ESG compliance.',
      image: '/trust_verified_origin_1769367491709.png',
    },
    {
      id: 'qa',
      title: 'Third-Party QA',
      description: 'We integrate directly with SGS and Intertek. Every batch is issued a digital Certificate of Analysis (COA) before it leaves the port.',
      image: '/trust_quality_qa_1769367508001.png',
    },
    {
      id: 'logistics',
      title: 'Predictive Logistics',
      description: 'Our "Digital Freight" engine provides instant Incoterms-based pricing (FOB/CIF) and real-time container tracking.',
      image: '/trust_predictive_logistics_1769367527170.png',
    },
    {
      id: 'finance',
      title: 'Financial Security',
      description: 'Secure escrow and multi-currency payment rails (USD/EUR/GHS) to protect both the buyer’s capital and the seller’s production.',
      image: '/trust_financial_security_1769367546288.png',
    },
  ];

  return (
    <section className="section" style={{ background: 'var(--color-navy)', position: 'relative', overflow: 'hidden' }}>
      
      {/* Background Decor */}
      <div style={{
        position: 'absolute',
        inset: 0,
        opacity: 0.1,
        backgroundImage: 'radial-gradient(circle at 50% 50%, #ffffff 1px, transparent 1px)',
        backgroundSize: '40px 40px',
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 10 }}>
        <div style={{
          textAlign: 'center',
          marginBottom: '5rem',
        }}>
           <h2 style={{
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: 700,
            color: 'var(--color-white)',
            marginBottom: '1rem',
          }}>
            The WG Trade "Trust Engine"
          </h2>
          <p style={{
            fontSize: '1.25rem',
            color: 'rgba(255, 255, 255, 0.7)',
            maxWidth: '36rem',
            margin: '0 auto',
          }}>
            Solving the fragmentation of trust with a standardized process.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(1, 1fr)',
          gap: '4rem',
        }}>
          {features.map((feature, index) => (
            <div key={feature.id} style={{
              display: 'flex',
              flexDirection: index % 2 === 0 ? 'row' : 'row-reverse',
              alignItems: 'center',
              gap: '4rem',
              flexWrap: 'wrap',
            }} className="feature-row">
              
              {/* Image Side */}
              <div style={{
                flex: '1 1 400px',
                position: 'relative',
              }}>
                <div style={{
                  position: 'relative',
                  width: '100%',
                  aspectRatio: '16/9',
                  borderRadius: '1rem',
                  overflow: 'hidden',
                  background: 'var(--color-navy-light)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                }}>
                   <div style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundImage: `url(${feature.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }} />
                  {/* Overlay for glass effect */}
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(120deg, rgba(255, 255, 255, 0.1) 0%, transparent 40%)',
                  }} />
                </div>
                {/* Decorative Elements */}
                <div style={{
                  position: 'absolute',
                  top: '-1rem',
                  left: index % 2 === 0 ? '-1rem' : 'auto',
                  right: index % 2 === 0 ? 'auto' : '-1rem',
                  width: '80%',
                  height: '80%',
                  border: '1px solid var(--primary)',
                  opacity: 0.3,
                  borderRadius: '1rem',
                  zIndex: -1,
                }} />
              </div>

              {/* Content Side */}
              <div style={{
                flex: '1 1 400px',
                textAlign: index % 2 === 0 ? 'left' : 'left', // Keep text left aligned for readability usually, but visual flow follows
              }}>
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '3rem',
                  height: '3rem',
                  borderRadius: '50%',
                  background: 'rgba(255, 255, 255, 0.1)',
                  color: 'var(--primary)',
                  marginBottom: '1.5rem',
                  fontSize: '1.25rem',
                  fontWeight: 700,
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                }}>
                  {index + 1}
                </div>
                
                <h3 style={{
                  fontSize: '2rem',
                  fontWeight: 700,
                  color: 'var(--color-white)',
                  marginBottom: '1rem',
                }}>
                  {feature.title}
                </h3>
                
                <p style={{
                  fontSize: '1.125rem',
                  color: 'rgba(255, 255, 255, 0.7)',
                  lineHeight: 1.8,
                }}>
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
