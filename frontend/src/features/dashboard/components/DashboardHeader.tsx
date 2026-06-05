import { Icon } from '@/components/common/Icon';

export const DashboardHeader = () => {
  return (
    <div className="flex justify-between items-center bg-surface-container rounded-xl p-6 border border-outline-variant/10">
      <div className="flex items-center gap-4">
        <Icon name="monitoring" size="lg" className="text-primary" />
        <div>
          <h1 className="text-2xl font-bold tracking-tight">System Monitor</h1>
          <p className="text-sm text-slate-400">Global MRV network status</p>
        </div>
      </div>
      <div>
        <span className="text-xs uppercase tracking-widest text-primary border border-primary/20 px-3 py-1 rounded-full">
          Live Feed
        </span>
      </div>
    </div>
  );
};