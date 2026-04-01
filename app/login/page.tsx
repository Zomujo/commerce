'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function LoginChoicePage() {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(160deg, #f8fafc 0%, #eef6ff 50%, #f3faf9 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1.5rem',
    }}>
      <main style={{
        width: '100%',
        maxWidth: '860px',
      }}>
        <div style={{
          width: '100%',
          background: 'var(--color-white)',
          border: '1px solid var(--color-gray-200)',
          borderRadius: '1.25rem',
          padding: '1.75rem',
          boxShadow: '0 20px 40px rgba(15, 23, 42, 0.08)',
        }}>
          <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
            <Link href="/" style={{
              display: 'inline-flex',
              alignItems: 'center',
              textDecoration: 'none',
              marginBottom: '0.85rem',
              color: 'var(--color-navy)',
              fontWeight: 700,
            }}>
              <Image src="/logo.png" alt="WG Trade" width={353} height={345} className="h-9 w-auto" priority />
            </Link>
            <h1 style={{ fontSize: 'clamp(1.5rem, 2.8vw, 1.9rem)', fontWeight: 700, color: 'var(--color-navy)' }}>Sign In</h1>
            <p style={{ color: 'var(--color-gray-500)', marginTop: '0.25rem' }}>Select the portal you want to access</p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '1rem',
          }}>
            <Link href="/supplier/login" style={{
              border: '1px solid var(--color-gray-200)',
              borderRadius: '0.875rem',
              padding: '1rem 1rem 1.1rem',
              textDecoration: 'none',
              color: 'inherit',
              transition: 'all 0.2s ease',
              background: 'linear-gradient(180deg, #ffffff 0%, #f8fffc 100%)',
            }}>
              <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--color-navy)' }}>Supplier Portal</div>
              <p style={{ fontSize: '0.875rem', color: 'var(--color-gray-500)', marginTop: '0.35rem', lineHeight: 1.5 }}>
                Manage your supplier profile, products, and certificates of analysis.
              </p>
              <span style={{ display: 'inline-block', marginTop: '0.7rem', fontSize: '0.8125rem', fontWeight: 600, color: 'var(--color-teal)' }}>
                Continue as supplier &rarr;
              </span>
            </Link>

            <Link href="/admin/login" style={{
              border: '1px solid var(--color-gray-200)',
              borderRadius: '0.875rem',
              padding: '1rem 1rem 1.1rem',
              textDecoration: 'none',
              color: 'inherit',
              transition: 'all 0.2s ease',
              background: 'linear-gradient(180deg, #ffffff 0%, #f6f9ff 100%)',
            }}>
              <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--color-navy)' }}>Admin Portal</div>
              <p style={{ fontSize: '0.875rem', color: 'var(--color-gray-500)', marginTop: '0.35rem', lineHeight: 1.5 }}>
                Access administration tools for suppliers, quotes, and contact messages.
              </p>
              <span style={{ display: 'inline-block', marginTop: '0.7rem', fontSize: '0.8125rem', fontWeight: 600, color: 'var(--color-blue)' }}>
                Continue as admin &rarr;
              </span>
            </Link>
          </div>

          <p style={{ textAlign: 'center', marginTop: '1.2rem', fontSize: '0.8rem', color: 'var(--color-gray-400)' }}>
            Need to browse products first? <Link href="/products" style={{ color: 'var(--color-blue)', textDecoration: 'none', fontWeight: 600 }}>Explore catalog</Link>
          </p>
        </div>
      </main>
    </div>
  );
}
