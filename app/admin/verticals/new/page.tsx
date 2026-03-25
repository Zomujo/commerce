'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ApiClient } from '@/lib/api-client';
import FileUpload, { FileUploadHandle } from '@/app/components/FileUpload';

function buildCreateBody(values: {
  name: string;
  tagline: string;
  description: string;
  edge: string;
  icon: string;
}) {
  const name = values.name.trim();
  const tagline = values.tagline.trim();
  const description = values.description.trim();
  const edge = values.edge.trim();
  const icon = values.icon.trim();
  return {
    name,
    ...(tagline ? { tagline } : {}),
    ...(description ? { description } : {}),
    ...(edge ? { edge } : {}),
    ...(icon ? { icon } : {}),
  };
}

export default function NewAdminVerticalPage() {
  const router = useRouter();
  const iconRef = useRef<FileUploadHandle>(null);
  const [name, setName] = useState('');
  const [tagline, setTagline] = useState('');
  const [description, setDescription] = useState('');
  const [edge, setEdge] = useState('');
  const [icon, setIcon] = useState('');
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!name.trim()) {
      setError('Name is required.');
      return;
    }
    setSaving(true);
    try {
      const resolvedIcon = (await iconRef.current?.upload()) ?? icon.trim();
      await ApiClient.createAdminVertical(buildCreateBody({ name, tagline, description, edge, icon: resolvedIcon }));
      router.push('/admin/verticals');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create vertical');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <Link
        href="/admin/verticals"
        className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-blue-500 transition-colors mb-6"
      >
        ← Back to verticals
      </Link>

      <h1 className="text-2xl font-bold text-slate-800 tracking-tight mb-2">New vertical</h1>
      <p className="text-sm text-slate-400 mb-8">Create a strategic vertical shown on the storefront.</p>

      <form onSubmit={handleSubmit} className="max-w-xl space-y-5">
        {error ? (
          <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>
        ) : null}

        <div>
          <label htmlFor="v-name" className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            id="v-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            placeholder="e.g. Critical minerals"
            autoComplete="off"
          />
        </div>

        <div>
          <label htmlFor="v-tagline" className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
            Tagline
          </label>
          <input
            id="v-tagline"
            value={tagline}
            onChange={(e) => setTagline(e.target.value)}
            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            placeholder="Short subtitle"
          />
        </div>

        <div>
          <label htmlFor="v-desc" className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
            Description
          </label>
          <textarea
            id="v-desc"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 resize-y"
            placeholder="Longer overview"
          />
        </div>

        <div>
          <label htmlFor="v-edge" className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
            Edge
          </label>
          <textarea
            id="v-edge"
            value={edge}
            onChange={(e) => setEdge(e.target.value)}
            rows={3}
            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 resize-y"
            placeholder="Competitive advantage / differentiator"
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
          <p className="text-xs text-slate-400 mt-1.5">Optional. Same flow as product images: presigned upload, then the URL is saved on the vertical.</p>
        </div>

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            disabled={saving}
            className="px-4 py-2 rounded-lg bg-blue-500 text-white text-sm font-semibold hover:bg-blue-600 disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
          >
            {saving ? 'Creating…' : 'Create vertical'}
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
