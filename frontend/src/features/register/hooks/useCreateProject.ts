import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';
import type { Project } from '@/types/project';

interface CreateProjectPayload {
  name: string;
  developerEntity: string;
  ecosystemType: string;
  location: string;
}

const createProject = async (payload: CreateProjectPayload): Promise<Project> => {
  return api.post<Project>('/projects', payload);
};

export const useCreateProject = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createProject,
    onSuccess: () => {
      // Invalidate projects list to refetch
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
  });
};