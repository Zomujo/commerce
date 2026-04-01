'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ApiClient } from '@/lib/api-client';
import { Auth } from '@/lib/auth';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const authResponse = await ApiClient.login({ email, password });
      Auth.setTokens(authResponse);
      router.push('/admin');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Invalid email or password');
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
        <h1 className="text-2xl font-bold text-slate-800 text-center mb-1">Welcome back</h1>
        <p className="text-sm text-slate-400 text-center mb-8">Sign in to the WG Trade admin panel</p>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg p-3 mb-4 text-center">{error}</div>
        )}

        <form onSubmit={handleLogin}>
          <label className="block text-sm font-semibold text-slate-700 mb-1.5">Email address</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required
            placeholder="admin@wgtrade.com"
            className="w-full px-3.5 py-2.5 border border-slate-200 rounded-lg text-sm mb-5 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition" />

          <label className="block text-sm font-semibold text-slate-700 mb-1.5">Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required
            placeholder="Enter your password"
            className="w-full px-3.5 py-2.5 border border-slate-200 rounded-lg text-sm mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition" />

          <button type="submit" disabled={loading}
            className="w-full py-2.5 bg-blue-500 hover:bg-blue-600 disabled:opacity-60 text-white font-semibold rounded-lg text-sm transition cursor-pointer">
            {loading ? 'Signing in…' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}
