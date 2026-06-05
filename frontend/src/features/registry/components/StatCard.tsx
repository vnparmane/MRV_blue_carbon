import { cn } from '@/lib/utils';

interface StatCardProps {
  label: string;
  value: string;
  unit: string;
  variant?: 'primary' | 'secondary';
}

export const StatCard = ({ label, value, unit, variant = 'primary' }: StatCardProps) => {
  return (
    <div className="bg-surface-container p-6 rounded-xl border border-outline-variant/10">
      <div className="text-slate-400 text-xs uppercase tracking-widest mb-1">{label}</div>
      <div
        className={cn(
          'text-3xl font-bold data-mono',
          variant === 'primary' ? 'text-primary' : 'text-secondary'
        )}
      >
        {value}
      </div>
      <div className="text-[10px] text-slate-500 mt-1">{unit}</div>
    </div>
  );
};
