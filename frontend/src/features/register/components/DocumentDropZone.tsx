import { Icon } from '@/components/common/Icon';

export const DocumentDropZone = () => {
  return (
    <div className="bg-background border-2 border-dashed border-outline-variant/50 p-12 rounded-xl flex flex-col items-center text-center">
      <Icon name="cloud_upload" size="xl" className="text-slate-600 mb-4" filled />
      <p className="text-sm font-medium text-slate-500">Drop supporting documents here</p>
      <p className="text-[10px] text-slate-600 mt-2">
        Max file size: 100MB per file. Formats: PDF, GeoJSON, KML
      </p>
    </div>
  );
};