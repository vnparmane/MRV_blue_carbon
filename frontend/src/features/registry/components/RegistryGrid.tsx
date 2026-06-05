import { FeaturedProjectCard } from './FeaturedProjectCard';
import { VerificationSidebar } from './VerificationSidebar';
import { RegistryTable } from './RegistryTable';

export const RegistryGrid = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Featured Project Card (spans 8 cols) */}
      <div className="lg:col-span-8">
        <FeaturedProjectCard />
      </div>

      {/* Sidebar (spans 4 cols) */}
      <div className="lg:col-span-4 flex flex-col gap-6">
        <VerificationSidebar />
      </div>

      {/* Registry Table (spans full width) */}
      <div className="lg:col-span-12">
        <RegistryTable />
      </div>
    </div>
  );
};