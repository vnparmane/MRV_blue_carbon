import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';

export interface DashboardStats {
  total_projects: number;
  verified_projects: number;
  pending_projects: number;
  total_credits_issued: number;
}

const fetchDashboardStats = async (): Promise<DashboardStats> => {
  return api.get<DashboardStats>('/dashboard/stats');
};

export const useDashboardStats = () => {
  return useQuery({
    queryKey: ['dashboard', 'stats'],
    queryFn: fetchDashboardStats,
  });
};