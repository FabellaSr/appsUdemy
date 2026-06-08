# Backend — Provider Showcase

Next.js API Routes + TypeScript + JWT + MongoDB + SQL Server + image storage adapter (Cloudinary or S3).

## Run
```bash
cp .env.example .env
npm install
npm run dev    # http://localhost:4000
npm run seed   # populates demo users + providers
```

## Architecture
```
src/
  lib/
    mongo.ts      # mongoose connection
    sql.ts        # mssql connection pool + ensureSchema()
    jwt.ts        # sign/verify
    storage.ts    # adapter: Cloudinary | S3 (selected by STORAGE_PROVIDER)
    logger.ts
  middleware/
    auth.ts       # extracts JWT, injects req.user
    rbac.ts       # role guard
    validate.ts   # zod request validation
    errors.ts     # centralized error wrapper
  models/
    User.ts       # Mongo
    Session.ts    # Mongo
  services/
    providerService.ts
    collectionService.ts
    paymentService.ts
    notificationService.ts
    logService.ts
  controllers/    # business logic per resource
  utils/
  types/
  seed/seed.ts    # demo data
pages/api/
  auth/{login,logout,me}.ts
  providers/{index,[id]}.ts
  collections/{index,[providerId]}.ts
  collections/[id]/status.ts
  payments/{index}.ts
  payments/[id]/confirm.ts
  notifications/index.ts
```

## Databases
- **MongoDB** — `users`, `sessions`. Stores email, hashed password, role, providerId.
- **SQL Server** — `providers`, `collections`, `collection_photos`, `payments`, `logs`. Schema auto-created on boot.

## Image storage
`STORAGE_PROVIDER=cloudinary` or `s3`. Photos are immutable: there is no DELETE endpoint and the service refuses removal requests. Optimized URLs returned by the adapter are stored in SQL Server.

## API
See `postman/provider-platform.postman_collection.json`.

## Roles
visitor (no token) · provider · admin · superadmin.
