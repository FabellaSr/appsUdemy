import { api } from './api';
import type { Member } from '@/interfaces';

export const membersService = {
  list: () => api.get<Member[]>('/members').then((r) => r.data),
  add: (body: { email: string; name: string; role: 'ADMIN' | 'MEMBER' }) =>
    api.post<Member>('/members', body).then((r) => r.data),
  remove: (id: string) => api.delete(`/members/${id}`).then((r) => r.data),
};
