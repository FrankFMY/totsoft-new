/**
 * API сервис для отправки данных формы
 */

import type { ContactFormData } from '$lib/types';

export interface ApiResponse {
	success: boolean;
	message?: string;
	error?: string;
}

/**
 * Отправка формы контакта через SvelteKit API route
 * В dev режиме без SMTP_PASSWORD используется симуляция
 */
export const submitContactForm = async (data: ContactFormData): Promise<ApiResponse> => {
	try {
		// Отправляем на SvelteKit API route
		const apiUrl = '/api/send-email';

		const response = await fetch(apiUrl, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				name: data.name,
				email: data.email,
				phone: data.phone,
				description: data.description,
				consent: true // Форма уже проверяет согласие перед отправкой
			})
		});

		const result = await response.json();

		if (response.ok && result.success) {
			return {
				success: true,
				message: result.message || 'Заявка успешно отправлена'
			};
		}

		// Если endpoint не найден (404) - значит локальная разработка без API
		if (response.status === 404) {
			console.warn('⚠️ API endpoint недоступен. Используется симуляция для локальной разработки.');
			await new Promise((resolve) => setTimeout(resolve, 1500));
			return {
				success: true,
				message: 'Заявка успешно отправлена (симуляция)'
			};
		}

		// Если есть ошибка от сервера
		return {
			success: false,
			error: result.error || 'Ошибка при отправке заявки'
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
				message: 'Заявка успешно отправлена (симуляция)'
			};
		}

		return {
			success: false,
			error: error instanceof Error ? error.message : 'Произошла ошибка при отправке формы'
		};
	}
};
