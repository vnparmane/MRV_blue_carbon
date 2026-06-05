import { forwardRef, type InputHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';
import { Icon } from './Icon';

interface SearchInputProps extends InputHTMLAttributes<HTMLInputElement> {}

export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  ({ className, ...props }, ref) => {
    return (
      <div className="relative w-full group">
        <Icon
          name="search"
          size="sm"
          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-primary transition-colors"
        />
        <input
          ref={ref}
          type="text"
          className={cn(
            'w-full bg-surface-container-high border-none rounded-lg pl-12 pr-4 py-3 text-sm',
            'focus:ring-1 focus:ring-primary placeholder:text-slate-500',
            className
          )}
          {...props}
        />
      </div>
    );
  }
);
SearchInput.displayName = 'SearchInput';