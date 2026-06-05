import { useCreateProject } from '../hooks/useCreateProject';
import { Button } from '@/components/common/Button';
import { toast } from 'sonner';

interface ProjectFormData {
  name: string;
  developerEntity: string;
  ecosystemType: string;
  location: string;
}

interface FormActionsProps {
  formData: ProjectFormData;
  onStepComplete: (projectId: number | null) => void;
}

export const FormActions = ({ formData, onStepComplete }: FormActionsProps) => {
  const { mutate: createProject, isPending } = useCreateProject();

  const handleSaveDraft = () => {
    toast.success('Draft saved locally');
  };

  const handleProceed = () => {
    if (!formData.name || !formData.developerEntity || !formData.location) {
      toast.error('Please fill in all required fields');
      return;
    }

    createProject(
      {
        name: formData.name,
        developerEntity: formData.developerEntity,
        ecosystemType: formData.ecosystemType,
        location: formData.location,
      },
      {
        onSuccess: (data) => {
          toast.success('Project created. Redirecting to upload...');
          onStepComplete(data.id);
        },
        onError: (err) => {
          toast.error(err.message || 'Failed to create project');
        },
      }
    );
  };

  return (
    <div className="flex justify-between items-center pt-8">
      <Button
        variant="outline"
        size="md"
        onClick={handleSaveDraft}
        disabled={isPending}
      >
        Save Draft
      </Button>
      <Button
        variant="primary"
        size="lg"
        className="shadow-[0_0_20px_rgba(19,236,236,0.3)]"
        onClick={handleProceed}
        disabled={isPending}
      >
        {isPending ? 'Creating...' : 'Proceed to Baseline'}
      </Button>
    </div>
  );
};