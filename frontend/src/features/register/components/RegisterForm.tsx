import { useState } from 'react';
import { ProjectIdentityForm } from './ProjectIdentityForm';
import { RequirementsSidebar } from './RequirementsSidebar';
import { NetworkStatsCard } from './NetworkStatsCard';
import { DocumentDropZone } from './DocumentDropZone';
import { FormActions } from './FormActions';

interface ProjectFormData {
  name: string;
  developerEntity: string;
  ecosystemType: string;
  location: string;
}

interface RegisterFormProps {
  onStepComplete: (projectId: number | null) => void;
}

export const RegisterForm = ({ onStepComplete }: RegisterFormProps) => {
  const [formData, setFormData] = useState<ProjectFormData>({
    name: '',
    developerEntity: '',
    ecosystemType: 'Rhizophora',
    location: '',
  });

  const handleFormChange = (data: Partial<ProjectFormData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div className="lg:col-span-7 space-y-8">
        <ProjectIdentityForm formData={formData} onChange={handleFormChange} />
        <FormActions formData={formData} onStepComplete={onStepComplete} />
      </div>

      <div className="lg:col-span-5 space-y-8">
        <RequirementsSidebar />
        <NetworkStatsCard />
        <DocumentDropZone />
      </div>
    </div>
  );
};