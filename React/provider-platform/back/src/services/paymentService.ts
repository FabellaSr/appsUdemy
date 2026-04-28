import { getSqlPool } from "../lib/sql";
import { v4 as uuid } from "uuid";

export const paymentService = {
  async list(providerId?: string) {
    const pool = await getSqlPool();
    const q = providerId
      ? pool.request().input("p", providerId).query("SELECT * FROM payments WHERE providerId=@p ORDER BY paymentDate DESC")
      : pool.request().query("SELECT * FROM payments ORDER BY paymentDate DESC");
    return (await q).recordset;
  },
  async create(input: { providerId: string; amount: number; receiptNumber?: string; }) {
    const pool = await getSqlPool();
    const id = uuid();
    await pool.request()
      .input("id", id).input("providerId", input.providerId)
      .input("amount", input.amount).input("receipt", input.receiptNumber ?? null)
      .query(`INSERT INTO payments (id,providerId,amount,receiptNumber,status) VALUES (@id,@providerId,@amount,@receipt,'pending')`);
    return (await pool.request().input("id", id).query("SELECT * FROM payments WHERE id=@id")).recordset[0];
  },
  async confirm(id: string) {
    const pool = await getSqlPool();
    await pool.request().input("id", id).query("UPDATE payments SET status='confirmed', confirmationDate=SYSUTCDATETIME() WHERE id=@id");
    return (await pool.request().input("id", id).query("SELECT * FROM payments WHERE id=@id")).recordset[0];
  },
};
