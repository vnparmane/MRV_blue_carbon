import { KPICard } from './KPICard';
import { useDashboardStats } from '../hooks/useDashboardStats';

export const KPIGrid = () => {
  const { data, isLoading } = useDashboardStats();

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <KPICard
        label="Total Sequestration"
        value={isLoading ? '...' : (data?.total_credits_issued ?? 0).toFixed(1)}
        unit="tCO2e"
        icon="energy_savings_leaf"
        trend={data ? { value: 0, direction: 'neutral' as const, label: `${data.total_projects} projects` } : undefined}
      />
      <KPICard
        label="Verified Projects"
        value={isLoading ? '...' : String(data?.verified_projects ?? 0)}
        unit="PRJ"
        icon="verified_user"
        footer="On-chain verified"
      />
      <KPICard
        label="Pending Review"
        value={isLoading ? '...' : String(data?.pending_projects ?? 0)}
        unit="PRJ"
        icon="pending_actions"
      />
      <KPICard
        label="Total Projects"
        value={isLoading ? '...' : String(data?.total_projects ?? 0)}
        unit="PRJ"
        icon="folder"
      />
    </section>
  );
};