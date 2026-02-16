'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ApiClient } from '@/lib/api-client';
import { QuoteRequest, QuoteStatus } from '@/types/api';
import Link from 'next/link';

const statusColor: Record<string, string> = {
  PENDING: 'bg-amber-50 text-amber-700',
  REVIEWED: 'bg-blue-50 text-blue-700',
  QUOTED: 'bg-emerald-50 text-emerald-700',
  REJECTED: 'bg-red-50 text-red-700',
};
const dotColor: Record<string, string> = {
  PENDING: 'bg-amber-400',
  REVIEWED: 'bg-blue-400',
  QUOTED: 'bg-emerald-400',
  REJECTED: 'bg-red-400',
};

export default function QuoteDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [quote, setQuote] = useState<QuoteRequest | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [note, setNote] = useState('');
  const [assignEmail, setAssignEmail] = useState('');
  const [updating, setUpdating] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await ApiClient.getQuoteById(id);
        setQuote(data);
      } catch (err) {
        console.error('Failed to fetch quote:', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetch();
  }, [id]);

  const handleStatusUpdate = async (status: QuoteStatus) => {
    setUpdating(true);
    try {
      const updated = await ApiClient.updateQuoteStatus(id, status, note || undefined);
      setQuote(updated);
      setNote('');
      setMessage(`Status updated to ${status}`);
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      console.error('Failed to update status:', err);
      setMessage('Failed to update status');
    } finally {
      setUpdating(false);
    }
  };

  const handleAddNote = async () => {
    if (!note.trim()) return;
    setUpdating(true);
    try {
      const updated = await ApiClient.addQuoteNote(id, note);
      setQuote(updated);
      setNote('');
      setMessage('Note added successfully');
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      console.error('Failed to add note:', err);
      setMessage('Failed to add note');
    } finally {
      setUpdating(false);
    }
  };

  const handleAssign = async () => {
    if (!assignEmail.trim()) return;
    setUpdating(true);
    try {
      const updated = await ApiClient.assignQuote(id, assignEmail);
      setQuote(updated);
      setAssignEmail('');
      setMessage('Quote assigned successfully');
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      console.error('Failed to assign quote:', err);
      setMessage('Failed to assign');
    } finally {
      setUpdating(false);
    }
  };

  const fmt = (d: string) => new Date(d).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' });

  if (isLoading) {
    return <div className="flex items-center justify-center py-20 text-slate-400">Loading...</div>;
  }

  if (!quote) {
    return <div className="flex items-center justify-center py-20 text-slate-400">Quote not found</div>;
  }

  return (
    <div>
      <Link href="/admin/quotes" className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-blue-500 transition-colors mb-6">
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="15 18 9 12 15 6"/></svg>
        Back to Quotes
      </Link>

      {/* Success message */}
      {message && (
        <div className="mb-4 px-4 py-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm font-medium">
          {message}
        </div>
      )}

      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">{quote.name}</h1>
          <p className="text-sm text-slate-400 mt-1">Submitted {fmt(quote.createdAt)}</p>
        </div>
        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-semibold ${statusColor[quote.status] || ''}`}>
          <span className={`w-2 h-2 rounded-full ${dotColor[quote.status] || ''}`} />
          {quote.status}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Contact Info */}
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-100">
              <h2 className="font-semibold text-slate-800">Contact Information</h2>
            </div>
            <div className="p-5 grid grid-cols-2 gap-5">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">Name</p>
                <p className="text-sm text-slate-700">{quote.name}</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">Email</p>
                <p className="text-sm text-slate-700">{quote.email}</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">Company</p>
                <p className="text-sm text-slate-700">{quote.company || '—'}</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">Phone</p>
                <p className="text-sm text-slate-700">{quote.phone || '—'}</p>
              </div>
            </div>
          </div>

          {/* Product Interest */}
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-100">
              <h2 className="font-semibold text-slate-800">Product Interest</h2>
            </div>
            <div className="p-5 grid grid-cols-2 gap-5">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">Product</p>
                <p className="text-sm text-slate-700">{quote.productName || quote.product?.name || '—'}</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">Quantity</p>
                <p className="text-sm text-slate-700">{quote.quantity || '—'}</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">Delivery Location</p>
                <p className="text-sm text-slate-700">{quote.deliveryLocation || '—'}</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">Incoterms</p>
                <p className="text-sm text-slate-700">{quote.incoterms || '—'}</p>
              </div>
              {quote.preferredCurrency && (
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">Currency</p>
                  <p className="text-sm text-slate-700">{quote.preferredCurrency}</p>
                </div>
              )}
            </div>
            {quote.message && (
              <div className="px-5 pb-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">Message</p>
                <p className="text-sm text-slate-700 whitespace-pre-wrap bg-slate-50 rounded-lg p-3">{quote.message}</p>
              </div>
            )}
          </div>

          {/* Admin Notes */}
          {quote.adminNotes && (
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
              <div className="px-5 py-4 border-b border-slate-100">
                <h2 className="font-semibold text-slate-800">Admin Notes</h2>
              </div>
              <div className="p-5">
                <p className="text-sm text-slate-700 whitespace-pre-wrap">{quote.adminNotes}</p>
              </div>
            </div>
          )}
        </div>

        {/* Right: Actions */}
        <div className="space-y-6">
          {/* Status Actions */}
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-100">
              <h2 className="font-semibold text-slate-800">Update Status</h2>
            </div>
            <div className="p-5 space-y-2">
              {Object.values(QuoteStatus).map((s) => (
                <button key={s} onClick={() => handleStatusUpdate(s)} disabled={updating || quote.status === s}
                  className={`w-full py-2 px-3 rounded-lg text-sm font-medium transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed
                    ${quote.status === s
                      ? 'bg-blue-500 text-white'
                      : 'bg-slate-50 text-slate-600 hover:bg-slate-100'}`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Add Note */}
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-100">
              <h2 className="font-semibold text-slate-800">Add Note</h2>
            </div>
            <div className="p-5">
              <textarea value={note} onChange={(e) => setNote(e.target.value)}
                placeholder="Write an internal note..."
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm resize-y min-h-[80px] focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition"
              />
              <button onClick={handleAddNote} disabled={updating || !note.trim()}
                className="mt-3 w-full py-2 px-3 rounded-lg text-sm font-medium bg-blue-500 text-white hover:bg-blue-600 transition cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed">
                Save Note
              </button>
            </div>
          </div>

          {/* Assign */}
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-100">
              <h2 className="font-semibold text-slate-800">Assign To</h2>
              {quote.assignedTo && <p className="text-xs text-slate-400 mt-1">Currently: {quote.assignedTo}</p>}
            </div>
            <div className="p-5">
              <input type="email" value={assignEmail} onChange={(e) => setAssignEmail(e.target.value)}
                placeholder="sales@wgtrade.com"
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition"
              />
              <button onClick={handleAssign} disabled={updating || !assignEmail.trim()}
                className="mt-3 w-full py-2 px-3 rounded-lg text-sm font-medium bg-slate-800 text-white hover:bg-slate-700 transition cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed">
                Assign
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
