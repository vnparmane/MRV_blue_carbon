import { useMutation } from '@tanstack/react-query';

const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

export interface UploadDocumentResponse {
  project_id: number;
  files_received: number;
  status: string;
}

const uploadDocument = async (projectId: number, files: File[]): Promise<UploadDocumentResponse> => {
  const formData = new FormData();
  files.forEach((file) => formData.append('files', file));

  const res = await fetch(`${VITE_API_BASE_URL}/projects/${projectId}/documents`, {
    method: 'POST',
    body: formData,
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.detail || `Upload failed: ${res.status}`);
  }

  return res.json();
};

export const useUploadDocument = () => {
  return useMutation({
    mutationFn: ({ projectId, files }: { projectId: number; files: File[] }) =>
      uploadDocument(projectId, files),
  });
};