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

## Inicialización de SQL Server

El backend incluye un seed automático que crea el esquema y carga datos iniciales en la base `as400tasks` de SQL Server.

**Tablas creadas:**
- `dbo.Sections` — catálogo de secciones de la app (Instalaciones, Mantenimiento, Updates).
- `dbo.InstallationAudit` — log local de acciones contra el AS400 (start, install objects/sources, backup).
- `dbo.AppSettings` — parámetros clave/valor (URL del AS400, timeout, etc.).

**Datos seed:**
- 3 secciones (Instalaciones habilitada, las otras dos deshabilitadas).
- 3 settings base (`as400.baseUrl`, `as400.timeoutMs`, `app.version`).

### Ejecución automática

Se corre solo al iniciar el backend (`server.ts` → `runSqlSeed()`), con reintentos (5 intentos cada 3s) por si SQL Server todavía está arrancando dentro de Docker. Es idempotente: usa `IF NOT EXISTS` para el esquema y `MERGE` para los inserts, así que se puede ejecutar muchas veces sin duplicar nada.

### Ejecución manual

Dentro del contenedor del backend:

```bash
docker compose exec backend npm run seed
```

O en local con la base levantada:

```bash
cd backend
npm run seed
```

Los archivos `schema.sql` y `seed.sql` viven en `backend/src/database/` y se copian a `dist/database/` durante `npm run build` (script `copy:sql`).
