# --- build ---
FROM node:20-alpine AS builder
WORKDIR /app
COPY package.json ./
RUN npm install --no-audit --no-fund
COPY . .
RUN npm run build

# --- runtime (static + preview) ---
FROM node:20-alpine AS runner
WORKDIR /app
COPY --from=builder /app ./
EXPOSE 5173
HEALTHCHECK --interval=30s --timeout=5s --retries=5 \
  CMD wget -qO- http://localhost:5173 >/dev/null 2>&1 || exit 1
CMD ["npm","run","preview"]
