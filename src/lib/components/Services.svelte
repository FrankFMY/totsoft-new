<script lang="ts">
	import { FileText, Rocket, Settings, Users } from 'lucide-svelte';
	import type { ServiceItem } from '$lib/types';

	const services: Array<
		Omit<ServiceItem, 'icon'> & { icon: any; iconColor: string }
	> = [
		{
			title: 'Тендерная разработка',
			description:
				'Работа по ТЗ заказчика. Соблюдение ГОСТ 34 и требований 44/223-ФЗ. Юридическое сопровождение. Поставка под ключ с гарантией.',
			icon: FileText,
			iconColor: 'text-primary-400',
		},
		{
			title: 'IT-Аутсорсинг и Аутстафф',
			description:
				'Усиление команд заказчика нашими специалистами. Выделенные команды (2-10 человек). Стек: Tech Lead, Frontend, Backend, DevOps, QA, PJM. Замена специалистов в течение 7 дней.',
			icon: Users,
			iconColor: 'text-blue-400',
		},
		{
			title: 'Комплексная разработка',
			description:
				'MVP и продуктовая разработка. Highload-системы и микросервисы. Корпоративное ПО под ключ. Техническая поддержка и развитие.',
			icon: Rocket,
			iconColor: 'text-green-400',
		},
	];
</script>

<section
	id="services"
	class="py-24 bg-dark-800 relative"
>
	<!-- Decorative background -->
	<div
		class="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-white/10 to-transparent"
	></div>

	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div
			class="flex flex-col md:flex-row justify-between items-end mb-16 gap-6"
		>
			<div class="max-w-2xl">
				<h2 class="text-3xl md:text-5xl font-bold text-white mb-4">
					Что мы умеем
				</h2>
				<p class="text-slate-400 text-lg">
					Мы закрываем полный цикл производства ПО: от первого созвона
					и аналитики до многолетней поддержки серверов. Беремся за
					задачи, от которых отказываются другие.
				</p>
			</div>
			<a
				href="#contact"
				class="hidden md:inline-flex items-center gap-2 text-primary-400 font-medium hover:text-primary-300 transition-colors"
			>
				Запросить прайс-лист <Settings size={16} />
			</a>
		</div>

		<div class="grid grid-cols-1 md:grid-cols-3 gap-8">
			{#each services as service (service.title)}
				{@const Icon = service.icon}
				<div
					class="group bg-dark-900 hover:bg-dark-900/80 border border-white/5 hover:border-primary-500/30 p-8 rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary-900/10 flex flex-col h-full"
				>
					<div
						class="w-16 h-16 bg-dark-800 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary-500/10 group-hover:text-white transition-colors border border-white/5"
					>
						<Icon class="w-8 h-8 {service.iconColor}" />
					</div>
					<h3
						class="text-2xl font-bold text-white mb-4 group-hover:text-primary-400 transition-colors"
					>
						{service.title}
					</h3>
					<p class="text-slate-400 leading-relaxed grow">
						{service.description}
					</p>
				</div>
			{/each}
		</div>

		<div class="mt-12 text-center md:hidden">
			<a
				href="#contact"
				class="inline-flex items-center gap-2 text-primary-400 font-medium"
			>
				Запросить прайс-лист <Settings size={16} />
			</a>
		</div>
	</div>
</section>
