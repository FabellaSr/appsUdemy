import { Router } from 'express';
import { requireAuth } from '../../middleware/auth.middleware';

export const sectionsRouter = Router();
sectionsRouter.use(requireAuth);

// Mock — en producción esto consulta la tabla de SQL Server con las secciones disponibles
sectionsRouter.get('/', async (_req, res) => {
  res.json([
    { id: 'installations', title: 'Instalaciones', description: 'Gestión de instalaciones AS400', icon: 'Package', enabled: true },
    { id: 'maintenance',   title: 'Mantenimiento', description: 'Tareas de mantenimiento',        icon: 'Wrench',  enabled: false },
    { id: 'updates',       title: 'Actualizaciones', description: 'Updates programados',          icon: 'RefreshCw', enabled: false },
  ]);
});
