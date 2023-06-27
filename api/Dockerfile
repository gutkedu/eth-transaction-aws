# Stage 1: Install production dependencies
FROM node:16-alpine as builder

WORKDIR /app

COPY package*.json ./

RUN npm install --production

# Stage 2: Compile
FROM node:16-alpine as compiler

WORKDIR /app

COPY package*.json ./

RUN npm install && npm run build

# Stage 3: Create the production image
FROM gcr.io/distroless/nodejs:16

WORKDIR /app

COPY package*.json ./

COPY --from=builder /app/node_modules .
COPY --from=compiler /app/build .

CMD ["node", "dist/server.js"]