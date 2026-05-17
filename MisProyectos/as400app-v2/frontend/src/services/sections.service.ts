import { api } from './api';
import type { Section } from '@/interfaces';

export const sectionsService = {
  list: () => api.get<Section[]>('/sections').then(r => r.data),
};
