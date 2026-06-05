import { useState } from 'react';
import { DropZone } from './DropZone';
import { AssetQueue } from './AssetQueue';
import { ValidationPanel } from './ValidationPanel';
import { ProtocolMetadata } from './ProtocolMetadata';

export interface UploadFile {
  file: File;
  preview: string;
  hasGPS: boolean;
  status: 'pending' | 'valid' | 'rejected' | 'processing';
}

export const UploadGrid = () => {
  const [files, setFiles] = useState<UploadFile[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFilesAdded = (newFiles: UploadFile[]) => {
    setFiles((prev) => [...prev, ...newFiles]);
  };

  const handleSubmit = async () => {
    if (files.length === 0) return;
    setIsSubmitting(true);
    setTimeout(() => setIsSubmitting(false), 2000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      <div className="lg:col-span-8 space-y-8">
        <DropZone files={files} onFilesAdded={handleFilesAdded} />
        <AssetQueue files={files} />
      </div>

      <aside className="lg:col-span-4 space-y-6">
        <ValidationPanel
          files={files}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
        />
        <ProtocolMetadata />
      </aside>
    </div>
  );
};