/**
 * API сервис для отправки данных формы
 */

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  description: string;
  analysis?: {
    summary: string;
    techStack: string[];
    estimatedDuration: string;
    complexity: string;
    recommendation: string;
  } | null;
}

export interface ApiResponse {
  success: boolean;
  message?: string;
  error?: string;
}

/**
 * Отправка формы контакта
 * Поддерживает несколько вариантов:
 * 1. Vercel Serverless Function (/api/send-email) - на Vercel
 * 2. Backend API (VITE_API_URL) - на собственном сервере
 * 3. Симуляция - для локальной разработки
 */
export const submitContactForm = async (data: ContactFormData): Promise<ApiResponse> => {
  try {
    // Определяем URL для отправки
    // Если указан VITE_API_URL (для собственного сервера), используем его
    // Иначе пробуем Vercel Serverless Function
    const apiUrl = import.meta.env.VITE_API_URL || '/api/send-email';

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        phone: data.phone,
        description: data.description,
        consent: true, // Форма уже проверяет согласие перед отправкой
      }),
    });

    const result = await response.json();

    if (response.ok && result.success) {
      return {
        success: true,
        message: result.message || 'Заявка успешно отправлена',
      };
    }

    // Если endpoint не найден (404) - значит локальная разработка без Vercel CLI
    if (response.status === 404) {
      console.warn(
        '⚠️ Vercel Serverless Function недоступен. Используется симуляция для локальной разработки.'
      );
      await new Promise((resolve) => setTimeout(resolve, 1500));
      return {
        success: true,
        message: 'Заявка успешно отправлена (симуляция)',
      };
    }

    // Если есть ошибка от сервера
    return {
      success: false,
      error: result.error || 'Ошибка при отправке заявки',
    };
  } catch (error) {
    console.error('Failed to submit contact form:', error);

    // Если это сетевая ошибка (например, CORS или недоступный сервер)
    // и мы в режиме разработки, используем симуляцию
    if (import.meta.env.DEV) {
      console.warn('⚠️ Ошибка подключения. Используется симуляция для локальной разработки.');
      await new Promise((resolve) => setTimeout(resolve, 1500));
      return {
        success: true,
        message: 'Заявка успешно отправлена (симуляция)',
      };
    }

    return {
      success: false,
      error: error instanceof Error ? error.message : 'Произошла ошибка при отправке формы',
    };
  }
};
