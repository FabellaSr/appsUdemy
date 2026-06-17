# Backend — Web Interna Sistemas IT

API REST desarrollada con **NestJS**, **TypeORM** y **Mongoose**. Diseñada para uso interno del equipo de Sistemas IT.

---

## Stack tecnológico

| Capa | Tecnología |
|---|---|
| Framework | NestJS |
| ORM | TypeORM |
| Base de datos relacional | PostgreSQL |
| Base de datos de autenticación | MongoDB (Mongoose) |
| Autenticación | JWT (Access + Refresh token) |
| Runtime | Node.js |
| Contenedores | Docker + Docker Compose |

---

## Requisitos previos

- [Node.js](https://nodejs.org/) v18 o superior
- [Docker](https://www.docker.com/) y Docker Compose
- [Git](https://git-scm.com/)

---

## Instalación y configuración

### 1. Clonar el repositorio

```bash
git clone <url-del-repo>
cd <nombre-del-proyecto>
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

Crear un archivo `.env` en la raíz del proyecto basándose en `.env.example`:

```bash
cp .env.example .env
```

Completar los valores en el `.env`:

```env
NODE_ENV=development
PORT=3000

# Base de datos relacional
DB_TYPE=postgres
SQL_HOST=localhost
SQL_PORT=5432
SQL_USER=postgres
SQL_PASSWORD=
SQL_DB=nombre_db

# MongoDB
MONGO_URI=mongodb://root:password@localhost:27017/nombre_db?authSource=admin

# JWT
JWT_SECRET=
JWT_REFRESH_SECRET=
JWT_EXPIRES_IN=1d
```

---

## Levantar el proyecto

### Con Docker (recomendado)

```bash
docker compose up -d --build
```

Esto levanta automáticamente:
- El backend en el puerto `3000`
- PostgreSQL en el puerto `5432`
- MongoDB en el puerto `27017`

### Sin Docker (desarrollo local)

Primero asegurate de tener PostgreSQL y MongoDB corriendo localmente, luego:

```bash
# Modo desarrollo con hot reload
npm run start:dev

# Modo producción
npm run build
npm run start:prod
```

---

## Estructura del proyecto

```
src/
├── config/
│   ├── sql.config.ts        # Configuración TypeORM (postgres/mssql)
│   └── mongo.config.ts      # Configuración Mongoose
├── modules/
│   ├── auth/                # Autenticación JWT
│   ├── users/               # Gestión de usuarios
│   └── ...                  # Resto de módulos
└── main.ts
```

Cada módulo sigue la estructura estándar de NestJS:

```
modulo/
├── dto/                     # Objetos de transferencia de datos
├── modulo.controller.ts     # Endpoints HTTP
├── modulo.service.ts        # Lógica de negocio
├── modulo.entity.ts         # Entidad TypeORM
└── modulo.module.ts         # Declaración del módulo
```

---

## Endpoints principales

La API corre en `http://localhost:3000`.

| Método | Ruta | Descripción | Auth |
|---|---|---|---|
| POST | `/auth/login` | Login, devuelve access + refresh token | No |
| POST | `/auth/refresh` | Renovar access token | No |
| GET | `/users` | Listar usuarios | Sí |
| ... | ... | ... | ... |

> Para ver todos los endpoints disponibles, accedé a la documentación Swagger en `http://localhost:3000/api` (si está habilitado).

---

## Autenticación

La API usa **JWT con doble token**:

- **Access token**: vida corta (por defecto 1 día), se envía en el header de cada request.
- **Refresh token**: vida larga, se usa para renovar el access token sin volver a loguearse.

Todas las rutas protegidas requieren el header:

```
Authorization: Bearer <access_token>
```

---

## Base de datos

El proyecto soporta **PostgreSQL** y **SQL Server** a través de la variable `DB_TYPE` en el `.env`. TypeORM crea las tablas automáticamente en modo `development` (`synchronize: true`). En producción las migraciones deben aplicarse manualmente.

### Correr seeds (datos iniciales)

```bash
npx ts-node src/database/sql/seeds/run.ts
```

---

## Scripts disponibles

| Comando | Descripción |
|---|---|
| `npm run start:dev` | Desarrollo con hot reload |
| `npm run build` | Compilar a JavaScript |
| `npm run start:prod` | Correr build de producción |
| `npm run lint` | Revisar código con ESLint |
| `npm run test` | Correr tests unitarios |

---

## Variables de entorno — referencia completa

| Variable | Descripción | Valor por defecto |
|---|---|---|
| `NODE_ENV` | Entorno de ejecución | `development` |
| `PORT` | Puerto del servidor | `3000` |
| `DB_TYPE` | Motor de BD (`postgres` o `mssql`) | `postgres` |
| `SQL_HOST` | Host de la base de datos | `localhost` |
| `SQL_PORT` | Puerto de la base de datos | `5432` |
| `SQL_USER` | Usuario de la base de datos | `postgres` |
| `SQL_PASSWORD` | Contraseña de la base de datos | — |
| `SQL_DB` | Nombre de la base de datos | — |
| `MONGO_URI` | URI completa de MongoDB | — |
| `JWT_SECRET` | Secreto para firmar access tokens | — |
| `JWT_REFRESH_SECRET` | Secreto para firmar refresh tokens | — |
| `JWT_EXPIRES_IN` | Expiración del access token | `1d` |
| `CORS_ORIGIN` | Origen permitido por CORS | `http://localhost:5173` |

---

## Notas para el equipo

- En `development`, TypeORM sincroniza el schema automáticamente — no hace falta crear las tablas a mano.
- En `production`, `synchronize` está desactivado para evitar pérdida de datos accidental.
- Los archivos subidos (uploads) se persisten en un volumen Docker en `app/assets/uploads`.
- No commitear el `.env` — usar `.env.example` como referencia.


npm i -g @nestjs/cli
nest new nombre-proyecto
cd nombre-proyecto

# TypeORM + drivers de base de datos
npm install @nestjs/typeorm typeorm mssql pg

# Mongoose (MongoDB)
npm install @nestjs/mongoose mongoose

# Config (.env)
npm install @nestjs/config

# Auth
npm install @nestjs/jwt @nestjs/passport passport passport-jwt bcryptjs
npm install -D @types/passport-jwt @types/bcryptjs

# Validación
npm install class-validator class-transformer

# Multer (uploads de archivos, para los recibos)
npm install @types/multer

nest g module modules/auth
nest g module modules/users
nest g resource modules/expenses