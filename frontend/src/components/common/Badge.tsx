import { cn } from '@/lib/utils';

interface BadgeProps {
  variant?: 'verified' | 'retired' | 'pending' | 'default';
  children: React.ReactNode;
  className?: string;
}

export const Badge = ({ variant = 'default', children, className }: BadgeProps) => {
  const variants = {
    verified: 'bg-primary/10 text-primary border-primary/20',
    retired: 'bg-secondary/10 text-secondary border-secondary/20',
    pending: 'bg-surface-container-highest text-slate-400 border-outline-variant/20',
    default: 'bg-surface-container-high text-slate-400 border-outline-variant/20',
  };

  return (
    <span
      className={cn(
        'px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider border',
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
};