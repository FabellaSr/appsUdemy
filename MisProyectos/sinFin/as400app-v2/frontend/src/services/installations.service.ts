import { api } from './api';

export const installationsService = {
  list: () => api.get('/installations').then(r => r.data),
  detail: (type: string, number: string, seq: string) =>
    api.get(`/installations/${type}/${number}/${seq}`).then(r => r.data),
  start: (body: { tipo: string; numero: string; detalle: string; usuario: string }) =>
    api.post('/installations', body).then(r => r.data),
  installObjects: (type: string, number: string, seq: string, usuario: string) =>
    api.post(`/installations/${type}/${number}/${seq}/objects`, { usuario }).then(r => r.data),
  installSources: (type: string, number: string, seq: string, usuario: string) =>
    api.post(`/installations/${type}/${number}/${seq}/sources`, { usuario }).then(r => r.data),
  backup: (type: string, number: string, seq: string, usuario: string) =>
    api.post(`/installations/${type}/${number}/${seq}/backup`, { usuario }).then(r => r.data),
  modify: (type: string, number: string, seq: string, body: Record<string, unknown>) =>
    api.patch(`/installations/${type}/${number}/${seq}`, body).then(r => r.data),
};
