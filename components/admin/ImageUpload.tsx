"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { upload } from "@vercel/blob/client";
import { ArrowLeft, ArrowRight, ImagePlus, Star, X } from "lucide-react";
import { buttons } from "./styles";

async function uploadFile(file: File) {
  const safeName = file.name.toLowerCase().replace(/[^a-z0-9.]+/g, "-");
  const blob = await upload(`events/${safeName}`, file, {
    access: "public",
    handleUploadUrl: "/api/admin/upload",
    multipart: file.size > 5 * 1024 * 1024,
  });
  return blob.url;
}

function Thumb({ src, alt }: { src: string; alt: string }) {
  const [failed, setFailed] = useState<string | null>(null);

  // Seeded entries point at /images paths that may not be uploaded yet.
  if (failed === src) {
    return (
      <span className="absolute inset-0 flex flex-col items-center justify-center gap-1 px-2 text-center text-ink/40">
        <span className="font-display text-2xl italic">LL</span>
        <span className="text-[0.65rem] font-semibold uppercase tracking-widest">Photo missing</span>
      </span>
    );
  }

  return (
    <Image
      onError={() => setFailed(src)}
      src={src}
      alt={alt}
      fill
      sizes="200px"
      // Admin previews skip the optimizer so freshly uploaded files show instantly.
      unoptimized
      className="object-cover"
    />
  );
}

function useUploader(onDone: (urls: string[]) => void) {
  const [busy, setBusy] = useState(0);
  const [error, setError] = useState<string | null>(null);

  async function run(files: FileList | null) {
    if (!files?.length) return;
    setError(null);
    setBusy(files.length);
    try {
      const urls: string[] = [];
      for (const file of Array.from(files)) {
        urls.push(await uploadFile(file));
        setBusy((n) => n - 1);
      }
      onDone(urls);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Upload failed");
    } finally {
      setBusy(0);
    }
  }

  return { busy, error, run };
}

/** Single cover photo. Posts its URL as a hidden `name` field. */
export function CoverUpload({
  name,
  value: url,
  onChange,
}: {
  name: string;
  value: string;
  onChange: (url: string) => void;
}) {
  const input = useRef<HTMLInputElement>(null);
  const { busy, error, run } = useUploader((urls) => onChange(urls[0]));

  return (
    <div>
      <input type="hidden" name={name} value={url} />
      <div className="relative aspect-16/9 overflow-hidden rounded-sm border border-line bg-paper-3">
        {url ? <Thumb src={url} alt="Cover photo" /> : null}
        <button
          type="button"
          onClick={() => input.current?.click()}
          disabled={busy > 0}
          className={`absolute inset-0 flex flex-col items-center justify-center gap-2 text-sm font-semibold transition-colors ${
            url ? "bg-ink/0 text-transparent hover:bg-ink/45 hover:text-paper" : "text-muted hover:text-ink"
          } ${busy ? "bg-ink/45! text-paper!" : ""}`}
        >
          <ImagePlus aria-hidden size={22} strokeWidth={1.5} />
          {busy ? "Uploading…" : url ? "Replace cover" : "Upload cover photo"}
        </button>
      </div>
      <input
        ref={input}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/avif"
        hidden
        onChange={(e) => {
          void run(e.target.files);
          e.target.value = "";
        }}
      />
      {error ? <p className="mt-2 text-sm text-red-800">{error}</p> : null}
    </div>
  );
}

/** Ordered gallery. Posts a JSON array of URLs as a hidden `name` field. */
export function GalleryUpload({
  name,
  defaultValue,
  onMakeCover,
}: {
  name: string;
  defaultValue: string[];
  onMakeCover?: (url: string) => void;
}) {
  const [urls, setUrls] = useState(defaultValue);
  const input = useRef<HTMLInputElement>(null);
  const { busy, error, run } = useUploader((added) => setUrls((current) => [...current, ...added]));

  const move = (from: number, to: number) =>
    setUrls((current) => {
      const next = [...current];
      [next[from], next[to]] = [next[to], next[from]];
      return next;
    });

  return (
    <div>
      <input type="hidden" name={name} value={JSON.stringify(urls)} />
      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
        {urls.map((url, i) => (
          <li key={url} className="group relative aspect-4/5 overflow-hidden rounded-sm border border-line bg-paper-3">
            <Thumb src={url} alt={`Gallery photo ${i + 1}`} />
            <div className="absolute inset-x-0 bottom-0 flex justify-between bg-linear-to-t from-ink/70 to-transparent p-1.5 text-paper opacity-100 transition-opacity sm:opacity-0 sm:group-focus-within:opacity-100 sm:group-hover:opacity-100">
              <span className="flex">
                <IconButton label="Move earlier" disabled={i === 0} onClick={() => move(i, i - 1)}>
                  <ArrowLeft size={14} />
                </IconButton>
                <IconButton label="Move later" disabled={i === urls.length - 1} onClick={() => move(i, i + 1)}>
                  <ArrowRight size={14} />
                </IconButton>
                {onMakeCover ? (
                  <IconButton label="Use as cover" onClick={() => onMakeCover(url)}>
                    <Star size={14} />
                  </IconButton>
                ) : null}
              </span>
              <IconButton label="Remove photo" onClick={() => setUrls((current) => current.filter((u) => u !== url))}>
                <X size={14} />
              </IconButton>
            </div>
          </li>
        ))}
        <li>
          <button
            type="button"
            onClick={() => input.current?.click()}
            disabled={busy > 0}
            className="flex aspect-4/5 w-full flex-col items-center justify-center gap-2 rounded-sm border border-dashed border-ink/25 text-sm font-semibold text-muted transition-colors hover:border-ink hover:text-ink disabled:opacity-60"
          >
            <ImagePlus aria-hidden size={22} strokeWidth={1.5} />
            {busy ? `Uploading ${busy}…` : "Add photos"}
          </button>
        </li>
      </ul>
      <input
        ref={input}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/avif"
        multiple
        hidden
        onChange={(e) => {
          void run(e.target.files);
          e.target.value = "";
        }}
      />
      {error ? <p className="mt-2 text-sm text-red-800">{error}</p> : null}
    </div>
  );
}

function IconButton({
  label,
  onClick,
  disabled,
  children,
}: {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={onClick}
      disabled={disabled}
      className={`${buttons.ghost} h-7 w-7 p-0! text-paper! hover:bg-paper/20 disabled:opacity-30`}
    >
      {children}
    </button>
  );
}
