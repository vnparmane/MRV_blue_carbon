import { cn } from '@/lib/utils';

interface IconProps {
  name: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  filled?: boolean;
  className?: string;
}

const sizeMap: Record<NonNullable<IconProps['size']>, string> = {
  xs: 'text-xs',
  sm: 'text-base',
  md: 'text-xl',
  lg: 'text-2xl',
  xl: 'text-4xl',
};

export const Icon = ({ name, size = 'md', filled = false, className }: IconProps) => {
  return (
    <span
      className={cn('material-symbols-outlined select-none', sizeMap[size], className)}
      style={{ fontVariationSettings: `'FILL' ${filled ? 1 : 0}` }}
    >
      {name}
    </span>
  );
};
