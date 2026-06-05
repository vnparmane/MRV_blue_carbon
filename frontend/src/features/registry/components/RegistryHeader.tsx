import { Icon } from '@/components/common/Icon';
import { StatCard } from './StatCard';

export const RegistryHeader = () => {
  return (
    <header className="mb-16">
      <div className="flex flex-col md:flex-row justify-between items-end gap-8">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 text-primary mb-4">
            <Icon name="verified" size="sm" />
            <span className="text-xs uppercase tracking-[0.2em] font-medium">Immutable Registry</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-black tracking-tighter mb-6">
            Global Carbon <br />
            <span className="text-primary">Ledger</span>
          </h1>
          <p className="text-slate-400 text-lg leading-relaxed">
            Real-time verification of coastal ecosystem restoration. Every credit issued is
            cryptographically anchored to satellite MRV data and local sensory arrays.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 w-full md:w-auto">
          <StatCard
            label="Total Verified"
            value="1,284,092"
            unit="tCO2e ISSUED"
            variant="primary"
          />
          <StatCard
            label="Total Retired"
            value="412,830"
            unit="tCO2e PERMANENT"
            variant="secondary"
          />
        </div>
      </div>
    </header>
  );
};