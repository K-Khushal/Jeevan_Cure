import type { UploadedFile } from "@/types";
import * as React from "react";
import { toast } from "sonner";

interface UploadResponse {
  url: string;
  key: string;
  name: string;
}

interface UseUploadFileOptions {
  defaultUploadedFiles?: UploadedFile[];
  onUploadBegin?: () => void;
  onUploadProgress?: (progress: { file: File; progress: number }) => void;
  headers?: Record<string, string>;
}

export function useUploadFile(
  endpoint: string,
  {
    defaultUploadedFiles = [],
    onUploadBegin,
    onUploadProgress,
    headers,
  }: UseUploadFileOptions = {},
) {
  const [uploadedFiles, setUploadedFiles] = React.useState<UploadedFile[]>(defaultUploadedFiles);
  const [progresses, setProgresses] = React.useState<Record<string, number>>({});
  const [isUploading, setIsUploading] = React.useState(false);

  async function onUpload(files: File[]) {
    setIsUploading(true);
    onUploadBegin?.();

    try {
      const formData = new FormData();
      files.forEach((file) => {
        formData.append('file', file);
      });

      const response = await fetch('/api/upload', {
        method: 'POST',
        headers: headers,
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const data = await response.json();
      const uploadedFiles: UploadedFile[] = files.map((file, index) => ({
        key: data.key,
        name: file.name,
        url: data.fileUrl,
        size: file.size,
        type: file.type,
      }));

      setUploadedFiles((prev) => [...prev, ...uploadedFiles]);
      toast.success('Files uploaded successfully');
    } catch (err) {
      console.error('Upload error:', err);
      toast.error(err instanceof Error ? err.message : 'Failed to upload files');
    } finally {
      setProgresses({});
      setIsUploading(false);
    }
  }

  return {
    onUpload,
    progresses,
    uploadedFiles,
    isUploading,
    setUploadedFiles,
  };
}
