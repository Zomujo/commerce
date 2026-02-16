'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { ApiClient } from '@/lib/api-client';
import { ContactMessage, MessageStatus } from '@/types/api';
import Link from 'next/link';

const statusColor: Record<string, string> = {
  NEW: 'bg-sky-50 text-sky-700',
  READ: 'bg-purple-50 text-purple-700',
  REPLIED: 'bg-emerald-50 text-emerald-700',
  ARCHIVED: 'bg-slate-100 text-slate-500',
};
const dotColor: Record<string, string> = {
  NEW: 'bg-sky-400',
  READ: 'bg-purple-400',
  REPLIED: 'bg-emerald-400',
  ARCHIVED: 'bg-slate-400',
};

export default function ContactDetailPage() {
  const params = useParams();
  const id = params.id as string;

  const [contact, setContact] = useState<ContactMessage | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [note, setNote] = useState('');
  const [updating, setUpdating] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await ApiClient.getContactById(id);
        setContact(data);
      } catch (err) {
        console.error('Failed to fetch contact:', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetch();
  }, [id]);

  const handleStatusUpdate = async (status: MessageStatus) => {
    setUpdating(true);
    try {
      const updated = await ApiClient.updateContactStatus(id, status, note || undefined);
      setContact(updated);
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
      const updated = await ApiClient.addContactNote(id, note);
      setContact(updated);
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

  const fmt = (d: string) => new Date(d).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' });

  if (isLoading) return <div className="flex items-center justify-center py-20 text-slate-400">Loading...</div>;
  if (!contact) return <div className="flex items-center justify-center py-20 text-slate-400">Message not found</div>;

  return (
    <div>
      <Link href="/admin/contacts" className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-blue-500 transition-colors mb-6">
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="15 18 9 12 15 6"/></svg>
        Back to Messages
      </Link>

      {message && (
        <div className="mb-4 px-4 py-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm font-medium">{message}</div>
      )}

      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">{contact.name}</h1>
          <p className="text-sm text-slate-400 mt-1">Received {fmt(contact.createdAt)}</p>
        </div>
        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-semibold ${statusColor[contact.status] || ''}`}>
          <span className={`w-2 h-2 rounded-full ${dotColor[contact.status] || ''}`} />
          {contact.status}
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
                <p className="text-sm text-slate-700">{contact.name}</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">Email</p>
                <p className="text-sm text-slate-700">{contact.email}</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">Company</p>
                <p className="text-sm text-slate-700">{contact.company || '—'}</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">Phone</p>
                <p className="text-sm text-slate-700">{contact.phone || '—'}</p>
              </div>
              <div className="col-span-2">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">Subject</p>
                <p className="text-sm text-slate-700">{contact.subject}</p>
              </div>
            </div>
          </div>

          {/* Message */}
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-100">
              <h2 className="font-semibold text-slate-800">Message</h2>
            </div>
            <div className="p-5">
              <p className="text-sm text-slate-700 whitespace-pre-wrap leading-relaxed">{contact.message}</p>
            </div>
          </div>

          {/* Admin Notes */}
          {contact.adminNotes && (
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
              <div className="px-5 py-4 border-b border-slate-100">
                <h2 className="font-semibold text-slate-800">Admin Notes</h2>
              </div>
              <div className="p-5">
                <p className="text-sm text-slate-700 whitespace-pre-wrap">{contact.adminNotes}</p>
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
              {Object.values(MessageStatus).map((s) => (
                <button key={s} onClick={() => handleStatusUpdate(s)} disabled={updating || contact.status === s}
                  className={`w-full py-2 px-3 rounded-lg text-sm font-medium transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed
                    ${contact.status === s
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

          {/* Quick Reply */}
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-100">
              <h2 className="font-semibold text-slate-800">Quick Reply</h2>
            </div>
            <div className="p-5">
              <a href={`mailto:${contact.email}?subject=Re: ${contact.subject}`}
                className="block w-full py-2 px-3 rounded-lg text-sm font-medium text-center bg-slate-800 text-white hover:bg-slate-700 transition">
                Reply via Email
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
