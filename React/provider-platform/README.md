# Provider Showcase Platform

Enterprise platform where service providers (blacksmiths, carpenters, electricians, painters, plumbers, etc.) publish portfolios.

## Monorepo layout

```
/front      React + Vite + TS + shadcn/ui frontend
/back       Next.js (API routes) + TS backend
/docker     Dockerfiles + docker-compose
/postman    Postman collection
```

## Stack
- Frontend: React 18, Vite, TypeScript, TailwindCSS, shadcn/ui, React Router, React Query, Context Auth.
- Backend: Next.js API Routes, Node.js, TypeScript, JWT, Mongoose, mssql.
- Databases: MongoDB (auth/users/sessions), SQL Server (providers, collections, payments, logs).
- Image storage: Cloudinary OR AWS S3 (switch via `STORAGE_PROVIDER` env).
- Containerization: Docker + docker-compose with persistent volumes and healthchecks.

## Quick start (Docker)

```bash
cp back/.env.example back/.env
cp front/.env.example front/.env
cd docker
docker compose up --build
```

Then:
- Frontend: http://localhost:5173
- Backend:  http://localhost:4000
- MongoDB:  mongodb://localhost:27017
- SQL Server: localhost,1433  (sa / Your_strong_Passw0rd)

## Seed

After containers are up:

```bash
docker compose exec backend npm run seed
```

Default users:
- superadmin@demo.io / Admin123!
- admin@demo.io / Admin123!
- provider@demo.io / Provider123!

## Roles
visitor · provider · admin · superadmin

## Docs
- `front/README.md`
- `back/README.md`
- `docker/README.md`
- `postman/provider-platform.postman_collection.json`
