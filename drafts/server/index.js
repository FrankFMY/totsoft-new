import path from 'node:path';
import { fileURLToPath } from 'node:url';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import nodemailer from 'nodemailer';

// Загружаем переменные окружения
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// Trust proxy для корректного определения IP за nginx/reverse proxy
app.set('trust proxy', 1);

/**
 * Экранирование HTML для защиты от XSS
 */
const escapeHtml = (text) => {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
};

// Middleware
// CORS: разрешаем только с нашего домена и localhost для разработки
const allowedOrigins = [
  'https://totsoft.ru',
  'https://totsoft.net',
  'https://www.totsoft.ru',
  'https://www.totsoft.net',
];

// Добавляем localhost для разработки
if (process.env.NODE_ENV !== 'production') {
  allowedOrigins.push('http://localhost:3000', 'http://localhost:5173');
}

app.use(
  cors({
    origin: (origin, callback) => {
      // Разрешаем запросы без origin (например, Postman, мобильные приложения)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  })
);

// Ограничение размера тела запроса (10KB для формы)
app.use(express.json({ limit: '10kb' }));

// Отдаём статику из dist/ (собранный фронтенд)
// Путь: на уровень выше server/ находится dist/
const distPath = path.join(__dirname, '..', 'dist');
app.use(express.static(distPath));

// Настройки SMTP для Beget
const transporter = nodemailer.createTransport({
  host: 'smtp.beget.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.SMTP_USER || 'dev@totsoft.net',
    pass: process.env.SMTP_PASSWORD,
  },
});

/**
 * Валидация email
 */
const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

/**
 * Валидация телефона (минимум 10 цифр)
 */
const isValidPhone = (phone) => {
  const digitsOnly = phone.replace(/\D/g, '');
  return digitsOnly.length >= 10;
};

// Простой rate limiting (в продакшене лучше использовать express-rate-limit)
const requestCounts = new Map();
const RATE_LIMIT_WINDOW = 15 * 60 * 1000; // 15 минут
const RATE_LIMIT_MAX = 5; // максимум 5 запросов за окно

const checkRateLimit = (ip) => {
  const now = Date.now();
  const record = requestCounts.get(ip);

  if (!record || now > record.resetTime) {
    requestCounts.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return true;
  }

  if (record.count >= RATE_LIMIT_MAX) {
    return false;
  }

  record.count += 1;
  return true;
};

// Endpoint для отправки формы
app.post('/api/send-email', async (req, res) => {
  try {
    // Rate limiting
    const clientIp =
      req.ip ||
      req.headers['x-forwarded-for']?.split(',')[0]?.trim() ||
      req.socket.remoteAddress ||
      'unknown';
    if (!checkRateLimit(clientIp)) {
      return res.status(429).json({
        success: false,
        error: 'Слишком много запросов. Попробуйте позже.',
      });
    }

    const { name, email, phone, description, consent } = req.body;

    // Валидация типов и наличия данных
    if (
      typeof name !== 'string' ||
      typeof email !== 'string' ||
      typeof phone !== 'string' ||
      typeof description !== 'string' ||
      typeof consent !== 'boolean'
    ) {
      return res.status(400).json({
        success: false,
        error: 'Неверный формат данных',
      });
    }

    // Валидация наличия полей
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedPhone = phone.trim();
    const trimmedDescription = description.trim();

    if (!trimmedName || !trimmedEmail || !trimmedPhone || !trimmedDescription || !consent) {
      return res.status(400).json({
        success: false,
        error: 'Пожалуйста, заполните все обязательные поля',
      });
    }

    // Валидация формата
    if (trimmedName.length < 2 || trimmedName.length > 100) {
      return res.status(400).json({
        success: false,
        error: 'Имя должно содержать от 2 до 100 символов',
      });
    }

    if (!isValidEmail(trimmedEmail)) {
      return res.status(400).json({
        success: false,
        error: 'Введите корректный email адрес',
      });
    }

    if (!isValidPhone(trimmedPhone)) {
      return res.status(400).json({
        success: false,
        error: 'Введите корректный номер телефона',
      });
    }

    if (trimmedDescription.length < 20 || trimmedDescription.length > 5000) {
      return res.status(400).json({
        success: false,
        error: 'Описание должно содержать от 20 до 5000 символов',
      });
    }

    // Экранирование данных для HTML
    const safeName = escapeHtml(trimmedName);
    const safeEmail = escapeHtml(trimmedEmail);
    const safePhone = escapeHtml(trimmedPhone);
    const safeDescription = escapeHtml(trimmedDescription);

    // Очистка телефона для tel: ссылки (только цифры и +)
    const cleanPhone = trimmedPhone.replace(/[^\d+]/g, '');

    // Отправка письма
    await transporter.sendMail({
      from: `"Totsoft Website" <${process.env.SMTP_USER || 'dev@totsoft.net'}>`,
      to: 'dev@totsoft.net',
      replyTo: trimmedEmail, // Используем оригинальный email для replyTo
      subject: `Новая заявка от: ${safeName}`,
      html: `
        <h2>Новая заявка с сайта totsoft.net</h2>
        <p><strong>Имя:</strong> ${safeName}</p>
        <p><strong>Email:</strong> <a href="mailto:${safeEmail}">${safeEmail}</a></p>
        <p><strong>Телефон:</strong> <a href="tel:${cleanPhone}">${safePhone}</a></p>
        <p><strong>О проекте:</strong></p>
        <p style="white-space: pre-wrap;">${safeDescription}</p>
        <hr>
        <p style="color: #666; font-size: 12px;">
          Заявка отправлена с сайта totsoft.net<br>
          Время: ${new Date().toLocaleString('ru-RU')}
        </p>
      `,
      text: `
Новая заявка с сайта totsoft.net

Имя: ${trimmedName}
Email: ${trimmedEmail}
Телефон: ${trimmedPhone}

О проекте:
${trimmedDescription}

---
Заявка отправлена с сайта totsoft.net
Время: ${new Date().toLocaleString('ru-RU')}
      `,
    });

    return res.status(200).json({
      success: true,
      message: 'Заявка успешно отправлена!',
    });
  } catch (error) {
    console.error('Ошибка отправки:', error);
    return res.status(500).json({
      success: false,
      error: 'Ошибка при отправке письма',
      details: error instanceof Error ? error.message : 'Неизвестная ошибка',
    });
  }
});

// Health check
app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

// SPA fallback - все остальные GET запросы отдаём index.html
// Используем RegExp для catch-all вместо '*' (который не работает в Express 5)
app.get(/^(?!\/api|\/health).*$/, (_req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

// Глобальный обработчик ошибок (должен быть последним middleware)
app.use((err, _req, res, _next) => {
  console.error('Unhandled error:', err);

  // Если ответ уже отправлен, передаём ошибку дальше
  if (res.headersSent) {
    return _next(err);
  }

  // Отправляем ошибку клиенту
  res.status(err.status || 500).json({
    success: false,
    error: process.env.NODE_ENV === 'production' ? 'Внутренняя ошибка сервера' : err.message,
  });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📁 Serving static files from: ${distPath}`);
  console.log(`📧 Email API: POST /api/send-email`);
});
