# Expenses App — Fullstack Scaffold

Sistema de gestión de gastos grupales.

## Stack

- **Frontend:** React + Vite + TypeScript, React Router DOM, TailwindCSS, shadcn/ui, Axios, Zustand, Recharts.
- **Backend:** NestJS + TypeScript, TypeORM (SQL Server), Mongoose (MongoDB sólo para auth/sesiones), JWT, Multer, Swagger.
- **Infra:** Docker / docker-compose (frontend, backend, SQL Server 2022, MongoDB 7).

## Estructura

```
.
├── frontend/        # SPA React
├── backend/         # API NestJS
├── docker-compose.yml
└── .env.example
```

## Quick start

```bash
cp .env.example .env
docker compose up --build
```

- Frontend: http://localhost:5173
- Backend:  http://localhost:3000
- Swagger:  http://localhost:3000/api/docs

## Desarrollo local sin Docker

```bash
# backend
cd backend && npm install && npm run start:dev

# frontend
cd frontend && npm install && npm run dev
```

## Seeds

```bash
cd backend
npm run seed:sql     # categorías base
npm run seed:mongo   # usuario admin demo (admin@demo.com / Admin123!)
```

## Roles

- `ADMIN` — abre/cierra meses, gestiona miembros, ve todo.
- `MEMBER` — registra y consulta sus gastos.
