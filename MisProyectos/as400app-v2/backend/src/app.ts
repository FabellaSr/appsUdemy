import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './config/swagger';
import { authRouter } from './auth/auth.routes';
import { installationsRouter } from './modules/installations/installations.routes';
import { sectionsRouter } from './modules/sections/sections.routes';
import { errorHandler } from './middleware/error.middleware';

export const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '5mb' }));
app.use(rateLimit({ windowMs: 60_000, max: 200 }));

app.get('/api/health', (_req, res) => res.json({ ok: true }));
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/api/auth', authRouter);
app.use('/api/sections', sectionsRouter);
app.use('/api/installations', installationsRouter);

app.use(errorHandler);
