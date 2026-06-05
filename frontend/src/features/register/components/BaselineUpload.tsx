import { useNavigate } from 'react-router-dom';
import { Icon } from '@/components/common/Icon';
import { Button } from '@/components/common/Button';
import { Card } from '@/components/common/Card';

interface BaselineUploadProps {
  projectId: number | null;
  onNext: () => void;
  onBack: () => void;
}

export const BaselineUpload = ({ projectId, onNext, onBack }: BaselineUploadProps) => {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div className="lg:col-span-7 space-y-8">
        <Card className="p-8">
          <h3 className="text-lg font-bold mb-4">Upload Baseline Data</h3>
          <p className="text-slate-400 text-sm mb-6">
            Upload GPS-tagged field images to calculate your project&apos;s baseline carbon metrics.
            At least 10 images with GPS coordinates are required.
          </p>
          <div className="bg-surface-container rounded-xl p-12 border border-dashed border-outline-variant/50 flex flex-col items-center text-center">
            <Icon name="satellite_alt" size="xl" className="text-primary mb-4" filled />
            <p className="text-sm text-slate-400 mb-4">GPS-tagged field images (JPG/PNG)</p>
            <Button
              variant="primary"
              onClick={() => {
                if (projectId) {
                  navigate(`/upload?project_id=${projectId}`);
                } else {
                  navigate('/upload');
                }
              }}
            >
              Open Upload Page
            </Button>
          </div>
        </Card>
      </div>
      <div className="lg:col-span-5 space-y-8">
        <Card className="p-6">
          <h4 className="text-sm font-bold mb-4">What happens next</h4>
          <ul className="space-y-3 text-sm text-slate-400">
            <li className="flex gap-3">
              <Icon name="check" size="sm" className="text-primary shrink-0 mt-0.5" />
              Satellite imagery analysis via Sentinel-2
            </li>
            <li className="flex gap-3">
              <Icon name="check" size="sm" className="text-primary shrink-0 mt-0.5" />
              NDVI calculation for canopy health
            </li>
            <li className="flex gap-3">
              <Icon name="check" size="sm" className="text-primary shrink-0 mt-0.5" />
              AGB and tCO2e estimation
            </li>
            <li className="flex gap-3">
              <Icon name="check" size="sm" className="text-primary shrink-0 mt-0.5" />
              On-chain credit minting
            </li>
          </ul>
        </Card>
      </div>
    </div>
  );
};