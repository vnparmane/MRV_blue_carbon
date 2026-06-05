import { RegistryHeader } from '@/features/registry/components/RegistryHeader';
import { RegistryFilters } from '@/features/registry/components/RegistryFilters';
import { RegistryTable } from '@/features/registry/components/RegistryTable';
import { useProjects } from '@/features/registry/hooks/useProjects';
import { Footer } from '@/components/layout/Footer';
import { useState } from 'react';

const RegistryPage = () => {
  const [filters, setFilters] = useState<{ status: string; location: string }>({
    status: 'all',
    location: '',
  });

  const { data } = useProjects(1, {
    ...(filters.status !== 'all' && { status: filters.status }),
    ...(filters.location && { location: filters.location }),
  });

  return (
    <>
      <main className="pt-32 pb-20 px-8 max-w-[1440px] mx-auto">
        <RegistryHeader />
        <RegistryFilters onFiltersChange={setFilters} />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-12">
            <RegistryTable />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};
export default RegistryPage;