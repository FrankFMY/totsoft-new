<script lang="ts">
	import { AlertCircle } from 'lucide-svelte';
	import { dev } from '$app/environment';

	interface Props {
		error?: Error;
		reset?: () => void;
	}

	let { error, reset }: Props = $props();
</script>

<div class="min-h-screen bg-dark-900 flex items-center justify-center px-4">
	<div class="max-w-md w-full bg-dark-800 border border-red-500/30 rounded-2xl p-8 text-center">
		<div class="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
			<AlertCircle class="text-red-400 w-8 h-8" />
		</div>
		<h2 class="text-2xl font-bold text-white mb-4">Что-то пошло не так</h2>
		<p class="text-slate-400 mb-6">
			Произошла непредвиденная ошибка. Пожалуйста, обновите страницу или попробуйте позже.
		</p>
		{#if dev && error}
			<details class="mb-6 text-left">
				<summary class="text-sm text-slate-500 cursor-pointer mb-2">
					Детали ошибки (только в режиме разработки)
				</summary>
				<pre class="text-xs text-red-400 bg-dark-900 p-4 rounded-lg overflow-auto">
          {error.toString()}
          {error.stack}
        </pre>
			</details>
		{/if}
		<div class="flex gap-4 justify-center">
			{#if reset}
				<button
					type="button"
					onclick={reset}
					class="px-6 py-3 bg-primary-600 hover:bg-primary-500 text-white rounded-xl font-medium transition-colors"
				>
					Попробовать снова
				</button>
			{/if}
			<button
				type="button"
				onclick={() => window.location.reload()}
				class="px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl font-medium transition-colors"
			>
				Обновить страницу
			</button>
		</div>
	</div>
</div>
