# Totsoft Landing Page

Корпоративный лендинг для IT-компании **ООО Тотсофт**. Разработка высоконагруженных IT-решений для Государства и Бизнеса.

🌐 **Сайт:** [https://totsoft.net](https://totsoft.net)

## 👨‍💻 Автор

**Артём Прянишников**

- GitHub: [FrankFMY](https://github.com/FrankFMY)
- Telegram: [@FrankFMY](https://t.me/FrankFMY)

## 🚀 Технологии

- **SvelteKit 2** — full-stack фреймворк
- **Svelte 5** — с Runes (новая реактивность)
- **TypeScript** — строгая типизация (`strict: true`)
- **Bun** — JavaScript runtime и пакетный менеджер
- **Tailwind CSS v4** — utility-first CSS
- **Vite 7** — быстрая сборка
- **Lucide Svelte** — иконки
- **Nodemailer** — отправка писем через SMTP

## 📋 Требования

- **Bun 1.0+** (рекомендуется) или **Node.js 20+**

## 🛠️ Установка

```bash
# Клонирование
git clone <repository-url>
cd totsoft-landing

# Установка зависимостей
bun install

# Копирование переменных окружения
cp .env.example .env
# Отредактируйте .env и добавьте SMTP_PASSWORD
```

## 🏃 Локальная разработка

```bash
bun dev
```

Приложение будет доступно по адресу `http://localhost:5173`

## 📦 Сборка и деплой

### 1. Сборка для продакшена

```bash
bun run build
```

Создаст папку `build/` с готовым приложением.

### 2. Запуск на сервере (BrainyCP / VPS)

```bash
# Установка зависимостей на сервере
bun install --production

# Сборка
bun run build

# Запуск
HOST=0.0.0.0 PORT=3000 ORIGIN=https://totsoft.net bun build/index.js
```

### 3. Systemd сервис (рекомендуется)

Создайте файл `/etc/systemd/system/totsoft.service`:

```ini
[Unit]
Description=Totsoft Landing
After=network.target

[Service]
Type=simple
User=www-data
WorkingDirectory=/var/www/totsoft
Environment=NODE_ENV=production
Environment=HOST=127.0.0.1
Environment=PORT=3000
Environment=ORIGIN=https://totsoft.net
EnvironmentFile=/var/www/totsoft/.env
ExecStart=/usr/local/bin/bun build/index.js
Restart=on-failure
RestartSec=10

[Install]
WantedBy=multi-user.target
```

Команды управления:

```bash
sudo systemctl daemon-reload
sudo systemctl enable totsoft
sudo systemctl start totsoft
sudo systemctl status totsoft
```

### 4. Nginx reverse proxy

```nginx
server {
    listen 80;
    server_name totsoft.net www.totsoft.net;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name totsoft.net www.totsoft.net;

    ssl_certificate /etc/letsencrypt/live/totsoft.net/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/totsoft.net/privkey.pem;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # Статические файлы с кэшированием
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2)$ {
        proxy_pass http://127.0.0.1:3000;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Precompressed files (gzip/brotli)
    gzip_static on;
    brotli_static on;
}
```

## 🔧 Переменные окружения

| Переменная      | Описание       | Пример                |
| --------------- | -------------- | --------------------- |
| `SMTP_USER`     | Email для SMTP | `dev@totsoft.net`     |
| `SMTP_PASSWORD` | Пароль SMTP    | `your_password`       |
| `HOST`          | Хост сервера   | `0.0.0.0`             |
| `PORT`          | Порт сервера   | `3000`                |
| `ORIGIN`        | URL сайта      | `https://totsoft.net` |

## 📁 Структура проекта

```
totsoft-landing/
├── src/
│   ├── lib/
│   │   ├── components/     # Svelte компоненты
│   │   ├── config/         # Конфигурация
│   │   ├── services/       # API сервисы
│   │   ├── types.ts        # TypeScript типы
│   │   └── utils/          # Утилиты
│   ├── routes/
│   │   ├── +page.svelte    # Главная страница
│   │   ├── +error.svelte   # Страница ошибок
│   │   ├── +layout.svelte  # Layout
│   │   ├── privacy/        # Политика конфиденциальности
│   │   └── api/send-email/ # API endpoint
│   └── app.html
├── static/                 # Статические файлы
├── build/                  # Собранное приложение (после build)
├── .env.example            # Пример переменных окружения
├── svelte.config.js        # Конфигурация SvelteKit
└── package.json
```

## 🎨 Особенности

- ✅ **Svelte 5 Runes** — `$state`, `$derived`, `$effect`, `$props`
- ✅ **SEO оптимизация** — meta-теги, Open Graph, JSON-LD, sitemap.xml
- ✅ **Accessibility** — ARIA атрибуты, семантическая разметка
- ✅ **Адаптивный дизайн** — mobile-first
- ✅ **TypeScript strict** — строгая типизация
- ✅ **Error Boundary** — `<svelte:boundary>` для обработки ошибок
- ✅ **CSP Headers** — Content Security Policy
- ✅ **Precompression** — gzip/brotli для статики

## 🔒 Безопасность

- ✅ SMTP пароли в приватных переменных окружения
- ✅ Server-side валидация всех данных форм
- ✅ XSS защита (экранирование HTML)
- ✅ Rate limiting на API endpoints
- ✅ CSP заголовки
- ✅ HTTPS через Nginx

## 🧪 Скрипты

```bash
bun dev          # Режим разработки
bun run build    # Сборка для продакшена
bun run preview  # Превью сборки
bun run check    # Проверка типов
bun run lint     # Проверка линтером
bun run full     # Полная проверка + сборка
bun start        # Запуск собранного приложения
```

## 📄 Лицензия

MIT License © 2025 [ООО "Тотсофт"](https://totsoft.net)

Подробности в файле [LICENSE](LICENSE).

## 📞 Контакты

- **Email:** dev@totsoft.net
- **Telegram:** [@totsoft_official](https://t.me/totsoft_official)
- **Website:** [https://totsoft.net](https://totsoft.net)

---

Разработано с ❤️ [Артёмом Прянишниковым](https://github.com/FrankFMY) для команды Тотсофт
