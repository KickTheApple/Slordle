# ----------- 1. build

FROM node:20-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY tsconfig*.json ./
COPY vite.config.* ./
COPY eslint.config.* ./
COPY index.html ./
COPY src ./src
COPY frontend ./frontend

RUN npm run build

# ---------- 2. run

FROM nginx:stable-alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
