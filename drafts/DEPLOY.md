# Деплой на BrainyCP

## Процесс деплоя:

1. **Собрать фронтенд локально:**

```bash
pnpm build
```

2. **Загрузить на сервер через файловый менеджер BrainyCP:**
   - Папку `server/`
   - Папку `dist/`
   - Файл `Dockerfile.simple` (переименовать в `Dockerfile` или использовать как есть)

3. **Создать `.env` файл в папке `server/`:**

```env
SMTP_USER=dev@totsoft.net
SMTP_PASSWORD=%iJiWfhXhb2Y
PORT=3001
```

4. **В BrainyCP:**
   - Создать новый сайт/домен
   - Настроить DNS на IP сервера
   - Установить SSL (Let's Encrypt)
   - В Nginx конфиге добавить проксирование на нужный порт (например, 7000):

   ```nginx
   location / {
       proxy_pass http://localhost:7000;
       proxy_http_version 1.1;
       proxy_set_header Upgrade $http_upgrade;
       proxy_set_header Connection 'upgrade';
       proxy_set_header Host $host;
       proxy_set_header X-Real-IP $remote_addr;
       proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
       proxy_set_header X-Forwarded-Proto $scheme;
       proxy_cache_bypass $http_upgrade;
   }
   ```

5. **Запустить Docker контейнер:**

```bash
# Собрать образ
docker build -f Dockerfile.simple -t totsoft .

# Запустить контейнер на порту 7000 (или любом другом)
docker run -d \
  -p 7000:3001 \
  --env-file server/.env \
  --name totsoft \
  --restart unless-stopped \
  totsoft
```

**Важно:** Порт в `docker run -p 7000:3001` означает:

- `7000` - внешний порт (тот, который указываете в Nginx конфиге)
- `3001` - внутренний порт контейнера (указан в `server/.env` как `PORT=3001`)

## Структура на сервере:

```
/home/sites/totsoft.net/
├── server/
│   ├── index.js
│   ├── package.json
│   └── .env
├── dist/
│   ├── index.html
│   └── assets/
└── Dockerfile.simple (или Dockerfile)
```

## Что делает сервер:

- Отдаёт статику из `dist/` (собранный фронтенд)
- Обрабатывает API запросы `/api/send-email`
- Работает на порту, указанном в `server/.env` (по умолчанию 3001)
- Nginx проксирует запросы с домена на этот порт

## Обновление:

Если нужно обновить сайт:

1. Собрать новый `dist/` локально
2. Загрузить обновлённый `dist/` на сервер
3. Пересобрать и перезапустить контейнер:

```bash
docker stop totsoft
docker rm totsoft
docker build -f Dockerfile.simple -t totsoft .
docker run -d -p 7000:3001 --env-file server/.env --name totsoft --restart unless-stopped totsoft
```
