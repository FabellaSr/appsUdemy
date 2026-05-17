# Backend — Expenses API

NestJS + TypeORM (SQL Server) + Mongoose (MongoDB para auth).

## Scripts

- `npm run start:dev` — modo desarrollo
- `npm run build && npm run start:prod`
- `npm run seed:sql` — categorías base
- `npm run seed:mongo` — admin demo (admin@demo.com / Admin123!)

## Endpoints principales

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET  /api/auth/me`
- `GET/POST/PATCH/DELETE /api/categories`
- `GET/POST/PATCH/DELETE /api/expenses` (POST acepta multipart con `receipt`)
- `GET/POST/DELETE /api/members` (ADMIN)
- `GET /api/reports/monthly?year=&month=`
- `GET /api/reports/export/pdf|excel`
- `POST /api/monthly-close/open|close` (ADMIN)

Swagger UI: `http://localhost:3000/api/docs`

registrer
{
  "email": "admin@demo.com",
  "password": "serusui4$",
  "name":"Ivano"
}
{ 
  "email": "admin2@demo.com",
  "name": "Ivano",
  "role": "ADMIN",
  "password" : "ferminfabella4$"
}