import { getSqlPool } from "../lib/sql";
import { v4 as uuid } from "uuid";

export const providerService = {
  async list() {
    const pool = await getSqlPool();
    const r = await pool.request().query("SELECT * FROM providers ORDER BY createdAt DESC");
    return r.recordset.map(toDto);
  },
  async byId(id: string) {
    const pool = await getSqlPool();
    const r = await pool.request().input("id", id).query("SELECT * FROM providers WHERE id=@id");
    return r.recordset[0] ? toDto(r.recordset[0]) : null;
  },
  async create(input: any) {
    const pool = await getSqlPool();
    const id = uuid();
    await pool.request()
      .input("id", id)
      .input("businessName", input.businessName)
      .input("category", input.category)
      .input("description", input.description ?? "")
      .input("phone", input.phone ?? "")
      .input("whatsapp", input.whatsapp ?? "")
      .input("email", input.email ?? "")
      .input("location", input.location ?? "")
      .input("profileImage", input.profileImage ?? "")
      .input("socialLinks", JSON.stringify(input.socialLinks ?? {}))
      .input("taxId", input.taxId ?? null)
      .query(`INSERT INTO providers (id,businessName,category,description,phone,whatsapp,email,location,profileImage,socialLinks,taxId)
              VALUES (@id,@businessName,@category,@description,@phone,@whatsapp,@email,@location,@profileImage,@socialLinks,@taxId)`);
    return this.byId(id);
  },
  async update(id: string, input: any) {
    const pool = await getSqlPool();
    await pool.request()
      .input("id", id)
      .input("businessName", input.businessName ?? "")
      .input("category", input.category ?? "")
      .input("description", input.description ?? "")
      .input("phone", input.phone ?? "")
      .input("whatsapp", input.whatsapp ?? "")
      .input("email", input.email ?? "")
      .input("location", input.location ?? "")
      .input("profileImage", input.profileImage ?? "")
      .input("socialLinks", JSON.stringify(input.socialLinks ?? {}))
      .query(`UPDATE providers SET businessName=@businessName, category=@category, description=@description,
              phone=@phone, whatsapp=@whatsapp, email=@email, location=@location, profileImage=@profileImage, socialLinks=@socialLinks
              WHERE id=@id`);
    return this.byId(id);
  },
};

function toDto(r: any) {
  return { ...r, socialLinks: r.socialLinks ? JSON.parse(r.socialLinks) : {} };
}
