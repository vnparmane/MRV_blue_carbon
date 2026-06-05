import { useMutation } from '@tanstack/react-query';

const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

export interface UploadResponse {
  project_id?: string;
  notes?: string;
  files_processed: number;
  files_with_gps: number;
  coordinates: number[][];
  images: Array<{
    file_name: string;
    latitude?: number;
    longitude?: number;
    timestamp?: string;
    has_gps: boolean;
    content_type: string;
    file_size_bytes: number;
  }>;
  carbon_credit: {
    ndvi: number;
    area_hectares: number;
    agb: number;
    tco2e_per_ha: number;
    total_credits: number;
  };
}

const uploadAsset = async (formData: FormData): Promise<UploadResponse> => {
  const res = await fetch(`${VITE_API_BASE_URL}/assets/upload`, {
    method: 'POST',
    body: formData,
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.detail || `Upload failed: ${res.status}`);
  }

  return res.json();
};

export const useUploadAsset = () => {
  return useMutation({ mutationFn: uploadAsset });
};