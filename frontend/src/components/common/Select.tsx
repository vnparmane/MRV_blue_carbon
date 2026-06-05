import { cn } from '@/lib/utils';

interface SelectProps {
  value: string;
  onChange: (value: string) => void;
  options: string[];
  className?: string;
}

export const Select = ({ value, onChange, options, className }: SelectProps) => {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={cn(
        'bg-transparent border-none p-0 text-on-surface focus:ring-0 cursor-pointer font-medium',
        className
      )}
    >
      {options.map((opt) => (
        <option key={opt} value={opt} className="bg-surface-container-high">
          {opt}
        </option>
      ))}
    </select>
  );
};