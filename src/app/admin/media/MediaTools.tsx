"use client";

import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { prepareUpload, registerMedia } from "../actions";

type Status = { name: string; state: "uploading" | "done" | "error"; note?: string };

export function Uploader() {
  const router = useRouter();
  const input = useRef<HTMLInputElement>(null);
  const [items, setItems] = useState<Status[]>([]);
  const busy = items.some((i) => i.state === "uploading");

  async function upload(files: File[]) {
    setItems(files.map((f) => ({ name: f.name, state: "uploading" })));
    const set = (i: number, s: Partial<Status>) => setItems((cur) => cur.map((c, j) => (j === i ? { ...c, ...s } : c)));
    for (const [i, file] of files.entries()) {
      try {
        const prep = await prepareUpload({ name: file.name, type: file.type, size: file.size });
        if ("error" in prep && prep.error) throw new Error(prep.error);
        const { uploadUrl, path, kind } = prep as { uploadUrl: string; path: string; kind: "image" | "video" };
        const body = new FormData();
        body.append("cacheControl", "31536000");
        body.append("", file);
        const res = await fetch(uploadUrl, { method: "PUT", body });
        if (!res.ok) throw new Error("Upload was rejected by storage.");
        const reg = await registerMedia({ path, kind, title: file.name.replace(/\.[^.]+$/, "") });
        if (reg.error) throw new Error(reg.error);
        set(i, { state: "done" });
      } catch (e) {
        set(i, { state: "error", note: e instanceof Error ? e.message : "Upload failed." });
      }
    }
    if (input.current) input.current.value = "";
    router.refresh();
  }

  return (
    <div className="admin__card">
      <label className="admin__field">
        <span>Upload photos or videos (up to 50 MB each)</span>
        <input
          ref={input}
          type="file"
          multiple
          disabled={busy}
          accept="image/jpeg,image/png,image/webp,image/gif,image/avif,video/mp4,video/webm,video/quicktime"
          onChange={(e) => e.target.files?.length && upload([...e.target.files])}
        />
      </label>
      {items.length > 0 && (
        <ul className="admin__uploads" aria-live="polite">
          {items.map((i, n) => (
            <li key={n} className={i.state === "error" ? "admin__error" : undefined}>
              {i.name}: {i.state === "uploading" ? "uploading…" : i.state === "done" ? "done" : i.note}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export function CopyButton({ text, label }: { text: string; label: string }) {
  const [done, setDone] = useState(false);
  return (
    <button
      type="button"
      className="admin__link"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(text);
          setDone(true);
          setTimeout(() => setDone(false), 1500);
        } catch {
          window.prompt("Copy this:", text);
        }
      }}
    >
      {done ? "Copied" : label}
    </button>
  );
}
