import { json } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import nodemailer from 'nodemailer';
import type { RequestHandler } from './$types';

/**
 * Экранирование HTML для защиты от XSS
 */
const escapeHtml = (text: string): string => {
	const map: Record<string, string> = {
		'&': '&amp;',
		'<': '&lt;',
		'>': '&gt;',
		'"': '&quot;',
		"'": '&#039;'
	};
	return text.replace(/[&<>"']/g, (m) => map[m]);
};

/**
 * Валидация email
 */
const isValidEmail = (email: string): boolean => {
	return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

/**
 * Валидация телефона (минимум 10 цифр)
 */
const isValidPhone = (phone: string): boolean => {
	const digitsOnly = phone.replace(/\D/g, '');
	return digitsOnly.length >= 10;
};

/**
 * Rate limiting (5 запросов за 15 минут с одного IP)
 */
const requestCounts = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW = 15 * 60 * 1000; // 15 минут
const RATE_LIMIT_MAX = 5; // максимум 5 запросов за окно

const checkRateLimit = (ip: string): boolean => {
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

export const POST: RequestHandler = async ({ request }) => {
	try {
		// Rate limiting
		const clientIp =
			request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
			request.headers.get('x-real-ip') ||
			'unknown';

		if (!checkRateLimit(clientIp)) {
			return json(
				{
					success: false,
					error: 'Слишком много запросов. Попробуйте позже.'
				},
				{ status: 429 }
			);
		}

		const body = await request.json();
		const { name, email, phone, description, consent } = body;

		// Валидация типов
		if (
			typeof name !== 'string' ||
			typeof email !== 'string' ||
			typeof phone !== 'string' ||
			typeof description !== 'string' ||
			typeof consent !== 'boolean'
		) {
			return json(
				{
					success: false,
					error: 'Неверный формат данных'
				},
				{ status: 400 }
			);
		}

		// Валидация наличия полей
		const trimmedName = name.trim();
		const trimmedEmail = email.trim();
		const trimmedPhone = phone.trim();
		const trimmedDescription = description.trim();

		if (!trimmedName || !trimmedEmail || !trimmedPhone || !trimmedDescription || !consent) {
			return json(
				{
					success: false,
					error: 'Пожалуйста, заполните все обязательные поля'
				},
				{ status: 400 }
			);
		}

		// Валидация длины имени
		if (trimmedName.length < 2 || trimmedName.length > 100) {
			return json(
				{
					success: false,
					error: 'Имя должно содержать от 2 до 100 символов'
				},
				{ status: 400 }
			);
		}

		// Валидация формата email
		if (!isValidEmail(trimmedEmail)) {
			return json(
				{
					success: false,
					error: 'Введите корректный email адрес'
				},
				{ status: 400 }
			);
		}

		// Валидация телефона
		if (!isValidPhone(trimmedPhone)) {
			return json(
				{
					success: false,
					error: 'Введите корректный номер телефона'
				},
				{ status: 400 }
			);
		}

		// Валидация длины описания
		if (trimmedDescription.length < 20 || trimmedDescription.length > 5000) {
			return json(
				{
					success: false,
					error: 'Описание должно содержать от 20 до 5000 символов'
				},
				{ status: 400 }
			);
		}

		// Отправляем email напрямую через SvelteKit API route
		const smtpUser = env.SMTP_USER || 'dev@totsoft.net';
		const smtpPassword = env.SMTP_PASSWORD;

		// Если нет пароля SMTP, возвращаем симуляцию для разработки
		if (!smtpPassword) {
			if (import.meta.env.DEV) {
				console.warn('⚠️ SMTP_PASSWORD не настроен. Используется симуляция для разработки.');
				return json({
					success: true,
					message: 'Заявка успешно отправлена (симуляция)'
				});
			}
			return json(
				{
					success: false,
					error: 'Email сервис не настроен. Укажите SMTP_PASSWORD в переменных окружения.'
				},
				{ status: 500 }
			);
		}

		// Экранирование данных для HTML
		const safeName = escapeHtml(trimmedName);
		const safeEmail = escapeHtml(trimmedEmail);
		const safePhone = escapeHtml(trimmedPhone);
		const safeDescription = escapeHtml(trimmedDescription);

		// Очистка телефона для tel: ссылки (только цифры и +)
		const cleanPhone = trimmedPhone.replace(/[^\d+]/g, '');

		try {
			// Настройка SMTP
			const transporter = nodemailer.createTransport({
				host: 'smtp.beget.com',
				port: 465,
				secure: true,
				auth: {
					user: smtpUser,
					pass: smtpPassword
				}
			});

			// Отправка письма
			await transporter.sendMail({
				from: `"Totsoft Website" <${smtpUser}>`,
				to: 'dev@totsoft.net',
				replyTo: trimmedEmail,
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
            Время: ${new Date().toLocaleString('ru-RU')}<br>
            IP: ${clientIp}
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
IP: ${clientIp}
        `
			});

			return json({
				success: true,
				message: 'Заявка успешно отправлена!'
			});
		} catch (error) {
			console.error('Ошибка отправки email:', error);

			// В режиме разработки возвращаем симуляцию при ошибке
			if (import.meta.env.DEV) {
				console.warn('⚠️ Ошибка отправки email. Используется симуляция для разработки.');
				return json({
					success: true,
					message: 'Заявка успешно отправлена (симуляция)'
				});
			}

			return json(
				{
					success: false,
					error: 'Ошибка при отправке письма',
					details: error instanceof Error ? error.message : undefined
				},
				{ status: 500 }
			);
		}
	} catch (error) {
		console.error('Email sending failed:', error);

		// Обработка ошибок парсинга JSON
		if (error instanceof SyntaxError) {
			return json(
				{
					success: false,
					error: 'Неверный формат данных'
				},
				{ status: 400 }
			);
		}

		return json(
			{
				success: false,
				error: 'Не удалось отправить заявку. Попробуйте позже.',
				details: import.meta.env.DEV && error instanceof Error ? error.message : undefined
			},
			{ status: 500 }
		);
	}
};
