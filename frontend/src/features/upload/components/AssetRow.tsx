import { Icon } from '@/components/common/Icon';
import { Badge } from '@/components/common/Badge';
import { cn } from '@/lib/utils';

interface AssetRowProps {
  fileName: string;
  timestamp: string;
  hasGPS: boolean;
  status: 'valid' | 'rejected' | 'processing';
  imageSrc: string;
}

export const AssetRow = ({ fileName, timestamp, hasGPS, status, imageSrc }: AssetRowProps) => {
  const isRejected = status === 'rejected';

  return (
    <div
      className={cn(
        'p-4 flex items-center gap-4 hover:bg-surface-container-high/50 transition-colors',
        isRejected && 'bg-error/5 hover:bg-error/10'
      )}
    >
      <div className="w-12 h-12 rounded-lg overflow-hidden bg-surface-container-highest">
        <img
          src={imageSrc}
          alt={fileName}
          className={cn('w-full h-full object-cover', isRejected && 'opacity-50 grayscale')}
          loading="lazy"
        />
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-sm font-bold truncate">{fileName}</p>
        <p className="text-[10px] font-mono text-slate-500">{timestamp}</p>
      </div>

      <div className="flex items-center gap-6 shrink-0">
        <div
          className={cn(
            'flex items-center gap-1.5 px-2 py-1 rounded',
            hasGPS ? 'bg-primary/5' : 'bg-error/10'
          )}
        >
          <Icon
            name={hasGPS ? 'check_circle' : 'cancel'}
            size="sm"
            className={hasGPS ? 'text-primary' : 'text-error'}
            filled
          />
          <span className={cn('text-[10px] font-bold', hasGPS ? 'text-primary' : 'text-error')}>
            GPS {hasGPS ? '\u2713' : '\u2717'}
          </span>
        </div>

        <div className="w-16 text-right">
          <span
            className={cn(
              'text-[10px] font-bold uppercase',
              status === 'valid' && 'text-primary',
              status === 'rejected' && 'text-error',
              status === 'processing' && 'text-tertiary-container'
            )}
          >
            {status === 'valid' ? 'Valid' : status === 'rejected' ? 'Rejected' : 'Processing'}
          </span>
        </div>
      </div>
    </div>
  );
};