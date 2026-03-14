'use client';

import { useRef, useState } from 'react';
import { ApiClient } from '@/lib/api-client';

interface FileUploadProps {
  value: string;
  onChange: (url: string) => void;
  accept?: string;
  label?: string;
  placeholder?: string;
}

export default function FileUpload({ value, onChange, accept = 'image/*', label, placeholder }: FileUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const handleFile = async (file: File) => {
    setUploading(true);
    setError('');
    try {
      const { uploadUrl, name } = await ApiClient.getUploadUrl(file.name, file.type);
      await fetch(uploadUrl, {
        method: 'PUT',
        body: file,
        headers: { 'Content-Type': file.type },
      });
      // Use the signed view URL as the value
      const { url } = await ApiClient.viewFile(name);
      onChange(url);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const inputCls = 'w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition';

  return (
    <div>
      {label && <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">{label}</label>}
      <div className="flex gap-2">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder || 'https:// or upload a file →'}
          className={inputCls}
        />
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="flex-shrink-0 px-3 py-2 rounded-lg border border-slate-200 bg-slate-50 text-slate-600 text-sm hover:bg-slate-100 transition disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer whitespace-nowrap"
        >
          {uploading ? 'Uploading…' : 'Upload'}
        </button>
      </div>
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
      {value && !uploading && (
        <div className="mt-2 w-16 h-16 rounded-lg overflow-hidden border border-slate-200 bg-slate-50">
          <img src={value} alt="preview" className="w-full h-full object-cover" />
        </div>
      )}
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        className="hidden"
        onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); }}
      />
    </div>
  );
}
