'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ApiClient } from '@/lib/api-client';
import { Auth } from '@/lib/auth';

export default function SupplierRegisterPage() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const passwordHint = 'Min 8 characters, at least 1 uppercase, 1 lowercase, and 1 digit.';

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const authResponse = await ApiClient.register({ email, password, fullName });
      Auth.setTokens(authResponse);
      router.push('/supplier');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-sm">
        <div className="flex justify-center mb-6">
          <Image src="/logo.png" alt="WG Trade" width={353} height={345} className="h-10 w-auto" priority />
        </div>
        <h1 className="text-2xl font-bold text-slate-800 text-center mb-1">Create account</h1>
        <p className="text-sm text-slate-400 text-center mb-8">Register as a WG Trade supplier</p>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg p-3 mb-4 text-center">{error}</div>
        )}

        <form onSubmit={handleRegister}>
          <label className="block text-sm font-semibold text-slate-700 mb-1.5">Full name</label>
          <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} required
            minLength={4} maxLength={100}
            placeholder="Jane Smith"
            className="w-full px-3.5 py-2.5 border border-slate-200 rounded-lg text-sm mb-5 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition" />

          <label className="block text-sm font-semibold text-slate-700 mb-1.5">Email address</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required
            placeholder="you@company.com"
            className="w-full px-3.5 py-2.5 border border-slate-200 rounded-lg text-sm mb-5 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition" />

          <label className="block text-sm font-semibold text-slate-700 mb-1.5">Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required
            minLength={8}
            placeholder="Create a strong password"
            className="w-full px-3.5 py-2.5 border border-slate-200 rounded-lg text-sm mb-1 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition" />
          <p className="text-xs text-slate-400 mb-6">{passwordHint}</p>

          <button type="submit" disabled={loading}
            className="w-full py-2.5 bg-emerald-500 hover:bg-emerald-600 disabled:opacity-60 text-white font-semibold rounded-lg text-sm transition cursor-pointer">
            {loading ? 'Creating account…' : 'Create Account'}
          </button>
        </form>

        <p className="text-sm text-slate-400 text-center mt-5">
          Already have an account?{' '}
          <Link href="/supplier/login" className="text-emerald-600 font-semibold hover:underline">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
