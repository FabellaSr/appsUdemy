# Tallerista Platform

Plataforma monorepo con backend (NestJS) y frontend (React + Vite).

## Estructura del Proyecto

```
tallerista/
├── backend/                 # NestJS API
│   ├── src/
│   │   ├── modules/        # Módulos de negocio
│   │   ├── services/       # Servicios (mailer, storage, watermark)
│   │   └── prisma/         # Configuración ORM
│   ├── prisma/
│   │   ├── schema.prisma   # Definición de BD
│   │   └── seed.ts         # Seed de datos
│   └── package.json
│
├── frontend/               # React Vite SPA
│   ├── src/
│   │   ├── pages/         # Páginas por sección
│   │   ├── components/    # Componentes UI
│   │   ├── layouts/       # Layouts
│   │   ├── contexts/      # Context API
│   │   ├── hooks/         # Custom hooks
│   │   └── lib/           # Utilidades
│   ├── index.html
│   └── package.json
│
├── docker/                 # Configuración Docker
│   ├── docker-compose.yml
│   └── nginx.conf
│
├── package.json           # Scripts monorepo
└── README.md
```

## Setup

### Opción 1: Instalar todo

```bash
npm run install:all
```

### Opción 2: Instalar por separado

**Backend:**
```bash
cd backend
npm install
npm run start:dev
```

**Frontend:**
```bash
cd frontend
npm install
npm run dev
```

## Scripts Disponibles

- `npm run dev:backend` - Inicia backend en modo desarrollo
- `npm run dev:frontend` - Inicia frontend en modo desarrollo
- `npm run build:backend` - Construye backend
- `npm run build:frontend` - Construye frontend

## Stack Técnico

### Backend
- **Framework:** NestJS
- **BD:** Prisma + MongoDB/PostgreSQL
- **Auth:** JWT + Passport
- **Storage:** S3 / Local
- **Email:** Nodemailer

### Frontend
- **Framework:** React 19
- **Build:** Vite
- **Routing:** React Router v7
- **UI:** shadcn/ui + Tailwind CSS
- **Forms:** React Hook Form + Zod
- **State:** React Query + Context API

## Variables de Entorno

### Backend (`.env`)
```
DATABASE_URL=
MONGODB_URI=
JWT_SECRET=
MAIL_HOST=
S3_BUCKET=
```

### Frontend (`.env.local`)
```
VITE_API_URL=http://localhost:3000
```

## Docker

```bash
# Desarrollo
docker-compose -f docker/docker-compose.dev.yml up

# Producción
docker-compose -f docker/docker-compose.yml up
```

## Notas

- Backend escucha en `http://localhost:3000`
- Frontend corre en `http://localhost:5173` (Vite)
- La BD está separada del código en contenedores Docker
