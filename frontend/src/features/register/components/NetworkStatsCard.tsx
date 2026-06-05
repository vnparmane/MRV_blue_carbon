import { Icon } from '@/components/common/Icon';
import { Card } from '@/components/common/Card';

export const NetworkStatsCard = () => {
  return (
    <Card className="p-8">
      <h3 className="text-xs font-bold uppercase tracking-widest text-primary mb-6">
        Real-time Network Stats
      </h3>
      <div className="space-y-6">
        <div className="flex justify-between items-end border-b border-outline-variant/20 pb-4">
          <div>
            <span className="block text-[10px] text-slate-500 font-mono">NODE_UPTIME</span>
            <span className="text-2xl font-bold font-mono tracking-tighter">99.998%</span>
          </div>
          <div className="text-right">
            <span className="block text-[10px] text-slate-500 font-mono">GAS_FEE</span>
            <span className="text-sm font-bold font-mono text-primary">0.0012 CM</span>
          </div>
        </div>
        <div className="flex justify-between items-end">
          <div>
            <span className="block text-[10px] text-slate-500 font-mono">TOTAL_MTCO2e_LOCKED</span>
            <span className="text-2xl font-bold font-mono tracking-tighter">12.4M</span>
          </div>
          <div className="text-right">
            <Icon name="show_chart" size="md" className="text-primary" />
          </div>
        </div>
      </div>
    </Card>
  );
};