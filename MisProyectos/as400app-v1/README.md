# AS400 Tasks Manager

Aplicación fullstack para gestión de tareas relacionadas al AS400 (instalaciones, mantenimiento, etc.).

## Estructura
- `/frontend` — React + Vite + TypeScript + Tailwind + shadcn/ui + Zustand + Axios
- `/backend`  — Node.js + Express + TypeScript + JWT + Mongo (auth) + SQL Server (data) + proxy AS400

## Levantar todo con Docker
```bash
docker-compose up --build
```
Servicios:
- frontend: http://localhost:5173
- backend:  http://localhost:4000  (Swagger en /api/docs)
- mongo:    localhost:27017
- mssql:    localhost:1433

## Desarrollo local sin docker
```bash
cd backend && npm install && npm run dev
cd frontend && npm install && npm run dev
```

## Variables de entorno
Copiar `.env.example` a `.env` en `frontend/` y `backend/`.

## Endpoints AS400 implementados (proxy)
| Método | Ruta backend                                | AS400        |
|--------|----------------------------------------------|--------------|
| POST   | /api/installations                            | WSPIW1       |
| PATCH  | /api/installations/:type/:number/:seq         | WSPIWc       |
| POST   | /api/installations/:type/:number/:seq/objects | WSPIW2       |
| POST   | /api/installations/:type/:number/:seq/sources | WSPIW3       |
| POST   | /api/installations/:type/:number/:seq/backup  | WSPbkf       |
| GET    | /api/installations                            | WSRIWL       |
| GET    | /api/installations/:type/:number/:seq         | WSRIWD       |

## Roles
- ADMIN
- MEMBER
