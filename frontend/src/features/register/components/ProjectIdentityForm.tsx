import { Icon } from '@/components/common/Icon';
import { Card } from '@/components/common/Card';
import { Input } from '@/components/common/Input';
import { EcosystemTypeChip } from './EcosystemTypeChip';

const ecosystemTypes = ['Rhizophora', 'Avicennia', 'Sonneratia', 'Mixed Species'];

interface ProjectFormData {
  name: string;
  developerEntity: string;
  ecosystemType: string;
  location: string;
}

interface ProjectIdentityFormProps {
  formData: ProjectFormData;
  onChange: (data: Partial<ProjectFormData>) => void;
}

export const ProjectIdentityForm = ({ formData, onChange }: ProjectIdentityFormProps) => {
  return (
    <Card className="p-8 relative overflow-hidden">
      {/* Decorative icon */}
      <div className="absolute top-0 right-0 p-4 opacity-10">
        <Icon name="eco" size="xl" filled />
      </div>

      <h2 className="text-2xl font-bold text-primary mb-8">Part 1: Project Identity</h2>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Project Name"
            placeholder="e.g. Azure Mangrove Sanctuary"
            id="projectName"
            value={formData.name}
            onChange={(e) => onChange({ name: e.target.value })}
          />
          <Input
            label="Developer Entity"
            placeholder="Organization ID or Name"
            id="developerEntity"
            value={formData.developerEntity}
            onChange={(e) => onChange({ developerEntity: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-widest text-slate-400">
            Mangrove Ecosystem Type
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {ecosystemTypes.map((type) => (
              <EcosystemTypeChip
                key={type}
                label={type}
                selected={formData.ecosystemType === type}
                onClick={() => onChange({ ecosystemType: type })}
              />
            ))}
          </div>
        </div>

        <Input
          label="Primary Location / Region"
          placeholder="Search coordinates or administrative area..."
          id="location"
          icon="location_on"
          value={formData.location}
          onChange={(e) => onChange({ location: e.target.value })}
        />
      </div>
    </Card>
  );
};