'use client';

import { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import { ApiClient } from '@/lib/api-client';

export interface FileUploadHandle {
  upload: () => Promise<string | null>;
}

interface FileUploadProps {
  value: string;
  onChange: (url: string) => void;
  accept?: string;
  label?: string;
  placeholder?: string;
}

const FileUpload = forwardRef<FileUploadHandle, FileUploadProps>(
  ({ value, onChange, accept = 'image/*', label, placeholder }, ref) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [pendingFile, setPendingFile] = useState<File | null>(null);
    const [preview, setPreview] = useState('');
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState('');

    useImperativeHandle(ref, () => ({
      upload: async () => {
        if (!pendingFile) {
          console.log('[FileUpload] No pending file, skipping upload');
          return null;
        }
        setUploading(true);
        setError('');
        try {
          const { uploadUrl, fileUrl } = await ApiClient.getUploadUrl(pendingFile.name, pendingFile.type);

          await fetch(uploadUrl, {
            method: 'PUT',
            body: pendingFile,
            headers: { 'Content-Type': pendingFile.type },
          });

          onChange(fileUrl);
          setPendingFile(null);
          setPreview('');
          return fileUrl;
        } catch (err: unknown) {
          console.error('[FileUpload] Upload error:', err);
          setError(err instanceof Error ? err.message : 'Upload failed');
          throw err;
        } finally {
          setUploading(false);
        }
      },
    }));

    const handleFileSelect = (file: File) => {
      setPendingFile(file);
      setPreview(URL.createObjectURL(file));
      setError('');
    };

    const displayPreview = preview || value;
    const isPending = pendingFile !== null;

    const inputCls = 'w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition';

    return (
      <div>
        {label && <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">{label}</label>}
        <div className="flex gap-2">
          <input
            type="text"
            value={isPending ? pendingFile.name : value}
            readOnly={isPending}
            onChange={(e) => { if (!isPending) onChange(e.target.value); }}
            placeholder={placeholder || 'https:// or upload a file →'}
            className={`${inputCls} ${isPending ? 'bg-slate-50 text-slate-500' : ''}`}
          />
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={uploading}
            className="flex-shrink-0 px-3 py-2 rounded-lg border border-slate-200 bg-slate-50 text-slate-600 text-sm hover:bg-slate-100 transition disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer whitespace-nowrap"
          >
            {uploading ? 'Uploading…' : 'Choose file'}
          </button>
          {isPending && (
            <button
              type="button"
              onClick={() => { setPendingFile(null); setPreview(''); }}
              className="flex-shrink-0 px-2 py-2 rounded-lg border border-slate-200 text-slate-400 hover:text-red-500 hover:border-red-200 transition cursor-pointer text-sm"
            >
              ✕
            </button>
          )}
        </div>

        {isPending && (
          <p className="text-xs text-amber-600 mt-1">File selected — will upload when you submit the form.</p>
        )}
        {error && <p className="text-xs text-red-500 mt-1">{error}</p>}

        {displayPreview && (
          <div className="mt-2 w-16 h-16 rounded-lg overflow-hidden border border-slate-200 bg-slate-50">
            <img src={displayPreview} alt="preview" className="w-full h-full object-cover" />
          </div>
        )}

        <input
          ref={inputRef}
          type="file"
          accept={accept}
          className="hidden"
          onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFileSelect(f); e.target.value = ''; }}
        />
      </div>
    );
  }
);

FileUpload.displayName = 'FileUpload';

export default FileUpload;
