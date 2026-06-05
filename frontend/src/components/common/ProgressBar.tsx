import { cn } from '@/lib/utils';

interface ProgressBarProps {
  value: number;
  max?: number;
  showLabel?: boolean;
  className?: string;
  barClassName?: string;
}

export const ProgressBar = ({
  value,
  max = 100,
  showLabel = true,
  className,
  barClassName,
}: ProgressBarProps) => {
  const percentage = Math.min((value / max) * 100, 100);

  return (
    <div className={cn('space-y-1', className)}>
      <div className="h-1 bg-surface-container-highest w-full rounded-full overflow-hidden">
        <div
          className={cn('bg-primary h-full rounded-full transition-all', barClassName)}
          style={{ width: `${percentage}%` }}
        />
      </div>
      {showLabel && (
        <div className="flex justify-between text-xs">
          <span className="text-slate-500">Progress</span>
          <span className="text-primary font-mono">{percentage.toFixed(1)}%</span>
        </div>
      )}
    </div>
  );
};