import { MapSection } from './MapSection';
import { SequestrationChart } from './SequestrationChart';
import { FieldLogs } from './FieldLogs';
import { SpectralComparison } from './SpectralComparison';

export const DashboardGrid = () => {
  return (
    <section className="grid grid-cols-12 gap-6">
      <MapSection />
      <SequestrationChart />
      <FieldLogs />
      <SpectralComparison />
    </section>
  );
};