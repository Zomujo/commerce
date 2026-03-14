'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Auth } from '@/lib/auth';
import { ApiClient } from '@/lib/api-client';

const PUBLIC_PATHS = ['/supplier/login', '/supplier/register'];

export default function SupplierLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const isPublic = PUBLIC_PATHS.includes(pathname);
    if (!isPublic) {
      if (!Auth.isAuthenticated() || Auth.getRole() !== 'SUPPLIER') {
        router.push('/supplier/login');
        return;
      }
    }
    setIsLoading(false);
  }, [pathname, router]);

  if (isLoading && !PUBLIC_PATHS.includes(pathname)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-400 text-sm">Loading…</p>
      </div>
    );
  }

  if (PUBLIC_PATHS.includes(pathname)) return <>{children}</>;

  const user = Auth.getUser();

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-slate-900 text-white flex flex-col fixed inset-y-0 left-0 z-40">
        <div className="flex items-center gap-3 px-5 py-5 border-b border-white/10">
          <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center font-bold text-sm">W</div>
          <span className="font-bold text-lg tracking-tight">Supplier Portal</span>
        </div>

        {user && (
          <div className="px-5 py-4 border-b border-white/10">
            <p className="text-sm font-semibold text-white truncate">{user.fullName}</p>
            <p className="text-xs text-slate-400 truncate">{user.email}</p>
          </div>
        )}

        <nav className="flex-1 px-3 pt-4 flex flex-col gap-0.5">
          <Link href="/supplier"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-400 hover:bg-slate-800 hover:text-slate-200 transition-colors">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>
            Dashboard
          </Link>
        </nav>

        <div className="px-3 py-4 border-t border-white/10">
          <button onClick={async () => { await ApiClient.logout(); Auth.clear(); router.push('/supplier/login'); }}
            className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm text-slate-400 hover:bg-red-500/10 hover:text-red-300 transition-colors cursor-pointer"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
            Sign Out
          </button>
        </div>
      </aside>

      <main className="ml-64 flex-1 bg-gray-50 min-h-screen p-8">
        {children}
      </main>
    </div>
  );
}
