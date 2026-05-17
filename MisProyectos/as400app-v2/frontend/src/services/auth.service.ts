import { api } from './api';
import type { User } from '@/interfaces';

export const authService = {
  login: (username: string, password: string) =>
    api.post<{ token: string; user: User }>('/auth/login', { username, password }).then(r => r.data),
  register: (username: string, password: string, role: 'ADMIN' | 'MEMBER' = 'MEMBER') =>
    api.post('/auth/register', { username, password, role }).then(r => r.data),
};
