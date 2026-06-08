import { getSqlPool } from "../lib/sql";
import { v4 as uuid } from "uuid";

export const collectionService = {
  async listAll() {
    const pool = await getSqlPool();
    const r = await pool.request().query("SELECT * FROM collections ORDER BY createdAt DESC");
    return Promise.all(r.recordset.map(hydrate));
  },
  async listByProvider(providerId: string) {
    const pool = await getSqlPool();
    const r = await pool.request().input("p", providerId).query("SELECT * FROM collections WHERE providerId=@p ORDER BY createdAt DESC");
    return Promise.all(r.recordset.map(hydrate));
  },
  async create(input: { providerId: string; title: string; description: string; monthlyPrice: number; }) {
    const pool = await getSqlPool();
    const id = uuid();
    await pool.request()
      .input("id", id).input("providerId", input.providerId).input("title", input.title)
      .input("description", input.description).input("monthlyPrice", input.monthlyPrice)
      .query(`INSERT INTO collections (id,providerId,title,description,monthlyPrice,status)
              VALUES (@id,@providerId,@title,@description,@monthlyPrice,'pending')`);
    await pool.request().input("cid", id).input("price", input.monthlyPrice)
      .query("INSERT INTO collection_prices (collectionId, price) VALUES (@cid, @price)");
    return this.byId(id);
  },
  async byId(id: string) {
    const pool = await getSqlPool();
    const r = await pool.request().input("id", id).query("SELECT * FROM collections WHERE id=@id");
    return r.recordset[0] ? hydrate(r.recordset[0]) : null;
  },
  async update(id: string, input: { title?: string; description?: string; monthlyPrice?: number; }) {
    const pool = await getSqlPool();
    if (input.monthlyPrice !== undefined) {
      await pool.request().input("cid", id).input("price", input.monthlyPrice)
        .query("INSERT INTO collection_prices (collectionId, price) VALUES (@cid, @price)");
    }
    await pool.request()
      .input("id", id)
      .input("title", input.title ?? null)
      .input("description", input.description ?? null)
      .input("monthlyPrice", input.monthlyPrice ?? null)
      .query(`UPDATE collections SET
        title = COALESCE(@title, title),
        description = COALESCE(@description, description),
        monthlyPrice = COALESCE(@monthlyPrice, monthlyPrice)
        WHERE id=@id`);
    return this.byId(id);
  },
  async setStatus(id: string, status: "active" | "disabled" | "pending") {
    const pool = await getSqlPool();
    await pool.request().input("id", id).input("s", status).query("UPDATE collections SET status=@s WHERE id=@id");
    return this.byId(id);
  },
  async addPhoto(collectionId: string, url: string) {
    const pool = await getSqlPool();
    const r = await pool.request().input("c", collectionId).query("SELECT COUNT(*) AS n FROM collection_photos WHERE collectionId=@c");
    if (r.recordset[0].n >= 10) { const e: any = new Error("Max 10 photos per collection"); e.status = 400; throw e; }
    const id = uuid();
    await pool.request().input("id", id).input("c", collectionId).input("u", url)
      .query("INSERT INTO collection_photos (id, collectionId, url) VALUES (@id,@c,@u)");
    return { id, url };
  },
  // NOTE: photo deletion is intentionally not implemented (business rule).
};

async function hydrate(c: any) {
  const pool = await getSqlPool();
  const photos = await pool.request().input("c", c.id).query("SELECT url FROM collection_photos WHERE collectionId=@c");
  return { ...c, photos: photos.recordset.map(p => p.url) };
}
