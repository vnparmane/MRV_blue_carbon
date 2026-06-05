const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

interface ApiError extends Error {
  status?: number;
  info?: any;
}

async function fetcher<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    ...options,
  });

  if (!res.ok) {
    const error: ApiError = new Error('An error occurred while fetching the data.');
    error.status = res.status;
    try {
      error.info = await res.json();
    } catch {
      error.info = await res.text();
    }
    throw error;
  }

  // Handle 204 No Content
  if (res.status === 204) return null as T;
  return res.json();
}

export const api = {
  get: <T>(endpoint: string, options?: RequestInit) =>
    fetcher<T>(endpoint, { ...options, method: 'GET' }),

  post: <T>(endpoint: string, data?: unknown, options?: RequestInit) => {
    // Skip JSON serialization if data is FormData
    const isFormData = data instanceof FormData;
    return fetcher<T>(endpoint, {
      ...options,
      method: 'POST',
      body: isFormData ? data : JSON.stringify(data),
      headers: isFormData ? {} : { 'Content-Type': 'application/json', ...options?.headers },
    });
  },

  put: <T>(endpoint: string, data?: unknown, options?: RequestInit) =>
    fetcher<T>(endpoint, {
      ...options,
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  delete: <T>(endpoint: string, options?: RequestInit) =>
    fetcher<T>(endpoint, { ...options, method: 'DELETE' }),
};