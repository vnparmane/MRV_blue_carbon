import { cn } from '@/lib/utils';

interface EcosystemTypeChipProps {
  label: string;
  selected: boolean;
  onClick: () => void;
}

export const EcosystemTypeChip = ({ label, selected, onClick }: EcosystemTypeChipProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'px-4 py-3 rounded-lg border font-bold text-xs uppercase tracking-tight transition-all',
        selected
          ? 'border-primary bg-primary/10 text-primary'
          : 'border-outline-variant bg-surface-container-low text-slate-400 hover:border-primary/50'
      )}
    >
      {label}
    </button>
  );
};