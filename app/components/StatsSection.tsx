'use client';

interface StatsSectionProps {
  stats: Array<{
    value: string;
    label: string;
  }>;
}

export default function StatsSection({ stats }: StatsSectionProps) {
  return (
    <section style={{
      background: 'var(--color-navy)',
      padding: '4rem 0',
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '2rem',
        }} className="stats-grid">
          {stats.map((stat, index) => (
            <div 
              key={index}
              style={{
                textAlign: 'center',
                padding: '1rem',
              }}
            >
              <div style={{
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                fontWeight: 700,
                color: 'var(--color-white)',
                marginBottom: '0.5rem',
                background: 'linear-gradient(135deg, var(--color-white) 0%, var(--color-teal-light) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                {stat.value}
              </div>
              <div style={{
                fontSize: '0.9375rem',
                color: 'var(--color-gray-400)',
                fontWeight: 500,
              }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx global>{`
        @media (min-width: 768px) {
          .stats-grid {
            grid-template-columns: repeat(4, 1fr) !important;
          }
        }
      `}</style>
    </section>
  );
}
