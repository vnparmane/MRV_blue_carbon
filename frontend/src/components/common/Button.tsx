import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
    const variants = {
      primary: 'bg-primary text-on-primary hover:bg-primary/90 shadow-sm shadow-primary/20',
      secondary: 'bg-surface-container-high text-on-surface hover:bg-surface-bright border border-outline-variant',
      ghost: 'bg-transparent text-on-surface-variant hover:bg-surface-container-low',
      outline: 'border border-outline-variant text-on-surface hover:bg-surface-container-low',
    };

    const sizes = {
      sm: 'px-4 py-1.5 text-xs rounded-lg',
      md: 'px-6 py-2 text-sm rounded-lg',
      lg: 'px-8 py-3 text-base rounded-xl',
    };

    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center font-bold transition-all active:scale-95',
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);
Button.displayName = 'Button';