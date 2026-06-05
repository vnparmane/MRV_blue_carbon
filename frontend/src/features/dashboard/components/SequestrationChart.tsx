import { Icon } from '@/components/common/Icon';
import { Card } from '@/components/common/Card';
import { ProgressBar } from '@/components/common/ProgressBar';

const monthlyData = [
  { month: 'JAN', value: 1.2, height: 40 },
  { month: 'FEB', value: 1.5, height: 55 },
  { month: 'MAR', value: 1.4, height: 48 },
  { month: 'APR', value: 1.8, height: 70 },
  { month: 'MAY', value: 2.1, height: 85 },
  { month: 'JUN', value: 2.4, height: 95 },
  { month: 'JUL', value: 2.2, height: 80 },
  { month: 'AUG', value: 1.9, height: 65 },
  { month: 'SEP', value: 2.0, height: 72 },
  { month: 'OCT', value: 2.3, height: 88 },
  { month: 'NOV', value: 2.5, height: 98 },
  { month: 'DEC', value: 2.8, height: 100 },
];

export const SequestrationChart = () => {
  return (
    <div className="col-span-12 lg:col-span-4">
      <Card className="p-6 flex flex-col h-full">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h3 className="text-lg font-bold tracking-tight">Sequestration Rates</h3>
            <p className="text-xs text-slate-400">Net Carbon flux over 12 months</p>
          </div>
          <Icon name="show_chart" size="md" className="text-primary" />
        </div>

        {/* Bar Chart */}
        <div className="flex-grow flex flex-col justify-end gap-2 h-64">
          <div className="flex items-end gap-2 h-full">
            {monthlyData.filter((_, i) => i % 3 === 0).map((item, idx) => (
              <div
                key={idx}
                className="flex-grow bg-primary/40 hover:bg-primary/60 transition-colors rounded-t-sm relative group"
                style={{ height: `${item.height}%` }}
              >
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 text-[10px] font-mono text-primary transition-opacity">
                  {item.value}
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-between text-[10px] text-slate-500 font-mono pt-2 border-t border-outline-variant/20">
            <span>JAN</span>
            <span>APR</span>
            <span>JUL</span>
            <span>OCT</span>
          </div>
        </div>

        {/* Validation Protocol */}
        <div className="mt-8 p-4 bg-surface-container-low rounded-lg border border-outline-variant/10">
          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-400">Validation Protocol</span>
            <span className="text-primary font-mono">VERRA VM0033</span>
          </div>
          <div className="mt-3">
            <ProgressBar value={88} max={100} showLabel={false} />
          </div>
          <div className="mt-2 text-[10px] text-slate-500 flex justify-between">
            <span>Audit Readiness</span>
            <span>88% Verified</span>
          </div>
        </div>
      </Card>
    </div>
  );
};