import type { UploadedFile } from "@/types";
import * as React from "react";
import { toast } from "sonner";

interface UploadResponse {
  fileUrl: string;
  key: string;
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

  const updateProgress = React.useCallback((fileName: string, progress: number) => {
    setProgresses(prev => ({
      ...prev,
      [fileName]: progress
    }));
  }, []);

  async function onUpload(files: File[]) {
    setIsUploading(true);
    onUploadBegin?.();

    try {
      const formData = new FormData();
      files.forEach((file) => {
        formData.append('file', file);
        // Initialize progress for each file
        updateProgress(file.name, 0);
      });

      const xhr = new XMLHttpRequest();
      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          const progress = Math.round((event.loaded * 100) / event.total);
          files.forEach(file => {
            updateProgress(file.name, progress);
            onUploadProgress?.({ file, progress });
          });
        }
      };

      const uploadPromise = new Promise<UploadResponse>((resolve, reject) => {
        xhr.onload = () => {
          if (xhr.status === 200) {
            resolve(JSON.parse(xhr.response));
          } else {
            reject(new Error('Upload failed'));
          }
        };
        xhr.onerror = () => reject(new Error('Upload failed'));
      });

      xhr.open('POST', '/api/upload');
      if (headers) {
        Object.entries(headers).forEach(([key, value]) => {
          xhr.setRequestHeader(key, value);
        });
      }
      xhr.send(formData);

      const data = await uploadPromise;
      
      const newUploadedFiles: UploadedFile[] = files.map((file) => ({
        key: data.key,
        name: file.name,
        url: data.fileUrl,
        size: file.size,
        type: file.type,
      }));

      setUploadedFiles(prev => [...prev, ...newUploadedFiles]);
      toast.success('Files uploaded successfully');
    } catch (err) {
      console.error('Upload error:', err);
      toast.error(err instanceof Error ? err.message : 'Failed to upload files');
    } finally {
      // Clear progress after a short delay to show 100%
      setTimeout(() => {
        setProgresses({});
        setIsUploading(false);
      }, 500);
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
