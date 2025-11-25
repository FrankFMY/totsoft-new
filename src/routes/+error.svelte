<script lang="ts">
	import { page } from '$app/state';
	import { ArrowLeft, Home, RefreshCw } from 'lucide-svelte';
</script>

<svelte:head>
	<title>
		{page.status === 404 ? 'Страница не найдена' : 'Ошибка'}
		| Тотсофт
	</title>
	<meta name="robots" content="noindex, nofollow" />
</svelte:head>

<div class="min-h-screen bg-dark-900 flex items-center justify-center px-4">
	<div class="max-w-lg w-full text-center">
		<!-- Error Code -->
		<div class="mb-8">
			<span
				class="text-[10rem] md:text-[12rem] font-extrabold leading-none text-transparent bg-clip-text bg-linear-to-br from-primary-400 via-blue-500 to-indigo-500 select-none"
			>
				{page.status}
			</span>
		</div>

		<!-- Error Message -->
		<h1 class="text-3xl md:text-4xl font-bold text-white mb-4">
			{#if page.status === 404}
				Страница не найдена
			{:else if page.status === 500}
				Внутренняя ошибка сервера
			{:else}
				Что-то пошло не так
			{/if}
		</h1>

		<p class="text-slate-400 text-lg mb-8 max-w-md mx-auto">
			{#if page.status === 404}
				Запрашиваемая страница не существует или была перемещена. Проверьте правильность адреса или
				вернитесь на главную.
			{:else}
				Произошла непредвиденная ошибка. Пожалуйста, попробуйте обновить страницу или вернитесь на
				главную.
			{/if}
		</p>

		{#if page.error?.message}
			<div class="mb-8 p-4 bg-dark-800 border border-white/10 rounded-xl">
				<p class="text-sm text-slate-500 font-mono">{page.error.message}</p>
			</div>
		{/if}

		<!-- Actions -->
		<div class="flex flex-col sm:flex-row gap-4 justify-center">
			<a
				href="/"
				class="inline-flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-500 text-white px-6 py-3 rounded-xl font-semibold transition-all hover:-translate-y-0.5"
			>
				<Home size={20} />
				На главную
			</a>
			<button
				type="button"
				onclick={() => history.back()}
				class="inline-flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white px-6 py-3 rounded-xl font-semibold transition-all hover:-translate-y-0.5"
			>
				<ArrowLeft size={20} />
				Назад
			</button>
			<button
				type="button"
				onclick={() => location.reload()}
				class="inline-flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white px-6 py-3 rounded-xl font-semibold transition-all hover:-translate-y-0.5"
			>
				<RefreshCw size={20} />
				Обновить
			</button>
		</div>

		<!-- Contact Info -->
		<div class="mt-12 pt-8 border-t border-white/10">
			<p class="text-slate-500 text-sm">
				Если проблема сохраняется, свяжитесь с нами:
				<a href="mailto:dev@totsoft.net" class="text-primary-400 hover:text-primary-300">
					dev@totsoft.net
				</a>
			</p>
		</div>
	</div>
</div>
