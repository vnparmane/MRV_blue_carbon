import { useState } from 'react';
import { Icon } from '@/components/common/Icon';
import { SearchInput } from '@/components/common/SearchInput';
import { Select } from '@/components/common/Select';
import { Button } from '@/components/common/Button';

interface RegistryFiltersProps {
  onFiltersChange: (filters: { status: string; location: string }) => void;
}

export const RegistryFilters = ({ onFiltersChange }: RegistryFiltersProps) => {
  const [status, setStatus] = useState('all');
  const [location, setLocation] = useState('');

  const statusOptions = ['all', 'draft', 'pending', 'verified', 'retired'];
  const locationOptions = ['', 'Southeast Asia', 'West Africa', 'Caribbean', 'Pacific Islands'];

  const handleStatusChange = (val: string) => {
    setStatus(val);
    onFiltersChange({ status: val, location });
  };

  const handleLocationChange = (val: string) => {
    setLocation(val);
    onFiltersChange({ status, location: val });
  };

  return (
    <section className="mb-8 flex flex-col md:flex-row gap-4 items-center justify-between bg-surface-container-low p-2 rounded-xl">
      <div className="relative w-full md:w-96 group">
        <SearchInput placeholder="Search by Project ID, Developer, or Hash..." />
      </div>

      <div className="flex flex-wrap gap-3 w-full md:w-auto">
        <div className="flex items-center gap-2 bg-surface-container-high px-4 py-3 rounded-lg text-sm border border-outline-variant/10">
          <span className="text-slate-500">Location:</span>
          <Select
            value={location}
            onChange={handleLocationChange}
            options={locationOptions}
            className="min-w-[140px]"
          />
        </div>

        <div className="flex items-center gap-2 bg-surface-container-high px-4 py-3 rounded-lg text-sm border border-outline-variant/10">
          <span className="text-slate-500">Status:</span>
          <Select
            value={status}
            onChange={handleStatusChange}
            options={statusOptions}
            className="min-w-[120px]"
          />
        </div>

        <Button variant="ghost" size="md" className="gap-2">
          <Icon name="tune" size="sm" />
          Advanced Filters
        </Button>
      </div>
    </section>
  );
};