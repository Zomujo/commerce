'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (email === 'admin@wgtrade.com' && password === 'admin123') {
      localStorage.setItem('admin_token', 'true');
      router.push('/admin');
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-sm">
        <div className="flex justify-center mb-6">
          <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center text-white font-bold text-xl">W</div>
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

          <button type="submit"
            className="w-full py-2.5 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg text-sm transition cursor-pointer">
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
