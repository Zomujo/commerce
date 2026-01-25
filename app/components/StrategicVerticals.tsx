'use client';

// Note: In a real Next.js app, we would import Image from 'next/image'. 
// For this environment, we are using standard img tags with absolute paths functionality.
// We will assume the images will be moved to the public folder or are accessible.
// For now, I will use the path logic but since these are artifacts, I will use a placeholder
// or assume the user will place them.
// To make it work immediately for the user review, I'll use the file paths if possible or relative if in public.
// Since I can't move files to public easily without a shell script, I will use the artifact paths 
// but in a real app they should be in /public.
// I will assume for the demo that these are available at the URLs provided by the artiact system 
// or I will use a simple accessible path if I had moved them.
// Given strict instructions, I will generate the code to use the images assuming they are 
// accessible (e.g. copied to public).

export default function StrategicVerticals() {
  const verticals = [
    {
      id: 'transition-materials',
      title: 'Critical Transition Materials',
      subtitle: 'The Future of Energy',
      description: 'A direct pipeline to Africa’s most vital battery minerals. We supply Lithium (Battery-grade), Cobalt, Graphite, and High-Purity Copper.',
      edge: 'Ethical sourcing protocols and blockchain-backed traceability for the global EV and tech manufacturing sectors.',
      // Using the artifact path (in a real app this would be /images/vertical_transition_materials.png)
      // For this demo, I will point to where I saved them, asking user to move them.
      image: '/vertical_transition_materials_1769367428971.png', 
    },
    {
      id: 'industrial-chemicals',
      title: 'Industrial Chemicals',
      subtitle: 'Consistency at Scale',
      description: 'High-purity chemical inputs for global production lines. From Caustic Soda and Ethanol to Sulfuric Acid and Urea.',
      edge: 'Curated networks of producers meeting rigorous ISO 9001 and REACH (EU) standards for textiles, pharma, and industrial synthesis.',
      image: '/vertical_industrial_chemicals_1769367454987.png',
    },
    {
      id: 'bulk-raw-materials',
      title: 'Bulk Raw Materials',
      subtitle: 'The Building Blocks',
      description: 'Optimized supply chains for Bauxite, Iron Ore, Manganese, and Industrial Gypsum.',
      edge: 'Direct-from-mine logistics that eliminate middlemen markups and guarantee volume reliability for global ports.',
      image: '/vertical_bulk_raw_materials_1769367470776.png',
    },
  ];

  return (
    <section className="section">
      <div className="container">
        <div style={{
          textAlign: 'center',
          marginBottom: '4rem',
        }}>
          <h2 style={{
            fontSize: 'clamp(2rem, 4vw, 2.75rem)',
            fontWeight: 700,
            color: 'var(--color-navy)',
            marginBottom: '1rem',
          }}>
            Strategic Verticals
          </h2>
          <p style={{
            fontSize: '1.125rem',
            color: 'var(--color-gray-500)',
            maxWidth: '36rem',
            margin: '0 auto',
          }}>
            Organized to show specialized expertise across different industrial tiers.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: '2.5rem',
          alignItems: 'stretch',
        }}>
          {verticals.map((vertical) => (
            <div key={vertical.id} className="group" style={{
              position: 'relative',
              borderRadius: '1.5rem',
              overflow: 'hidden',
              background: 'var(--color-white)',
              border: '1px solid var(--color-gray-200)',
              display: 'flex',
              flexDirection: 'column',
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            }}>
              {/* Image Container */}
              <div style={{
                position: 'relative',
                height: '240px',
                overflow: 'hidden',
              }}>
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  backgroundImage: `url(${vertical.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  transition: 'transform 0.6s ease',
                }} className="vertical-image" />
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to bottom, transparent 0%, rgba(17, 33, 23, 0.4) 100%)',
                }} />
              </div>

              {/* Content */}
              <div style={{
                padding: '2rem',
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
              }}>
                 <p style={{
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  color: 'var(--primary)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  marginBottom: '0.5rem',
                }}>
                  {vertical.subtitle}
                </p>
                
                <h3 style={{
                  fontSize: '1.75rem',
                  fontWeight: 700,
                  color: 'var(--color-navy)',
                  marginBottom: '1rem',
                  lineHeight: 1.2,
                }}>
                  {vertical.title}
                </h3>
                
                <p style={{
                  fontSize: '1rem',
                  color: 'var(--color-gray-600)',
                  marginBottom: '2rem',
                  lineHeight: 1.6,
                }}>
                  {vertical.description}
                </p>
                
                <div style={{
                  marginTop: 'auto',
                  paddingTop: '1.5rem',
                  borderTop: '1px solid var(--color-gray-100)',
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '0.75rem',
                  }}>
                    <span style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '1.5rem',
                      height: '1.5rem',
                      borderRadius: '50%',
                      background: 'var(--primary-100)',
                      color: 'var(--primary)',
                      flexShrink: 0,
                    }}>
                       <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                    </span>
                    <div>
                      <strong style={{
                        display: 'block',
                        fontSize: '0.875rem',
                        color: 'var(--color-navy)',
                        marginBottom: '0.25rem',
                      }}>
                        The Edge
                      </strong>
                      <p style={{
                        fontSize: '0.875rem',
                        color: 'var(--color-gray-500)',
                        lineHeight: 1.5,
                      }}>
                        {vertical.edge}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <style jsx>{`
                .group:hover {
                  transform: translateY(-8px);
                  box-shadow: var(--shadow-xl);
                  border-color: var(--primary);
                }
                .group:hover .vertical-image {
                  transform: scale(1.1);
                }
              `}</style>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
