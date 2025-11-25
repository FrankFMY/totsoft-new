<script lang="ts">
	import { CheckCircleIcon, MenuIcon, XIcon } from 'lucide-svelte';
	import { COMPANY_INFO } from '$lib/config/constants';

	let isScrolled = $state(false);
	let isMenuOpen = $state(false);

	$effect(() => {
		const handleScroll = () => {
			isScrolled = window.scrollY > 20;
		};

		const options: AddEventListenerOptions = { passive: true };
		window.addEventListener('scroll', handleScroll, options);

		return () => {
			window.removeEventListener('scroll', handleScroll, options);
		};
	});

	const navLinks = [
		{ name: 'Услуги', href: '#services' },
		{ name: 'Технологии', href: '#stack' },
		{ name: 'Преимущества', href: '#about' },
		{ name: 'Процесс', href: '#process' }
	];

	const scrollToTop = () => {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	};
</script>

<nav
	class="fixed top-0 w-full z-50 transition-all duration-300 {isScrolled
		? 'bg-dark-900/90 backdrop-blur-md border-b border-white/10 py-4'
		: 'bg-transparent py-6'}"
>
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
		<!-- Logo -->
		<button
			type="button"
			onclick={scrollToTop}
			class="flex items-center gap-1 hover:opacity-80 transition-opacity"
			aria-label="Перейти наверх страницы"
		>
			<div class="w-10 h-10 flex items-center justify-center">
				<img src="/logo.svg" alt="TOTSOFT" class="w-10 h-10" />
			</div>
			<div class="flex flex-col">
				<img src="/logo-text.svg" alt="TOTSOFT" class="h-7" />
				<span
					class="text-[10px] uppercase tracking-widest text-primary-400 flex items-center gap-1 mt-0.5"
				>
					<CheckCircleIcon size={10} /> Аккредитовано
				</span>
			</div>
		</button>

		<!-- Desktop Nav -->
		<div class="hidden md:flex items-center space-x-8">
			{#each navLinks as link (link.href)}
				<a
					href={link.href}
					class="text-slate-300 hover:text-white transition-colors text-sm font-medium uppercase tracking-wide"
				>
					{link.name}
				</a>
			{/each}
			<a
				href="tel:{COMPANY_INFO.contacts.phones[0].phone.replace(/\s/g, '')}"
				class="flex flex-col items-center text-white hover:text-primary-400 transition-colors"
			>
				<span class="text-base font-semibold">{COMPANY_INFO.contacts.phones[0].phone}</span>
				<span class="text-xs text-slate-400 text-center">Пн-Пт 9:00 - 18:00</span>
			</a>
			<a
				href="#contact"
				class="bg-white text-dark-900 hover:bg-primary-50 px-6 py-2.5 rounded-lg font-semibold transition-all transform hover:scale-105 shadow-lg shadow-white/10"
			>
				Обсудить проект
			</a>
		</div>

		<!-- Mobile Menu Button -->
		<div class="md:hidden">
			<button
				type="button"
				onclick={() => (isMenuOpen = !isMenuOpen)}
				class="text-white focus:outline-none focus:ring-2 focus:ring-primary-500 rounded p-1"
				aria-label={isMenuOpen ? 'Закрыть меню' : 'Открыть меню'}
				aria-expanded={isMenuOpen}
			>
				{#if isMenuOpen}
					<XIcon size={28} />
				{:else}
					<MenuIcon size={28} />
				{/if}
			</button>
		</div>
	</div>

	<!-- Mobile Nav -->
	{#if isMenuOpen}
		<div
			class="md:hidden absolute top-full left-0 w-full bg-dark-800 border-b border-white/10 shadow-2xl"
			role="navigation"
			aria-label="Мобильная навигация"
		>
			<div class="px-4 pt-2 pb-6 space-y-2">
				{#each navLinks as link (link.href)}
					<a
						href={link.href}
						onclick={() => (isMenuOpen = false)}
						class="block px-3 py-3 text-base font-medium text-slate-300 hover:text-white hover:bg-white/5 rounded-md"
					>
						{link.name}
					</a>
				{/each}
				<button
					type="button"
					onclick={() => {
						isMenuOpen = false;
						window.location.href = '#contact';
					}}
					class="block w-full mt-4 text-center px-3 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-bold"
				>
					Обсудить проект
				</button>
			</div>
		</div>
	{/if}
</nav>
