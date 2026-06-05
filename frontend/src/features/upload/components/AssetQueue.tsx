import { Card } from '@/components/common/Card';
import { AssetRow } from './AssetRow';
import type { UploadFile } from './UploadGrid';

interface AssetQueueProps {
  files: UploadFile[];
}

export const AssetQueue = ({ files }: AssetQueueProps) => {
  return (
    <Card className="overflow-hidden" variant="low">
      <div className="px-6 py-4 border-b border-outline-variant/20 flex justify-between items-center">
        <h4 className="text-xs font-black uppercase tracking-[0.2em] text-slate-500">Asset Queue</h4>
        <span className="text-xs text-primary font-mono">{files.length} FILES PREPARED</span>
      </div>
      <div className="divide-y divide-outline-variant/10">
        {files.length === 0 && (
          <div className="py-12 text-center text-slate-500 text-sm">
            Drop images above to populate the queue
          </div>
        )}
        {files.map((asset, idx) => (
          <AssetRow
            key={idx}
            fileName={asset.file.name}
            timestamp={new Date(asset.file.lastModified).toLocaleString()}
            hasGPS={asset.hasGPS}
            status={asset.status}
            imageSrc={asset.preview}
          />
        ))}
      </div>
    </Card>
  );
};