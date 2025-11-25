/**
 * Путь к PDF файлу с реквизитами в папке public
 * В Vite файлы из public доступны по корневому пути
 */
const REQUISITES_PDF_PATH = '/Карта Предприятия ООО Тотсофт.pdf';

/**
 * Скачать реквизиты компании в виде PDF файла
 */
export const downloadRequisites = async (): Promise<void> => {
	try {
		// Скачиваем файл через fetch
		const response = await fetch(REQUISITES_PDF_PATH);
		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		// Создаем blob из ответа
		const blob = await response.blob();
		const url = URL.createObjectURL(blob);

		// Создаем временную ссылку для скачивания
		const link = document.createElement('a');
		link.href = url;
		link.download = 'Карта Предприятия ООО Тотсофт.pdf';
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);

		// Освобождаем память
		URL.revokeObjectURL(url);
	} catch (error) {
		console.error('Failed to download requisites:', error);
		alert('Не удалось скачать реквизиты. Попробуйте позже.');
	}
};
