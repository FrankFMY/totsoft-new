<script lang="ts">
	import {
		CheckCircle2,
		FileText,
		Server,
		ShieldCheck,
		Users,
	} from 'lucide-svelte';

	interface TrustItem {
		title: string;
		description: string;
		icon: any;
		iconColor: string;
	}

	const trustItems: TrustItem[] = [
		{
			title: 'Аккредитованная IT-компания',
			description:
				'Официальный статус и соответствие требованиям Минцифры',
			icon: ShieldCheck,
			iconColor: 'text-primary-400',
		},
		{
			title: 'Работаем по 44-ФЗ и 223-ФЗ',
			description: 'Готовность к тендерным процедурам и спецсчетам',
			icon: FileText,
			iconColor: 'text-blue-400',
		},
		{
			title: 'Команда уровня Senior/Middle+',
			description: 'Штат квалифицированных инженеров с опытом 5+ лет',
			icon: Users,
			iconColor: 'text-green-400',
		},
		{
			title: 'Собственные HighLoad-продукты',
			description:
				'Развиваем внутренние IT-платформы. Долгий горизонт планирования',
			icon: Server,
			iconColor: 'text-purple-400',
		},
		{
			title: 'Гарантия по договору',
			description: 'Финансовая ответственность и возможность постоплаты',
			icon: CheckCircle2,
			iconColor: 'text-yellow-400',
		},
	];
</script>

<section class="py-16 bg-dark-800 border-y border-white/5">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="text-center mb-12">
			<h2 class="text-2xl md:text-3xl font-bold text-white mb-4">
				Почему нам доверяют
			</h2>
			<p class="text-slate-400 max-w-2xl mx-auto">
				Мы молодая компания, но каждый наш сотрудник — ветеран
				индустрии. Надежность и экспертиза — наш главный актив.
			</p>
		</div>

		<div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
			{#each trustItems as item (item.title)}
				{@const Icon = item.icon}
				<div
					class="bg-dark-900 border border-white/5 rounded-xl p-6 hover:border-primary-500/30 transition-all hover:-translate-y-1 text-center"
				>
					<div class="flex justify-center mb-4">
						<Icon class="w-6 h-6 {item.iconColor}" />
					</div>
					<h3 class="text-lg font-bold text-white mb-2">
						{item.title}
					</h3>
					<p class="text-sm text-slate-400 leading-relaxed">
						{item.description}
					</p>
				</div>
			{/each}
		</div>
	</div>
</section>
