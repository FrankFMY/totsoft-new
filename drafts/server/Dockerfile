# ВНИМАНИЕ: Этот файл НЕ используется для деплоя на BrainyCP!
# Для деплоя используется Dockerfile.simple из корня проекта.
# Этот файл оставлен для совместимости с docker-compose.yml (если понадобится в будущем).

FROM node:22-alpine

WORKDIR /app

# Копируем package.json
COPY package.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем исходный код
COPY . .

EXPOSE 3001

CMD ["npm", "start"]
