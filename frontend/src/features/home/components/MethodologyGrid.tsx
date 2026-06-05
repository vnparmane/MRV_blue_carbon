import SatelliteCard from './SatelliteCard';
import { SensorsCard } from './SensorsCard';
import { BlockchainCard } from './BlockchainCard';
import { CommunityCard } from './CommunityCard';

const MethodologyGrid = () => {
  return (
    <section className="max-w-[1440px] mx-auto px-8 mb-32">
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-on-surface mb-2">Scientific Methodology</h2>
        <div className="w-24 h-1 bg-primary" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <SatelliteCard />
        <SensorsCard />
        <BlockchainCard />
        <CommunityCard />
      </div>
    </section>
  );
};
export default MethodologyGrid;