import { NextFunction, Request, Response } from 'express';

export const errorHandler = (err: any, _req: Request, res: Response, _next: NextFunction) => {
  console.error('[error]', err);
  const status = err.status ?? 500;
  res.status(status).json({
    error: err.message ?? 'Internal Server Error',
    detail: err.detail ?? null,
  });
};
