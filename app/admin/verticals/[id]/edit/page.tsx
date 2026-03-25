'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { ApiClient } from '@/lib/api-client';
import FileUpload, { FileUploadHandle } from '@/app/components/FileUpload';

export default function EditAdminVerticalPage() {
  const params = useParams();
  const router = useRouter();
  const iconRef = useRef<FileUploadHandle>(null);
  const id = typeof params.id === 'string' ? params.id : '';

  const [name, setName] = useState('');
  const [tagline, setTagline] = useState('');
  const [description, setDescription] = useState('');
  const [edge, setEdge] = useState('');
  const [icon, setIcon] = useState('');
  const [loadError, setLoadError] = useState('');
  const [submitError, setSubmitError] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!id) {
      setLoadError('Missing vertical id');
      setLoading(false);
      return;
    }
    let cancelled = false;
    (async () => {
      setLoading(true);
      setLoadError('');
      try {
        const v = await ApiClient.getVerticalById(id);
        if (cancelled) return;
        setName(v.name || '');
        setTagline(v.tagline || '');
        setDescription(v.description || '');
        setEdge(v.edge || '');
        setIcon(v.icon || '');
      } catch {
        if (!cancelled) setLoadError('Vertical not found or failed to load.');
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError('');
    if (!name.trim()) {
      setSubmitError('Name is required.');
      return;
    }
    setSaving(true);
    try {
      const resolvedIcon = (await iconRef.current?.upload()) ?? icon.trim();
      await ApiClient.updateAdminVertical(id, {
        name: name.trim(),
        tagline: tagline.trim(),
        description: description.trim(),
        edge: edge.trim(),
        icon: resolvedIcon,
      });
      router.push('/admin/verticals');
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Failed to update vertical');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div>
        <Link
          href="/admin/verticals"
          className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-blue-500 transition-colors mb-6"
        >
          ← Back to verticals
        </Link>
        <p className="text-slate-400 text-sm">Loading…</p>
      </div>
    );
  }

  if (loadError) {
    return (
      <div>
        <Link
          href="/admin/verticals"
          className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-blue-500 transition-colors mb-6"
        >
          ← Back to verticals
        </Link>
        <p className="text-red-600 text-sm">{loadError}</p>
      </div>
    );
  }

  return (
    <div>
      <Link
        href="/admin/verticals"
        className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-blue-500 transition-colors mb-6"
      >
        ← Back to verticals
      </Link>

      <h1 className="text-2xl font-bold text-slate-800 tracking-tight mb-2">Edit vertical</h1>
      <p className="text-sm text-slate-400 mb-8 font-mono">{id}</p>

      <form onSubmit={handleSubmit} className="max-w-xl space-y-5">
        {submitError ? (
          <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{submitError}</div>
        ) : null}

        <div>
          <label htmlFor="ev-name" className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            id="ev-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
          />
        </div>

        <div>
          <label htmlFor="ev-tagline" className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
            Tagline
          </label>
          <input
            id="ev-tagline"
            value={tagline}
            onChange={(e) => setTagline(e.target.value)}
            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
          />
        </div>

        <div>
          <label htmlFor="ev-desc" className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
            Description
          </label>
          <textarea
            id="ev-desc"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 resize-y"
          />
        </div>

        <div>
          <label htmlFor="ev-edge" className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
            Edge
          </label>
          <textarea
            id="ev-edge"
            value={edge}
            onChange={(e) => setEdge(e.target.value)}
            rows={3}
            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 resize-y"
          />
        </div>

        <div>
          <FileUpload
            ref={iconRef}
            label="Icon"
            value={icon}
            onChange={(url) => setIcon(url)}
            placeholder="Image URL or upload a file"
          />
          <p className="text-xs text-slate-400 mt-1.5">Optional. Choose a file and save — upload runs on submit, same as product images.</p>
        </div>

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            disabled={saving}
            className="px-4 py-2 rounded-lg bg-blue-500 text-white text-sm font-semibold hover:bg-blue-600 disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
          >
            {saving ? 'Saving…' : 'Save changes'}
          </button>
          <Link
            href="/admin/verticals"
            className="px-4 py-2 rounded-lg border border-slate-200 text-sm font-medium text-slate-600 hover:bg-slate-50"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
