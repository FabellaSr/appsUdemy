import { Router } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import { UserModel } from './user.model';

export const authRouter = Router();

const credsSchema = z.object({
  username: z.string().min(3),
  password: z.string().min(6),
  role: z.enum(['ADMIN', 'MEMBER']).optional(),
});

authRouter.post('/register', async (req, res, next) => {
  try {
    const { username, password, role } = credsSchema.parse(req.body);
    const passwordHash = await bcrypt.hash(password, 10);
    const user = await UserModel.create({ username, passwordHash, role: role ?? 'MEMBER' });
    res.status(201).json({ id: user.id, username: user.username, role: user.role });
  } catch (e) { next(e); }
});

authRouter.post('/login', async (req, res, next) => {
  try {
    const { username, password } = credsSchema.parse(req.body);
    const user = await UserModel.findOne({ username });
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });
    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) return res.status(401).json({ error: 'Invalid credentials' });
    const token = jwt.sign(
      { sub: user.id, username: user.username, role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: '8h' },
    );
    res.json({ token, user: { id: user.id, username: user.username, role: user.role } });
  } catch (e) { next(e); }
});
