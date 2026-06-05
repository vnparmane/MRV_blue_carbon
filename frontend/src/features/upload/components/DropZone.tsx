import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Icon } from '@/components/common/Icon';
import { Button } from '@/components/common/Button';
import { cn } from '@/lib/utils';
import { useUploadAsset, type UploadResponse } from '../hooks/useUploadAsset';
import type { UploadFile } from './UploadGrid';

interface DropZoneProps {
  files: UploadFile[];
  onFilesAdded: (files: UploadFile[]) => void;
}

export const DropZone = ({ files, onFilesAdded }: DropZoneProps) => {
  const [isDragActive, setIsDragActive] = useState(false);
  const [uploadSummary, setUploadSummary] = useState<UploadResponse | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const uploadMutation = useUploadAsset();

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      if (acceptedFiles.length === 0) {
        setUploadError('No valid image files selected');
        return;
      }

      const newFiles: UploadFile[] = acceptedFiles.map((file) => ({
        file,
        preview: URL.createObjectURL(file),
        hasGPS: false,
        status: 'processing',
      }));
      onFilesAdded(newFiles);

      const formData = new FormData();
      acceptedFiles.forEach((file) => {
        formData.append('files', file);
      });

      setUploadError(null);
      setUploadSummary(null);

      try {
        const result = await uploadMutation.mutateAsync(formData);
        setUploadSummary(result);
        onFilesAdded(
          newFiles.map((f, i) => ({
            ...f,
            hasGPS: result.images[i]?.has_gps ?? false,
            status: result.images[i]?.has_gps ? 'valid' as const : 'rejected' as const,
          }))
        );
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Upload failed';
        setUploadError(message);
      }
    },
    [uploadMutation, onFilesAdded]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png'],
    },
    onDragEnter: () => setIsDragActive(true),
    onDragLeave: () => setIsDragActive(false),
    onDropAccepted: () => setIsDragActive(false),
  });

  return (
    <div className="space-y-6">
      <div className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-transparent blur opacity-25 group-hover:opacity-40 transition duration-1000" />
        <div
          {...getRootProps()}
          className={cn(
            'relative bg-surface-container border-2 border-dashed rounded-2xl p-12',
            'flex flex-col items-center justify-center text-center transition-all cursor-pointer',
            isDragActive
              ? 'border-primary bg-primary/5'
              : 'border-outline-variant/50 hover:border-primary/50'
          )}
        >
          <input {...getInputProps()} />
          <div className="w-16 h-16 bg-surface-container-high rounded-2xl flex items-center justify-center mb-6 text-primary group-hover:scale-110 transition-transform duration-300">
            <Icon name="add_photo_alternate" size="xl" filled />
          </div>
          <h3 className="text-xl font-bold mb-2">Drag &amp; Drop Geospatial Assets</h3>
          <p className="text-slate-400 max-w-sm mb-8 text-sm">
            Only images (jpg/png). Multiple files required for complete canopy analysis.
          </p>
          <Button
            variant="primary"
            size="md"
            className="shadow-[0_0_20px_rgba(19,236,236,0.3)]"
            disabled={uploadMutation.isPending}
          >
            {uploadMutation.isPending ? 'Uploading...' : 'Select Images'}
          </Button>
        </div>
      </div>

      {uploadError && (
        <div className="bg-error/10 border border-error/30 rounded-lg p-4 text-error">
          <p className="font-semibold">Upload Error</p>
          <p className="text-sm mt-1">{uploadError}</p>
        </div>
      )}

      {uploadSummary && (
        <div className="bg-primary/10 border border-primary/30 rounded-lg p-6 space-y-4">
          <div className="font-semibold text-primary">Upload Successful</div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-slate-400">Files Processed</span>
              <p className="font-semibold text-lg">{uploadSummary.files_processed}</p>
            </div>
            <div>
              <span className="text-slate-400">With GPS Data</span>
              <p className="font-semibold text-lg">{uploadSummary.files_with_gps}</p>
            </div>
            <div>
              <span className="text-slate-400">Project Area</span>
              <p className="font-semibold text-lg">
                {uploadSummary.carbon_credit.area_hectares.toFixed(2)} ha
              </p>
            </div>
            <div>
              <span className="text-slate-400">Carbon Credits</span>
              <p className="font-semibold text-lg text-primary">
                {uploadSummary.carbon_credit.total_credits.toFixed(2)} tCO2e
              </p>
            </div>
          </div>

          {uploadSummary.tx_hash && (
            <div className="pt-2 border-t border-primary/20">
              <span className="text-slate-400 text-xs">TX Hash: </span>
              <a
                href={`https://polygonscan.com/tx/${uploadSummary.tx_hash}`}
                target="_blank"
                rel="noreferrer"
                className="font-mono text-xs text-primary underline"
              >
                {uploadSummary.tx_hash.slice(0, 18)}...
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  );
};