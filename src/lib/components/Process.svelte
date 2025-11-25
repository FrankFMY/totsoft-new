<script lang="ts">
	import {
		Cog,
		FileCode,
		Headphones,
		MessageSquare,
		Rocket,
	} from 'lucide-svelte';

	const steps = [
		{
			id: '01',
			title: 'Анализ и оценка',
			desc: 'Изучение ТЗ / потребностей. Оценка сроков и бюджета. Формирование команды.',
			icon: MessageSquare,
		},
		{
			id: '02',
			title: 'Договор и старт',
			desc: 'Подписание контракта с SLA. Kickoff-встреча. Доступ к инфраструктуре.',
			icon: FileCode,
		},
		{
			id: '03',
			title: 'Разработка',
			desc: 'Спринты по 2 недели. Еженедельные отчеты. Демо промежуточных результатов.',
			icon: Cog,
		},
		{
			id: '04',
			title: 'Тестирование и сдача',
			desc: 'Функциональное и нагрузочное тестирование. Документация. Передача в эксплуатацию.',
			icon: Rocket,
		},
		{
			id: '05',
			title: 'Поддержка',
			desc: 'Гарантийное обслуживание. Доработки и масштабирование. Консультации.',
			icon: Headphones,
		},
	];
</script>

<section
	id="process"
	class="py-24 bg-dark-900 border-t border-white/5"
>
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="text-center mb-16">
			<h2 class="text-3xl md:text-5xl font-bold text-white mb-4">
				Как мы работаем
			</h2>
			<p class="text-slate-400 text-lg max-w-2xl mx-auto mb-4">
				Ведем вас за руку на всех этапах. Прозрачность — наш главный
				принцип. Вы всегда знаете, за что платите и на какой стадии
				проект.
			</p>
			<p class="text-slate-500 text-sm max-w-xl mx-auto">
				Все этапы прописаны в договоре с SLA. Гарантируем соблюдение
				сроков и качества. Возможна постоплата по договоренности.
			</p>
		</div>

		<div class="relative">
			<!-- Connecting Line (Desktop) -->
			<div
				class="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-linear-to-r from-dark-800 via-primary-500/50 to-dark-800 -translate-y-1/2 z-0"
			></div>

			<div class="grid grid-cols-1 md:grid-cols-5 gap-8 relative z-10">
				{#each steps as step (step.id)}
					{@const Icon = step.icon}
					<div class="relative group">
						<div
							class="bg-dark-800 border border-white/10 p-6 rounded-2xl h-full hover:border-primary-500/50 transition-all hover:-translate-y-2 hover:shadow-lg hover:shadow-primary-900/20"
						>
							<div
								class="w-12 h-12 bg-dark-900 rounded-full border border-white/10 flex items-center justify-center text-primary-400 mb-4 group-hover:bg-primary-500 group-hover:text-white transition-colors shadow-inner"
							>
								<Icon size={24} />
							</div>
							<div
								class="absolute top-6 right-6 text-4xl font-bold text-white/5 font-mono group-hover:text-primary-500/10 transition-colors"
							>
								{step.id}
							</div>
							<h3 class="text-lg font-bold text-white mb-2">
								{step.title}
							</h3>
							<p class="text-sm text-slate-400 leading-relaxed">
								{step.desc}
							</p>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</div>
</section>
