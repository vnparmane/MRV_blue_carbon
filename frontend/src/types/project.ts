export interface Project {
  id: number;
  name: string;
  developer?: string;
  developerEntity?: string;
  location: string;
  ecosystemType: 'Rhizophora' | 'Avicennia' | 'Sonneratia' | 'Mixed Species';
  status: 'draft' | 'pending' | 'verified' | 'retired';
  totalCredits: number;
  createdAt: string;
  tx_hash?: string;
  ipfs_cid?: string;
}

export interface ProjectListResponse {
  projects: Project[];
  total: number;
  page: number;
  pageSize: number;
}