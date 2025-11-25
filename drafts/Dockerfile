# ВНИМАНИЕ: Этот файл НЕ используется для деплоя на BrainyCP!
# Для деплоя используется Dockerfile.simple из корня проекта.
# Этот файл оставлен для совместимости с docker-compose.yml (если понадобится в будущем).

# Этап сборки
FROM node:22-alpine AS builder

# Устанавливаем pnpm
RUN npm install -g pnpm

WORKDIR /app

# Копируем файлы для установки зависимостей
COPY package.json pnpm-lock.yaml ./

# Устанавливаем зависимости
RUN pnpm install --frozen-lockfile

# Копируем исходный код
COPY . .

# Собираем production-версию
# VITE_API_URL будет передан через build args или env при сборке
ARG VITE_API_URL
ENV VITE_API_URL=${VITE_API_URL}
RUN pnpm build

# Этап production
FROM nginx:alpine

# Копируем собранные файлы из builder
COPY --from=builder /app/dist /usr/share/nginx/html

# Копируем конфигурацию nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
