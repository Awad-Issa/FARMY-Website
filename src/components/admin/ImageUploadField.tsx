"use client";

import { useState } from "react";

type ImageUploadFieldProps = {
  name?: string;
  defaultValue?: string;
  label?: string;
};

export function ImageUploadField({
  name = "image",
  defaultValue = "",
  label = "الصورة",
}: ImageUploadFieldProps) {
  const [url, setUrl] = useState(defaultValue);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  async function handleUpload(file: File) {
    setUploading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Upload failed");

      const data = (await response.json()) as { url: string };
      setUrl(data.url);
    } catch {
      setError("فشل رفع الصورة. حاول مرة أخرى.");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div>
      <label className="mb-1 block text-sm font-medium">{label}</label>
      <input type="hidden" name={name} value={url} required />
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleUpload(file);
          }}
          className="text-sm"
        />
        {uploading && (
          <span className="text-sm text-muted">جاري الرفع...</span>
        )}
      </div>
      {url && (
        <p className="mt-2 text-xs text-muted" dir="ltr">
          {url}
        </p>
      )}
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}
