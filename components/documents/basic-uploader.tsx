"use client";

import { FileUploader } from "@/components/documents/file-uploader";
import { UploadedFilesCard } from "@/components/documents/uploaded-files-card";
import { useUploadFile } from "@/hooks/use-upload-file";

export function BasicUploaderDemo() {
  const { onUpload, progresses, uploadedFiles, isUploading, setUploadedFiles } = useUploadFile(
    "imageUploader",
    {
      defaultUploadedFiles: [],
      onUploadProgress: ({ file, progress }) => {
        // Progress is already handled in the hook
        console.debug(`Upload progress for ${file.name}: ${progress}%`);
      },
    }
  );

  const handleFileDelete = (key: string) => {
    setUploadedFiles((prev) => prev.filter((file) => file.key !== key));
  };

  return (
    <div className="flex flex-col gap-6">
      <FileUploader
        maxFileCount={4}
        maxSize={4 * 1024 * 1024}
        progresses={progresses}
        onUpload={onUpload}
        disabled={isUploading}
      />
      <UploadedFilesCard 
        uploadedFiles={uploadedFiles} 
        onFileDelete={handleFileDelete}
      />
    </div>
  );
}
