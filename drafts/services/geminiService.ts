import { GoogleGenAI, Type } from '@google/genai';
import { ProjectAnalysis } from '../types';

// Lazy initialization - only create instance when needed
let aiInstance: GoogleGenAI | null = null;

/**
 * Получить экземпляр GoogleGenAI
 * @returns Экземпляр AI или null, если API ключ не найден
 */
const getAIInstance = (): GoogleGenAI | null => {
  // ВАЖНО: В продакшене API ключ должен использоваться только на backend
  // Здесь используется только для разработки/демо
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

  if (!apiKey) {
    if (process.env.NODE_ENV === 'development') {
      console.warn(
        '⚠️ Gemini API key not found. AI analysis will use fallback.\n' +
          'Set VITE_GEMINI_API_KEY in .env.local for AI features.'
      );
    }
    return null;
  }

  if (!aiInstance) {
    try {
      aiInstance = new GoogleGenAI({ apiKey });
    } catch (error) {
      console.error('Failed to initialize GoogleGenAI:', error);
      return null;
    }
  }

  return aiInstance;
};

/**
 * Fallback анализ проекта, возвращаемый при отсутствии API ключа или ошибке
 */
const getFallbackAnalysis = (): ProjectAnalysis => ({
  summary: 'Мы получили вашу заявку. Наши специалисты проанализируют её вручную.',
  techStack: ['React', 'Node.js', 'PostgreSQL'],
  estimatedDuration: 'Уточняется',
  complexity: 'Medium',
  recommendation: 'Давайте обсудим детали на звонке для точной оценки.',
});

/**
 * Анализ проекта с помощью AI
 * @param description - Описание проекта от клиента
 * @returns Анализ проекта или fallback, если AI недоступен
 */
export const analyzeProjectRequest = async (description: string): Promise<ProjectAnalysis> => {
  // Валидация входных данных
  if (!description || typeof description !== 'string' || description.trim().length === 0) {
    throw new Error('Описание проекта не может быть пустым');
  }

  try {
    const ai = getAIInstance();

    // If no API key, return fallback immediately
    if (!ai) {
      return getFallbackAnalysis();
    }

    const model = 'gemini-2.5-flash';

    const prompt = `
      You are a Senior Technical CTO at "Totsoft", an accredited IT company. 
      Analyze the following project request from a potential client:
      "${description}"
      
      Provide a structured technical analysis to impress the client. 
      Be realistic but ambitious.
      Return JSON.
    `;

    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            summary: {
              type: Type.STRING,
              description:
                'A professional technical summary of what needs to be built (max 2 sentences).',
            },
            techStack: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description:
                'List of 3-5 recommended modern technologies (e.g. React, Python, Go, AWS).',
            },
            estimatedDuration: {
              type: Type.STRING,
              description: "Rough timeline estimate (e.g., '2-3 months' or '6+ months').",
            },
            complexity: { type: Type.STRING, enum: ['Low', 'Medium', 'High', 'Enterprise'] },
            recommendation: {
              type: Type.STRING,
              description: 'One key strategic advice for this specific project.',
            },
          },
          required: ['summary', 'techStack', 'estimatedDuration', 'complexity', 'recommendation'],
        },
      },
    });

    const text = response.text;
    if (!text) {
      throw new Error('AI вернул пустой ответ');
    }

    try {
      const parsed = JSON.parse(text) as ProjectAnalysis;

      // Валидация структуры ответа
      if (
        !parsed.summary ||
        !Array.isArray(parsed.techStack) ||
        !parsed.estimatedDuration ||
        !parsed.complexity ||
        !parsed.recommendation
      ) {
        throw new Error('Неверная структура ответа от AI');
      }

      return parsed;
    } catch (parseError) {
      console.error('Failed to parse AI response:', parseError);
      throw new Error('Не удалось обработать ответ от AI');
    }
  } catch (error) {
    // Логируем ошибку для отладки
    if (process.env.NODE_ENV === 'development') {
      console.error('AI Analysis failed:', error);
    }

    // Всегда возвращаем fallback, чтобы UI не сломался
    return getFallbackAnalysis();
  }
};
