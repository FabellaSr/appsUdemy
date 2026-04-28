# Docker setup

```bash
cp ../back/.env.example ../back/.env
cp ../front/.env.example ../front/.env
docker compose up --build
```

Services:
| Service   | URL                          | Notes |
|-----------|------------------------------|-------|
| frontend  | http://localhost:5173        | Vite preview |
| backend   | http://localhost:4000/api    | Next.js API |
| mongo     | mongodb://localhost:27017    | volume `mongo_data` |
| sqlserver | localhost,1433 (sa)          | volume `mssql_data`, pwd `Your_strong_Passw0rd` |

Healthchecks, restart policies and an internal `pp-net` bridge are configured in `docker-compose.yml`.

Seed demo data once containers are up:
```bash
docker compose exec backend npm run seed
```

To stop and wipe volumes:
```bash
docker compose down -v
```
