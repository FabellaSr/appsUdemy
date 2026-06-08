import { Router } from 'express';
import { requireAuth } from '../../middleware/auth.middleware';
import { getSqlPool } from '../../database/sqlserver';

export const sectionsRouter = Router();
sectionsRouter.use(requireAuth);

/**
 * @swagger
 * /sections:
 *   get:
 *     summary: Lista las secciones disponibles en la app (desde SQL Server)
 *     parameters:
 *       - in: query
 *         name: includeDisabled
 *         schema: { type: boolean }
 */
sectionsRouter.get('/', async (req, res, next) => {
  try {
    const includeDisabled = req.query.includeDisabled === 'true' ? 1 : 0;
    const pool = getSqlPool();
    const result = await pool.request()
      .input('includeDisabled', includeDisabled)
      .query(`
        SELECT id, title, description, icon,
               CAST(enabled AS BIT) AS enabled,
               sort_order
        FROM dbo.Sections
        WHERE enabled = 1 OR @includeDisabled = 1
        ORDER BY sort_order, title
      `);
    res.json(result.recordset.map((r) => ({ ...r, enabled: !!r.enabled })));
  } catch (e) {
    next(e);
  }
});
