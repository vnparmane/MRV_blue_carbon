import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import type { ProjectListResponse } from '@/types/project';

const fetchProjects = async (page = 1, filters?: Record<string, string>): Promise<ProjectListResponse> => {
  const params = new URLSearchParams({ page: String(page), ...filters });
  return api.get<ProjectListResponse>(`/projects?${params}`);
};

export const useProjects = (page: number, filters?: Record<string, string>) => {
  return useQuery({
    queryKey: ['projects', { page, ...filters }],
    queryFn: () => fetchProjects(page, filters),
  });
};