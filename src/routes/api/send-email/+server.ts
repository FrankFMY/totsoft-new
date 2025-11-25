import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

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

export const POST: RequestHandler = async ({ request }) => {
  try {
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
          error: 'Неверный формат данных',
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
          error: 'Пожалуйста, заполните все обязательные поля',
        },
        { status: 400 }
      );
    }

    // Валидация длины имени
    if (trimmedName.length < 2 || trimmedName.length > 100) {
      return json(
        {
          success: false,
          error: 'Имя должно содержать от 2 до 100 символов',
        },
        { status: 400 }
      );
    }

    // Валидация формата email
    if (!isValidEmail(trimmedEmail)) {
      return json(
        {
          success: false,
          error: 'Введите корректный email адрес',
        },
        { status: 400 }
      );
    }

    // Валидация телефона
    if (!isValidPhone(trimmedPhone)) {
      return json(
        {
          success: false,
          error: 'Введите корректный номер телефона',
        },
        { status: 400 }
      );
    }

    // Валидация длины описания
    if (trimmedDescription.length < 20 || trimmedDescription.length > 5000) {
      return json(
        {
          success: false,
          error: 'Описание должно содержать от 20 до 5000 символов',
        },
        { status: 400 }
      );
    }

    // Если указан VITE_API_URL, проксируем запрос к ElysiaJS
    const apiUrl = import.meta.env.VITE_API_URL;
    if (apiUrl) {
      try {
        const response = await fetch(`${apiUrl}/api/send-email`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: trimmedName,
            email: trimmedEmail,
            phone: trimmedPhone,
            description: trimmedDescription,
            consent,
          }),
        });

        const result = await response.json();
        return json(result, { status: response.ok ? 200 : response.status || 500 });
      } catch (error) {
        console.error('Failed to proxy to ElysiaJS:', error);
        // Fallback: возвращаем успех для разработки
        if (import.meta.env.DEV) {
          return json({
            success: true,
            message: 'Заявка успешно отправлена (симуляция)',
          });
        }
        throw error;
      }
    }

    // Если ElysiaJS не настроен, возвращаем симуляцию для разработки
    if (import.meta.env.DEV) {
      // В продакшене здесь должна быть реальная отправка email
      return json({
        success: true,
        message: 'Заявка успешно отправлена (симуляция)',
      });
    }

    return json(
      {
        success: false,
        error: 'Email сервис не настроен',
      },
      { status: 500 }
    );
  } catch (error) {
    console.error('Email sending failed:', error);
    
    // Обработка ошибок парсинга JSON
    if (error instanceof SyntaxError) {
      return json(
        {
          success: false,
          error: 'Неверный формат данных',
        },
        { status: 400 }
      );
    }

    return json(
      {
        success: false,
        error: 'Не удалось отправить заявку. Попробуйте позже.',
        details: import.meta.env.DEV && error instanceof Error ? error.message : undefined,
      },
      { status: 500 }
    );
  }
};
