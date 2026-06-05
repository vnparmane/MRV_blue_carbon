import { Icon } from '@/components/common/Icon';
import { Card } from '@/components/common/Card';
import { cn } from '@/lib/utils';

interface TrendProps {
  value: number;
  direction: 'up' | 'down' | 'neutral';
  label: string;
}

interface KPICardProps {
  label: string;
  value: string;
  unit: string;
  icon: string;
  valuePrefix?: string;
  trend?: TrendProps;
  footer?: string;
}

export const KPICard = ({
  label,
  value,
  unit,
  icon,
  valuePrefix = '',
  trend,
  footer,
}: KPICardProps) => {
  return (
    <Card className="p-6 group">
      <div className="flex justify-between items-start mb-4">
        <span className="text-slate-400 text-xs uppercase tracking-widest font-semibold">{label}</span>
        <Icon name={icon} size="md" className="text-primary" />
      </div>
      <div className="text-3xl font-bold text-on-surface mb-1 font-mono">
        {valuePrefix}
        {value}
        <span className="text-sm font-sans font-normal ml-2 text-slate-500">{unit}</span>
      </div>
      {trend && (
        <div className="text-xs text-primary flex items-center gap-1">
          <Icon
            name={trend.direction === 'up' ? 'trending_up' : trend.direction === 'down' ? 'trending_down' : 'check_circle'}
            size="sm"
          />
          <span>
            {trend.direction === 'up' && '+'}
            {trend.value}% {trend.label}
          </span>
        </div>
      )}
      {footer && <div className="text-xs text-slate-500 mt-1">{footer}</div>}
    </Card>
  );
};