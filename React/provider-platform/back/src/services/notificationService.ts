import { v4 as uuid } from "uuid";

// In-memory notifications (a real impl would use SQL Server or a dedicated table).
// Kept simple here; swap with persistence as needed.
interface N { id: string; to: string; kind: string; title: string; body: string; read: boolean; createdAt: string; }
const store: N[] = [];

export const notificationService = {
  list(audience?: string) {
    if (!audience) return store.slice().reverse();
    return store.filter(n => n.to === "all" || n.to === audience).reverse();
  },
  create(input: { to: string; kind: string; title: string; body: string; }) {
    const n: N = { id: uuid(), read: false, createdAt: new Date().toISOString(), ...input };
    store.push(n);
    return n;
  },
};
