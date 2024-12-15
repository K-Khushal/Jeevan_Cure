import type { UploadedFile } from "@/types";
import * as React from "react";

interface UseUploadFileOptions {
  defaultUploadedFiles?: UploadedFile[];
  onUploadBegin?: () => void;
  onUploadProgress?: (progress: { file: File; progress: number }) => void;
  headers?: Record<string, string>;
}

interface UseUploadFileReturn {
  uploadedFiles: UploadedFile[];
  isUploading: boolean;
  progresses: Record<string, number>;
  onUpload: (files: File[]) => Promise<void>;
  onRemove: (file: UploadedFile) => void;
  setUploadedFiles: React.Dispatch<React.SetStateAction<UploadedFile[]>>;
}

export function useUploadFile({
  defaultUploadedFiles = [],
  onUploadBegin,
  onUploadProgress,
  headers,
}: UseUploadFileOptions = {}): UseUploadFileReturn {
  const [uploadedFiles, setUploadedFiles] =
    React.useState<UploadedFile[]>(defaultUploadedFiles);
  const [progresses, setProgresses] = React.useState<Record<string, number>>(
    {},
  );
  const [isUploading, setIsUploading] = React.useState(false);

  const updateProgress = React.useCallback(
    (fileName: string, progress: number) => {
      setProgresses((prev) => ({
        ...prev,
        [fileName]: progress,
      }));
    },
    [],
  );

  async function onUpload(files: File[]) {
    setIsUploading(true);
    onUploadBegin?.();

    try {
      const uploadPromises = files.map(async (file) => {
        const formData = new FormData();
        formData.append("file", file);
        updateProgress(file.name, 0);

        const xhr = new XMLHttpRequest();

        const uploadPromise = new Promise<{ fileUrl: string; key: string }>(
          (resolve, reject) => {
            xhr.upload.onprogress = (event) => {
              if (event.lengthComputable) {
                const progress = Math.round((event.loaded * 100) / event.total);
                updateProgress(file.name, progress);
                onUploadProgress?.({ file, progress });
              }
            };

            xhr.onload = () => {
              if (xhr.status === 200) {
                const response = JSON.parse(xhr.response);
                resolve({
                  fileUrl: response.fileUrl,
                  key: response.fileUrl.split("/").pop() || "",
                });
              } else {
                reject(new Error("Upload failed"));
              }
            };
            xhr.onerror = () => reject(new Error("Upload failed"));
          },
        );

        xhr.open("POST", "/api/files");
        if (headers) {
          Object.entries(headers).forEach(([key, value]) => {
            xhr.setRequestHeader(key, value);
          });
        }
        xhr.send(formData);

        const data = await uploadPromise;

        return {
          key: data.key,
          name: file.name,
          url: data.fileUrl,
          size: file.size,
          type: file.type,
        } as UploadedFile;
      });

      const newUploadedFiles = await Promise.all(uploadPromises);
      setUploadedFiles((prev) => [...prev, ...newUploadedFiles]);
    } catch (err) {
      console.error("Upload error:", err);
      // toast.error(
      //   err instanceof Error ? err.message : "Failed to upload files",
      // );
    } finally {
      setTimeout(() => {
        setProgresses({});
        setIsUploading(false);
      }, 500);
    }
  }

  function onRemove(file: UploadedFile) {
    setUploadedFiles((prev) => prev.filter((f) => f.key !== file.key));
  }

  return {
    uploadedFiles,
    isUploading,
    progresses,
    onUpload,
    onRemove,
    setUploadedFiles,
  };
}
