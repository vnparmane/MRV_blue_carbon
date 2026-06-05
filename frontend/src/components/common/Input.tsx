import { forwardRef, type InputHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';
import { Icon } from './Icon';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, icon, error, className, id, ...props }, ref) => {
    return (
      <div className="space-y-2">
        {label && (
          <label
            htmlFor={id}
            className="text-xs font-bold uppercase tracking-widest text-slate-400"
          >
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <Icon
              name={icon}
              size="sm"
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
            />
          )}
          <input
            ref={ref}
            id={id}
            className={cn(
              'w-full bg-surface-container-low border-outline-variant text-on-surface rounded-lg',
              'focus:ring-primary focus:border-primary py-3',
              icon ? 'pl-10' : 'px-4',
              error && 'border-error focus:ring-error focus:border-error',
              className
            )}
            {...props}
          />
        </div>
        {error && <p className="text-xs text-error">{error}</p>}
      </div>
    );
  }
);
Input.displayName = 'Input';