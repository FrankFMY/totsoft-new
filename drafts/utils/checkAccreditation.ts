/**
 * URL для проверки аккредитации в реестре Минцифры
 * В реальном проекте это должен быть конкретный URL реестра
 */
const ACCREDITATION_REGISTRY_URL = 'https://digital.gov.ru/ru/activity/govservices/2/';

/**
 * Открыть страницу проверки аккредитации в новой вкладке
 */
export const checkAccreditation = (): void => {
  try {
    // Открываем реестр аккредитованных IT-компаний
    // В реальном проекте здесь должен быть конкретный URL с параметрами поиска
    window.open(ACCREDITATION_REGISTRY_URL, '_blank', 'noopener,noreferrer');
  } catch (error) {
    console.error('Failed to open accreditation registry:', error);
    alert('Не удалось открыть реестр аккредитации. Попробуйте позже.');
  }
};
