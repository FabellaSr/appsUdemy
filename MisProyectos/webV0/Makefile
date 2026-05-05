.PHONY: help install dev dev-backend dev-frontend build build-backend build-frontend docker-up docker-down clean

help:
	@echo "Tallerista Monorepo - Comandos disponibles:"
	@echo ""
	@echo "Setup:"
	@echo "  make install       - Instala todas las dependencias"
	@echo ""
	@echo "Desarrollo:"
	@echo "  make dev           - Inicia backend y frontend"
	@echo "  make dev-backend   - Inicia solo backend"
	@echo "  make dev-frontend  - Inicia solo frontend"
	@echo ""
	@echo "Build:"
	@echo "  make build         - Construye backend y frontend"
	@echo "  make build-backend - Construye solo backend"
	@echo "  make build-frontend- Construye solo frontend"
	@echo ""
	@echo "Docker:"
	@echo "  make docker-up     - Inicia contenedores (desarrollo)"
	@echo "  make docker-down   - Detiene contenedores"
	@echo ""
	@echo "Utilidades:"
	@echo "  make clean         - Limpia builds y node_modules"
	@echo ""

install:
	npm run install:all

dev:
	@echo "Iniciando backend y frontend..."
	@(cd backend && npm run start:dev) & \
	(cd frontend && npm run dev)

dev-backend:
	cd backend && npm run start:dev

dev-frontend:
	cd frontend && npm run dev

build: build-backend build-frontend
	@echo "✓ Build completado"

build-backend:
	cd backend && npm run build

build-frontend:
	cd frontend && npm run build

docker-up:
	docker-compose -f docker/docker-compose.dev.yml up -d

docker-down:
	docker-compose -f docker/docker-compose.dev.yml down

clean:
	rm -rf backend/dist backend/node_modules
	rm -rf frontend/dist frontend/node_modules
	rm -rf node_modules
	find . -name ".next" -type d -exec rm -rf {} + 2>/dev/null || true
