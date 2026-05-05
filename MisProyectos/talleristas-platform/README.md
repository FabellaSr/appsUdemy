# Talleristas Platform

Plataforma para proveedores talleristas. Sitio público + portal privado de proveedores + panel admin.

## Stack

- **Frontend:** React 18 + TypeScript + Vite + React Router + Axios + TailwindCSS
- **Backend:** NestJS 10 + TypeORM + JWT + Multer
- **Base de datos:** Microsoft SQL Server 2022
- **Orquestación:** Docker + Docker Compose

## Arquitectura

```
┌──────────────┐      ┌──────────────┐      ┌──────────────┐
│  frontend    │─────▶│   backend    │─────▶│  sqlserver   │
│  React/Vite  │ HTTP │   NestJS     │ TDS  │   MSSQL      │
│  :5173       │      │   :3000      │      │  :1433       │
└──────────────┘      └──────────────┘      └──────────────┘
```

Tres servicios independientes, cada uno en su contenedor. Comunicación frontend → backend por REST. Backend → DB por TDS. Uploads persistidos en volumen Docker.

## Estructura

```
talleristas-platform/
├── frontend/              # React + Vite + TS
│   ├── src/
│   │   ├── api/           # Cliente axios + endpoints
│   │   ├── components/    # UI compartida
│   │   ├── context/       # AuthContext
│   │   ├── pages/         # Páginas (públicas + privadas + admin)
│   │   ├── routes/        # ProtectedRoute
│   │   └── types/         # Tipos compartidos
│   ├── Dockerfile
│   ├── .env.example
│   ├── package.json
│   ├── vite.config.ts
│   ├── tsconfig.json
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── index.html
├── backend/               # NestJS
│   ├── src/
│   │   ├── auth/          # Login, JWT, guards, roles
│   │   ├── users/         # Usuarios (admin + proveedor)
│   │   ├── providers/     # CRUD proveedores
│   │   ├── works/         # CRUD trabajos
│   │   ├── uploads/       # Multer + storage
│   │   ├── payments/      # Pagos
│   │   ├── notifications/ # Avisos
│   │   ├── database/      # DataSource + seeds
│   │   ├── common/        # Decoradores, guards globales
│   │   ├── app.module.ts
│   │   └── main.ts
│   ├── Dockerfile
│   ├── .env.example
│   ├── package.json
│   ├── tsconfig.json
│   └── nest-cli.json
├── docker/
│   └── mssql-init.sql     # Crea la DB si no existe
├── docker-compose.yml
└── README.md
```

## Cómo levantarlo

### 1. Requisitos

- Docker Desktop 4.x o Docker Engine 24+
- Docker Compose v2
- 4 GB de RAM libres (SQL Server pide bastante)

### 2. Configurar variables de entorno

```bash
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
```

Editá `backend/.env` y `frontend/.env` si querés cambiar puertos o credenciales.

### 3. Levantar todo

```bash
docker compose up --build
```

La primera vez tarda varios minutos (descarga imagen de SQL Server ~1.5 GB, instala deps, corre migraciones y seed).

### 4. URLs

| Servicio | URL |
|---|---|
| Frontend | http://localhost:5173 |
| Backend API | http://localhost:3000/api |
| SQL Server | localhost:1433 |

### 5. Usuarios seed

| Rol | Email | Password |
|---|---|---|
| Admin | admin@talleristas.local | Admin123! |
| Proveedor | juan@talleristas.local | Proveedor123! |
| Proveedor | maria@talleristas.local | Proveedor123! |

## Variables de entorno

### Backend (`backend/.env`)

| Variable | Descripción | Ejemplo |
|---|---|---|
| `NODE_ENV` | Entorno | `development` |
| `PORT` | Puerto del backend | `3000` |
| `DB_HOST` | Host de SQL Server | `sqlserver` |
| `DB_PORT` | Puerto de SQL Server | `1433` |
| `DB_USERNAME` | Usuario SQL | `sa` |
| `DB_PASSWORD` | Password SQL (≥8 chars, mayúscula, número, símbolo) | `YourStrong!Passw0rd` |
| `DB_NAME` | Nombre de la base | `talleristas` |
| `JWT_SECRET` | Secret para firmar tokens | `cambia-esto-en-prod` |
| `JWT_EXPIRES_IN` | Duración del token | `7d` |
| `UPLOADS_DIR` | Directorio de uploads | `/app/uploads` |
| `CORS_ORIGIN` | Origen permitido CORS | `http://localhost:5173` |

### Frontend (`frontend/.env`)

| Variable | Descripción | Ejemplo |
|---|---|---|
| `VITE_API_URL` | URL base del backend | `http://localhost:3000/api` |

## Endpoints principales

```
POST   /api/auth/login              público
GET    /api/auth/me                 autenticado

GET    /api/providers               público (lista solo activos)
GET    /api/providers/:id           público
POST   /api/providers               admin
PATCH  /api/providers/:id           admin | proveedor (su propio perfil)
DELETE /api/providers/:id           admin (baja lógica)

GET    /api/works                   público
GET    /api/works/:id               público
POST   /api/works                   proveedor
PATCH  /api/works/:id               proveedor (propio) | admin
DELETE /api/works/:id               proveedor (propio) | admin

POST   /api/uploads/work-photo      proveedor (multipart/form-data)

GET    /api/payments                admin (todos) | proveedor (los suyos)
POST   /api/payments                admin
PATCH  /api/payments/:id            admin

GET    /api/notifications           proveedor (las suyas)
POST   /api/notifications           admin
PATCH  /api/notifications/:id/read  proveedor
```

## Buenas prácticas aplicadas

- **Separación de capas:** controllers → services → repositories.
- **DTOs con `class-validator`** en cada endpoint.
- **Guards de auth y roles** declarativos (`@Roles('admin')`).
- **Baja lógica** (`isActive: boolean`) en lugar de DELETE físico.
- **Password hasheado** con bcrypt (10 rounds).
- **Variables sensibles** solo en `.env`, nunca en código.
- **CORS restringido** al origen del frontend.
- **TypeORM con migraciones** (autogeneradas desde entidades en dev; en prod usar `synchronize: false`).
- **Volumen Docker para uploads** — sobreviven a reinicios del contenedor.
- **Multi-stage build** en frontend (build → nginx).

## Comandos útiles

```bash
# Levantar en background
docker compose up -d --build

# Ver logs de un servicio
docker compose logs -f backend

# Reiniciar solo el backend
docker compose restart backend

# Ejecutar el seed manualmente
docker compose exec backend npm run seed

# Bajar todo y borrar volúmenes (¡borra la DB!)
docker compose down -v

# Conectarse a SQL Server desde el host
docker compose exec sqlserver /opt/mssql-tools18/bin/sqlcmd \
  -S localhost -U sa -P 'YourStrong!Passw0rd' -No
```

## Troubleshooting

**SQL Server no levanta:**
- Verificá que el password cumpla la política (≥8 chars, mayúscula, número, símbolo).
- Asegurate de tener al menos 2 GB libres para el contenedor.
- En Mac M1/M2/M3, la imagen `mcr.microsoft.com/azure-sql-edge` ya está en el compose como alternativa ARM.

**Backend no se conecta a la DB:**
- La primera vez el seed corre antes de que SQL Server esté listo. El backend tiene retry logic (10 intentos x 5s).
- Mirá `docker compose logs backend`.

**Uploads no persisten:**
- Verificá que el volumen `uploads-data` esté montado: `docker volume ls`.

## Próximos pasos sugeridos

- Migraciones reales con `typeorm migration:generate`.
- Refresh tokens.
- Rate limiting (`@nestjs/throttler`).
- Tests e2e con Jest + Supertest.
- Compresión y resize de imágenes (sharp).
- Logging estructurado (pino).
- CI/CD (GitHub Actions).

## Licencia

MIT — usalo como quieras.
