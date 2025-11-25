/// <reference types="vite/client" />

// Расширяем существующий интерфейс ImportMetaEnv из vite/client
declare module 'vite/client' {
	interface ImportMetaEnv {
		readonly VITE_GEMINI_API_KEY?: string; // Для AI сервиса (если используется)
	}
}
