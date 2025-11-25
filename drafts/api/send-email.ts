import type { VercelRequest, VercelResponse } from '@vercel/node';
import nodemailer from 'nodemailer';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Разрешаем только POST запросы
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { name, email, phone, description, consent } = req.body;

  // Валидация данных
  if (!name || !email || !phone || !description || !consent) {
    return res.status(400).json({
      success: false,
      error: 'Пожалуйста, заполните все обязательные поля',
    });
  }

  // Настройки SMTP для Beget
  const transporter = nodemailer.createTransport({
    host: 'smtp.beget.com',
    port: 465,
    secure: true, // true для 465 порта
    auth: {
      user: process.env.SMTP_USER, // dev@totsoft.net
      pass: process.env.SMTP_PASSWORD, // Пароль от почты
    },
  });

  try {
    // Отправка письма
    await transporter.sendMail({
      from: `"Totsoft Website" <${process.env.SMTP_USER}>`,
      to: 'dev@totsoft.net',
      replyTo: email, // Чтобы при ответе подставлялась почта клиента
      subject: `Новая заявка от: ${name}`,
      html: `
        <h2>Новая заявка с сайта totsoft.ru</h2>
        <p><strong>Имя:</strong> ${name}</p>
        <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
        <p><strong>Телефон:</strong> <a href="tel:${phone.replace(/\s/g, '')}">${phone}</a></p>
        <p><strong>О проекте:</strong></p>
        <p style="white-space: pre-wrap;">${description}</p>
        <hr>
        <p style="color: #666; font-size: 12px;">
          Заявка отправлена с сайта totsoft.ru<br>
          Время: ${new Date().toLocaleString('ru-RU')}
        </p>
      `,
      text: `
Новая заявка с сайта totsoft.ru

Имя: ${name}
Email: ${email}
Телефон: ${phone}

О проекте:
${description}

---
Заявка отправлена с сайта totsoft.ru
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
}
