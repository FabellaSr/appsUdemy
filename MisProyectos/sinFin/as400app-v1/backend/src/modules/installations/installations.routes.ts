import { Router } from 'express';
import { z } from 'zod';
import { as400 } from '../../services/as400.client';
import { requireAuth } from '../../middleware/auth.middleware';

export const installationsRouter = Router();
installationsRouter.use(requireAuth);

/**
 * @swagger
 * /installations:
 *   get: { summary: "Listar instalaciones (WSRIWL)" }
 *   post: { summary: "Iniciar instalación (WSPIW1)" }
 */
installationsRouter.get('/', async (_req, res, next) => {
  try { res.json(await as400.list()); } catch (e) { next(e); }
});

const startSchema = z.object({
  tipo: z.string(),
  numero: z.string(),
  detalle: z.string(),
  usuario: z.string(),
});
installationsRouter.post('/', async (req, res, next) => {
  try { res.json(await as400.startInstallation(startSchema.parse(req.body))); }
  catch (e) { next(e); }
});

installationsRouter.get('/:type/:number/:seq', async (req, res, next) => {
  try {
    const { type, number, seq } = req.params;
    res.json(await as400.detail(type, number, seq));
  } catch (e) { next(e); }
});

installationsRouter.patch('/:type/:number/:seq', async (req, res, next) => {
  try {
    const { type, number, seq } = req.params;
    res.json(await as400.changeInstallation({
      tipo: type, numero: number, secuencia: seq, ...req.body,
    }));
  } catch (e) { next(e); }
});

installationsRouter.post('/:type/:number/:seq/objects', async (req, res, next) => {
  try {
    const { type, number, seq } = req.params;
    res.json(await as400.installObjects({
      tipo: type, numero: number, secuencia: seq, usuario: req.body?.usuario,
    }));
  } catch (e) { next(e); }
});

installationsRouter.post('/:type/:number/:seq/sources', async (req, res, next) => {
  try {
    const { type, number, seq } = req.params;
    res.json(await as400.installSources({
      tipo: type, numero: number, secuencia: seq, usuario: req.body?.usuario,
    }));
  } catch (e) { next(e); }
});

installationsRouter.post('/:type/:number/:seq/backup', async (req, res, next) => {
  try {
    const { type, number, seq } = req.params;
    res.json(await as400.backup({
      tipo: type, numero: number, secuencia: seq, usuario: req.body?.usuario,
    }));
  } catch (e) { next(e); }
});
