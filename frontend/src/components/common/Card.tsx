import { forwardRef, type HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'high' | 'low';
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'default', children, ...props }, ref) => {
    const variants = {
      default: 'bg-surface-container border border-outline-variant/10',
      high: 'bg-surface-container-high border border-outline-variant/10',
      low: 'bg-surface-container-low border border-outline-variant/10',
    };

    return (
      <div
        ref={ref}
        className={cn(
          'rounded-xl hover:border-primary/50 transition-colors',
          variants[variant],
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
Card.displayName = 'Card';