import { getSqlPool } from "../lib/sql";

export async function logAction(userId: string | undefined, action: string, payload?: unknown) {
  try {
    const pool = await getSqlPool();
    await pool.request()
      .input("userId", userId ?? null)
      .input("action", action)
      .input("payload", payload ? JSON.stringify(payload) : null)
      .query("INSERT INTO logs (userId, action, payload) VALUES (@userId, @action, @payload)");
  } catch { /* never block on logging */ }
}
