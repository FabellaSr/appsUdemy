# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Install dependencies for sharp
RUN apk add --no-cache python3 make g++ vips-dev

COPY package*.json ./
COPY prisma ./prisma/

RUN npm ci

COPY . .

RUN npm run prisma:generate
RUN npm run build

# Production stage
FROM node:20-alpine AS production

WORKDIR /app

# Install runtime dependencies for sharp
RUN apk add --no-cache vips

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/prisma ./prisma

# Create uploads directory
RUN mkdir -p uploads

EXPOSE 4000

CMD ["npm", "run", "start:prod"]
