import { api, API_BASE } from './client';
import type { Provider, Work, Payment, Notification, User } from '../types';

export const auth = {
  login: (email: string, password: string) =>
    api.post<{ access_token: string; user: User }>('/auth/login', { email, password }),
  me: () => api.get<User>('/auth/me'),
};

export const providers = {
  list: () => api.get<Provider[]>('/providers'),
  get: (id: string) => api.get<Provider>(`/providers/${id}`),
  create: (data: any) => api.post<Provider>('/providers', data),
  update: (id: string, data: any) => api.patch<Provider>(`/providers/${id}`, data),
  remove: (id: string) => api.delete(`/providers/${id}`),
};

export const works = {
  list: () => api.get<Work[]>('/works'),
  get: (id: string) => api.get<Work>(`/works/${id}`),
  create: (data: any) => api.post<Work>('/works', data),
  update: (id: string, data: any) => api.patch<Work>(`/works/${id}`, data),
  remove: (id: string) => api.delete(`/works/${id}`),
};

export const uploads = {
  photo: (file: File) => {
    const fd = new FormData();
    fd.append('file', file);
    return api.post<{ url: string }>('/uploads/work-photo', fd, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
};

export const payments = {
  list: () => api.get<Payment[]>('/payments'),
  create: (data: any) => api.post<Payment>('/payments', data),
  update: (id: string, data: any) => api.patch<Payment>(`/payments/${id}`, data),
};

export const notifications = {
  list: () => api.get<Notification[]>('/notifications'),
  create: (data: any) => api.post<Notification>('/notifications', data),
  markRead: (id: string) => api.patch<Notification>(`/notifications/${id}/read`),
};

export function fileUrl(path?: string) {
  if (!path) return '';
  if (path.startsWith('http')) return path;
  return `${API_BASE}${path}`;
}
