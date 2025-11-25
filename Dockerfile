# ============================================
# Dockerfile для Totsoft Landing (SvelteKit + Bun)
# ============================================

# Этап 1: Сборка
FROM oven/bun:1-alpine AS builder

WORKDIR /app

# Копируем файлы зависимостей
COPY package.json bun.lock ./

# Устанавливаем зависимости
RUN bun install --frozen-lockfile

# Копируем исходный код
COPY . .

# Собираем приложение
RUN bun run build

# Этап 2: Production
FROM oven/bun:1-alpine AS production

WORKDIR /app

# Создаём непривилегированного пользователя
RUN addgroup -g 1001 -S nodejs && \
    adduser -S sveltekit -u 1001

# Копируем только необходимые файлы из builder
COPY --from=builder --chown=sveltekit:nodejs /app/build ./build
COPY --from=builder --chown=sveltekit:nodejs /app/package.json ./

# Устанавливаем только production зависимости
RUN bun install --production --frozen-lockfile

# Переключаемся на непривилегированного пользователя
USER sveltekit

# Переменные окружения
ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=3000

# Открываем порт
EXPOSE 3000

# Healthcheck
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost:3000/ || exit 1

# Запуск приложения
CMD ["bun", "build/index.js"]

