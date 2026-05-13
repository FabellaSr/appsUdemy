import { api } from './api';
import type { User } from '@/interfaces';

export const membersService = {
  list: () => api.get<User[]>('/members').then((r) => r.data),
  add: (body: { email: string; name: string; role: 'ADMIN' | 'MEMBER' }) =>
    api.post<User>('/members', body).then((r) => r.data),
  remove: (id: string) => api.delete(`/members/${id}`).then((r) => r.data),
};
