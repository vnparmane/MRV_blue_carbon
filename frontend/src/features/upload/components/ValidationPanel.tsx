import { Icon } from '@/components/common/Icon';
import { Button } from '@/components/common/Button';
import { ProgressBar } from '@/components/common/ProgressBar';
import type { UploadFile } from './UploadGrid';

interface ValidationPanelProps {
  files: UploadFile[];
  onSubmit: () => void;
  isSubmitting: boolean;
}

export const ValidationPanel = ({ files, onSubmit, isSubmitting }: ValidationPanelProps) => {
  const total = files.length;
  const validCount = files.filter((f) => f.status === 'valid').length;
  const gpsCount = files.filter((f) => f.hasGPS).length;
  const gpsPct = total > 0 ? (gpsCount / total) * 100 : 0;
  const isReady = files.length >= 1 && gpsCount >= 1;

  return (
    <div className="glass-panel p-6 rounded-2xl border border-primary/10 flex flex-col gap-8 shadow-xl">
      <div>
        <h2 className="text-lg font-black tracking-tight mb-6">Validation Intelligence</h2>

        <div className="space-y-6">
          <div>
            <div className="flex justify-between items-end mb-2">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                Total Assets
              </span>
              <span className="text-sm font-mono text-primary font-bold">
                {String(validCount).padStart(2, '0')} <span className="text-slate-600">/ {String(total).padStart(2, '0')} REQ</span>
              </span>
            </div>
            <ProgressBar value={total > 0 ? (validCount / total) * 100 : 0} max={100} showLabel={false} />
          </div>

          <div>
            <div className="flex justify-between items-end mb-2">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                GPS Authenticity
              </span>
              <span className="text-sm font-mono text-primary font-bold">
                {String(gpsCount).padStart(2, '0')} <span className="text-slate-600">/ {String(total).padStart(2, '0')} TOTAL</span>
              </span>
            </div>
            <ProgressBar value={gpsPct} max={100} showLabel={false} />
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {!isReady && total > 0 && (
          <div className="flex gap-3 p-4 bg-tertiary-container/10 border border-tertiary-container/20 rounded-xl">
            <Icon name="warning" size="md" className="text-tertiary-container" />
            <p className="text-xs text-tertiary-container font-medium leading-relaxed">
              Upload at least one image with GPS data to proceed.
            </p>
          </div>
        )}
        {isReady && (
          <div className="flex gap-3 p-4 bg-primary/10 border border-primary/20 rounded-xl">
            <Icon name="verified" size="md" className="text-primary" />
            <p className="text-xs text-primary font-medium leading-relaxed">
              Ready for MRV submission. Minimum data density requirements have been met.
            </p>
          </div>
        )}
      </div>

      <div className="pt-4 border-t border-outline-variant/20">
        <Button
          variant="primary"
          size="lg"
          className="w-full gap-3 shadow-[0_0_30px_rgba(19,236,236,0.2)] hover:shadow-[0_0_40px_rgba(19,236,236,0.4)]"
          onClick={onSubmit}
          disabled={!isReady || isSubmitting}
        >
          <span>{isSubmitting ? 'Generating...' : 'Generate MRV Record'}</span>
          <Icon name="arrow_forward_ios" size="sm" />
        </Button>
        <p className="text-[9px] text-center text-slate-500 mt-4 leading-relaxed uppercase tracking-tighter">
          By submitting, you anchor this data to the{' '}
          <span className="text-primary/70">MRV Blue Carbon Immutable Ledger</span>
        </p>
      </div>
    </div>
  );
};