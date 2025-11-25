# Totsoft Landing Page

Современный корпоративный лендинг для IT-компании Тотсофт. Разработка высоконагруженных IT-решений для Государства и Бизнеса.

## 👨‍💻 Автор

**Артём Прянишников**

- GitHub: [FrankFMY](https://github.com/FrankFMY)
- Telegram: [@FrankFMY](https://t.me/FrankFMY)

## 🚀 Технологии

- **SvelteKit 2** - современный full-stack фреймворк
- **Svelte 5** - с Runes (новая реактивность)
- **TypeScript** - строгая типизация
- **Bun** - быстрый JavaScript runtime и пакетный менеджер
- **ElysiaJS** - высокопроизводительный веб-фреймворк для Bun
- **Tailwind CSS v4** - utility-first CSS фреймворк
- **Vite** - быстрая сборка и разработка
- **Lucide Svelte** - иконки
- **Nodemailer** - отправка писем через SMTP (Beget)

## 📋 Требования

- **Bun 1.0+** (рекомендуется) или Node.js 18+
- Для backend сервера: Bun runtime

## 🛠️ Установка

1. Клонируйте репозиторий:
```bash
git clone <repository-url>
cd totsoft-new
```

2. Установите зависимости:
```bash
# С Bun (рекомендуется)
bun install

# Или с npm/pnpm
npm install
# или
pnpm install
```

3. (Обязательно для продакшена) Создайте файл `.env` в корне проекта:
```env
# SMTP настройки для Beget
SMTP_USER=dev@totsoft.net
SMTP_PASSWORD=ваш_пароль_от_почты

# URL backend API (опционально, если backend на отдельном сервере)
VITE_API_URL=http://localhost:3000
```

## 🏃 Запуск

### Режим разработки

**Frontend (SvelteKit):**
```bash
bun run dev
# или
npm run dev
```

Приложение будет доступно по адресу `http://localhost:5173`

**Backend (ElysiaJS):**
```bash
cd server
bun run dev
```

Backend будет доступен по адресу `http://localhost:3000`

### Сборка для продакшена

**Frontend:**
```bash
bun run build
```

**Backend:**
```bash
cd server
bun run src/index.ts
```

### Превью продакшен сборки

```bash
bun run preview
```

### Проверка типов

```bash
bun run check
```

## 📁 Структура проекта

```
totsoft-new/
├── src/                    # SvelteKit приложение
│   ├── lib/
│   │   ├── components/     # Svelte компоненты
│   │   │   ├── About.svelte
│   │   │   ├── ContactForm.svelte
│   │   │   ├── ErrorFallback.svelte
│   │   │   ├── Footer.svelte
│   │   │   ├── Hero.svelte
│   │   │   ├── Navbar.svelte
│   │   │   ├── Process.svelte
│   │   │   ├── Services.svelte
│   │   │   ├── TechStack.svelte
│   │   │   └── TrustBar.svelte
│   │   ├── config/         # Конфигурация
│   │   │   └── constants.ts
│   │   ├── services/       # Сервисы
│   │   │   └── api.ts
│   │   ├── types.ts        # TypeScript типы
│   │   └── utils/          # Утилиты
│   │       ├── checkAccreditation.ts
│   │       ├── debounce.ts
│   │       ├── downloadRequisites.ts
│   │       └── validation.ts
│   ├── routes/             # SvelteKit routes
│   │   ├── +layout.svelte
│   │   ├── +page.svelte
│   │   ├── privacy/
│   │   │   └── +page.svelte
│   │   ├── api/
│   │   │   └── send-email/
│   │   │       └── +server.ts
│   │   └── layout.css
│   └── app.html
├── server/                 # Backend сервер (ElysiaJS)
│   ├── src/
│   │   └── index.ts        # ElysiaJS сервер
│   └── package.json
├── static/                 # Статические файлы
│   ├── logo.svg
│   ├── logo-text.svg
│   ├── robots.txt
│   ├── sitemap.xml
│   └── Карта Предприятия ООО Тотсофт.pdf
├── svelte.config.js        # Конфигурация SvelteKit
├── vite.config.ts          # Конфигурация Vite
├── tsconfig.json           # Конфигурация TypeScript
└── package.json
```

## 🔧 Конфигурация

### Переменные окружения

**Для frontend:**
- `VITE_API_URL` - URL backend API (опционально, по умолчанию используется SvelteKit API route `/api/send-email`)

**Для backend (server/.env):**
- `SMTP_USER` - Email для отправки писем (dev@totsoft.net)
- `SMTP_PASSWORD` - Пароль от почты для SMTP
- `NODE_ENV` - Режим работы (development/production)
- `PORT` - Порт сервера (по умолчанию 3000)

### TypeScript

Проект использует строгий режим TypeScript (`strict: true`) для максимальной типобезопасности.

### Tailwind CSS

Конфигурация Tailwind находится в `src/routes/layout.css` (Tailwind CSS v4 использует CSS-first конфигурацию).

## 🎨 Особенности

- ✅ **Svelte 5 Runes** - современная реактивность с `$state`, `$derived`, `$effect`
- ✅ **Валидация форм** - полная валидация всех полей с отображением ошибок
- ✅ **SEO оптимизация** - мета-теги, Open Graph, структурированные данные, robots.txt, sitemap.xml
- ✅ **Accessibility** - поддержка ARIA атрибутов, семантической разметки
- ✅ **Адаптивный дизайн** - корректное отображение на всех устройствах
- ✅ **TypeScript strict mode** - строгая типизация для надежности кода
- ✅ **Error Boundary** - обработка ошибок рендеринга через `<svelte:boundary>`
- ✅ **Server-Side Rendering** - SSR из коробки с SvelteKit
- ✅ **API Routes** - встроенные API endpoints в SvelteKit

## 🔒 Безопасность

✅ **Безопасность реализована:**

1. Все секреты (SMTP пароли) хранятся только в переменных окружения
2. SMTP настройки недоступны в браузерном коде
3. Валидация данных выполняется на стороне сервера
4. Rate limiting на backend (5 запросов за 15 минут с одного IP)
5. Экранирование HTML для защиты от XSS
6. Письма отправляются через защищенное SMTP соединение (SSL/TLS)

## 📝 API

### Отправка формы контакта

Форма отправляет данные через SvelteKit API route (`/api/send-email`) или ElysiaJS backend (если указан `VITE_API_URL`).

**SvelteKit API Route:**
- Endpoint: `POST /api/send-email`
- Проксирует запросы к ElysiaJS backend, если указан `VITE_API_URL`
- Иначе возвращает симуляцию для разработки

**ElysiaJS Backend:**
- Endpoint: `POST /api/send-email`
- Валидация данных
- Rate limiting
- Отправка писем через Beget SMTP

```typescript
import { submitContactForm } from '$lib/services/api';

const result = await submitContactForm({
  name: 'Иван Иванов',
  email: 'ivan@example.com',
  phone: '+7 (999) 123-45-67',
  description: 'Описание проекта...',
});

if (result.success) {
  console.log('Заявка отправлена!');
} else {
  console.error('Ошибка:', result.error);
}
```

## 🧪 Разработка

### Проверка типов

```bash
bun run check
```

### Добавление нового компонента

1. Создайте файл в `src/lib/components/`
2. Используйте Svelte 5 Runes (`$state`, `$derived`, `$props`)
3. Используйте TypeScript и строгую типизацию
4. Следуйте существующим паттернам проекта

### Валидация

Используйте утилиты из `src/lib/utils/validation.ts`:

```typescript
import { validateEmail, validatePhone } from '$lib/utils/validation';

const emailResult = validateEmail(email);
if (!emailResult.isValid) {
  console.error(emailResult.message);
}
```

## 📦 Деплой

### SvelteKit

SvelteKit поддерживает множество адаптеров для деплоя:

**Vercel (рекомендуется):**
```bash
npm i -D @sveltejs/adapter-vercel
```

**Node.js сервер:**
```bash
npm i -D @sveltejs/adapter-node
```

**Статический сайт:**
```bash
npm i -D @sveltejs/adapter-static
```

### Backend (ElysiaJS)

Backend можно запустить на любом сервере с поддержкой Bun:

```bash
cd server
bun run src/index.ts
```

Или использовать PM2 для production:

```bash
pm2 start server/src/index.ts --name totsoft-backend --interpreter bun
```

### Docker (опционально)

Можно создать Dockerfile для backend:

```dockerfile
FROM oven/bun:latest
WORKDIR /app
COPY server/package.json server/
RUN bun install
COPY server/ .
EXPOSE 3000
CMD ["bun", "run", "src/index.ts"]
```

## 🤝 Вклад в проект

1. Форкните репозиторий
2. Создайте ветку для фичи (`git checkout -b feature/AmazingFeature`)
3. Закоммитьте изменения (`git commit -m 'Add some AmazingFeature'`)
4. Запушьте в ветку (`git push origin feature/AmazingFeature`)
5. Откройте Pull Request

## 📄 Лицензия

Проект является собственностью ООО "Тотсофт". См. файл [LICENSE](LICENSE) для подробностей.

## 📞 Контакты

- Email: dev@totsoft.net
- Website: https://totsoft.net

---

Разработано с ❤️ [Артёмом Прянишниковым](https://github.com/FrankFMY) для команды Тотсофт
