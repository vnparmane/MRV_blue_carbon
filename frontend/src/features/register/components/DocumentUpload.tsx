import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Icon } from '@/components/common/Icon';
import { Button } from '@/components/common/Button';
import { Card } from '@/components/common/Card';
import { useUploadDocument } from '@/features/upload/hooks/useUploadDocument';
import { cn } from '@/lib/utils';

interface DocumentUploadProps {
  projectId: number | null;
  onBack: () => void;
}

export const DocumentUpload = ({ projectId, onBack }: DocumentUploadProps) => {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const uploadDoc = useUploadDocument();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setUploadedFiles((prev) => [...prev, ...acceptedFiles]);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/json': ['.json', '.geojson'],
      'application/vnd.google-earth.kml+xml': ['.kml'],
    },
  });

  const handleSubmit = async () => {
    if (!projectId || uploadedFiles.length === 0) return;
    await uploadDoc.mutateAsync({ projectId, files: uploadedFiles });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div className="lg:col-span-7 space-y-8">
        <Card className="p-8">
          <h3 className="text-lg font-bold mb-4">Upload Supporting Documents</h3>
          <p className="text-slate-400 text-sm mb-6">
            Upload PDF, GeoJSON, or KML files to support your project registration.
          </p>

          <div
            {...getRootProps()}
            className={cn(
              'bg-surface-container border-2 border-dashed border-outline-variant/50 rounded-xl p-12',
              'flex flex-col items-center text-center cursor-pointer hover:border-primary/50 transition-colors'
            )}
          >
            <input {...getInputProps()} />
            <Icon name="cloud_upload" size="xl" className="text-primary mb-4" filled />
            <p className="text-sm text-slate-400 mb-2">Drop files here or click to browse</p>
            <p className="text-xs text-slate-600">Max 100MB per file. PDF, GeoJSON, KML</p>
          </div>

          {uploadedFiles.length > 0 && (
            <ul className="mt-4 space-y-2">
              {uploadedFiles.map((f, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-slate-400">
                  <Icon name="attach_file" size="sm" className="text-primary" />
                  {f.name}
                </li>
              ))}
            </ul>
          )}
        </Card>

        <div className="flex justify-between items-center pt-8">
          <Button variant="outline" size="md" onClick={onBack}>
            Back
          </Button>
          <Button
            variant="primary"
            size="lg"
            className="shadow-[0_0_20px_rgba(19,236,236,0.3)]"
            onClick={handleSubmit}
            disabled={!projectId || uploadedFiles.length === 0 || uploadDoc.isPending}
          >
            {uploadDoc.isPending ? 'Uploading...' : 'Complete Registration'}
          </Button>
        </div>
      </div>
      <div className="lg:col-span-5 space-y-8">
        <Card className="p-6">
          <h4 className="text-sm font-bold mb-4">Required Documents</h4>
          <ul className="space-y-3 text-sm text-slate-400">
            <li className="flex gap-3">
              <Icon name="description" size="sm" className="text-slate-500 shrink-0" />
              Land ownership proof (PDF)
            </li>
            <li className="flex gap-3">
              <Icon name="map" size="sm" className="text-slate-500 shrink-0" />
              Project boundary shapefile (GeoJSON/KML)
            </li>
            <li className="flex gap-3">
              <Icon name="science" size="sm" className="text-slate-500 shrink-0" />
              Prior baseline study (optional)
            </li>
          </ul>
        </Card>
      </div>
    </div>
  );
};