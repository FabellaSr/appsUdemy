FROM node:20-alpine

WORKDIR /app

# OpenSSL para bcrypt en alpine
RUN apk add --no-cache python3 make g++

COPY package.json ./
RUN npm install

COPY . .

RUN mkdir -p /app/uploads

EXPOSE 3000

CMD ["npm", "run", "start:dev"]
