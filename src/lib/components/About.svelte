<script lang="ts">
	import {
		CheckCircle2Icon,
		ClockIcon,
		FileCheck2Icon,
		ShieldIcon,
		Users2Icon,
		ZapIcon,
	} from 'lucide-svelte';
	import { COMPANY_INFO } from '$lib/config/constants';
	import { checkAccreditation } from '$lib/utils/checkAccreditation';
	import { downloadRequisites } from '$lib/utils/downloadRequisites';

	const benefits = [
		{
			title: 'Юридическая прозрачность',
			desc: 'Полный комплект документов. Аккредитация и лицензии. Финансовые гарантии.',
			icon: ShieldIcon,
			iconColor: 'text-primary-400',
		},
		{
			title: 'Собственная методология',
			desc: 'Проверенные процессы разработки. Регулярная отчетность. Контроль качества на каждом этапе.',
			icon: FileCheck2Icon,
			iconColor: 'text-blue-400',
		},
		{
			title: 'Опытные архитекторы',
			desc: 'Tech Lead на каждом проекте. Senior/Middle разработчики в штате. Средний опыт команды: 5+ лет.',
			icon: Users2Icon,
			iconColor: 'text-green-400',
		},
		{
			title: 'Гарантия результата',
			desc: 'Прописанные SLA. Страхование рисков. Штрафные санкции за срыв сроков.',
			icon: CheckCircle2Icon,
			iconColor: 'text-purple-400',
		},
		{
			title: 'Быстрый старт',
			desc: 'Формирование команды за 72 часа. Готовые шаблоны и решения. Параллельная работа над модулями.',
			icon: ZapIcon,
			iconColor: 'text-yellow-400',
		},
		{
			title: 'Долгосрочное партнерство',
			desc: 'Техподдержка после сдачи. Масштабирование команды. Накопление экспертизы в вашем домене.',
			icon: ClockIcon,
			iconColor: 'text-indigo-400',
		},
	];
</script>

<section
	id="about"
	class="py-24 bg-dark-900"
>
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="text-center mb-16">
			<h2 class="text-3xl md:text-5xl font-bold text-white mb-6">
				Почему выбирают <span class="text-primary-500">Тотсофт</span>?
			</h2>
			<p class="text-slate-400 text-lg max-w-3xl mx-auto leading-relaxed">
				Мы закрываем возражения и усиливаем доверие. Каждое преимущество
				— это ответ на вопрос вашего потенциального клиента: «Почему им
				можно доверять?»
			</p>
		</div>

		<div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
			{#each benefits as item (item.title)}
				{@const Icon = item.icon}
				<div
					class="bg-white/5 border border-white/5 p-8 rounded-2xl hover:bg-white/10 transition-colors group"
				>
					<div
						class="w-12 h-12 bg-dark-800 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"
					>
						<Icon class={item.iconColor} />
					</div>
					<h3 class="text-xl font-bold text-white mb-2">
						{item.title}
					</h3>
					<p class="text-slate-400">{item.desc}</p>
				</div>
			{/each}
		</div>

		<!-- Legal Block -->
		<div
			class="relative rounded-3xl overflow-hidden bg-linear-to-br from-dark-800 to-dark-900 border border-white/10 p-8 md:p-12"
		>
			<div
				class="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-primary-600/10 rounded-full blur-3xl"
			></div>

			<div
				class="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8"
			>
				<div>
					<h3 class="text-2xl font-bold text-white mb-2">
						Юридическая прозрачность
					</h3>
					<p class="text-slate-400 mb-6 max-w-xl">
						Работаем официально, имеем государственную аккредитацию.
						Предоставляем полный пакет закрывающих документов.
						Гарантируем конфиденциальность (NDA) и чистоту прав на
						код.
					</p>
					<div class="space-y-3">
						<div
							class="flex flex-wrap gap-2 text-sm font-mono text-slate-500"
						>
							<span class="px-3 py-1 bg-white/5 rounded"
								>ИНН {COMPANY_INFO.inn}</span
							>
							<span class="px-3 py-1 bg-white/5 rounded"
								>КПП {COMPANY_INFO.kpp}</span
							>
							<span
								class="px-3 py-1 bg-white/5 rounded"
								title="от {COMPANY_INFO.ogrn.date}"
							>
								ОГРН {COMPANY_INFO.ogrn.number}
							</span>
						</div>
						<div
							class="flex flex-wrap gap-2 text-xs font-mono text-slate-500"
						>
							{#each COMPANY_INFO.okved as okved (okved.code)}
								<span
									class="px-3 py-1 bg-white/5 rounded"
									title={okved.description}
								>
									ОКВЭД {okved.code}
								</span>
							{/each}
						</div>
					</div>
				</div>
				<div class="flex flex-col gap-3 w-full md:w-auto">
					<button
						type="button"
						onclick={downloadRequisites}
						class="px-6 py-3 bg-white text-dark-900 font-bold rounded-xl hover:bg-slate-200 transition-colors"
						aria-label="Скачать реквизиты компании"
					>
						Скачать реквизиты
					</button>
					<button
						type="button"
						onclick={checkAccreditation}
						class="px-6 py-3 border border-white/20 text-white font-medium rounded-xl hover:bg-white/5 transition-colors"
						aria-label="Проверить аккредитацию в реестре Минцифры"
					>
						Проверить аккредитацию
					</button>
				</div>
			</div>
		</div>
	</div>
</section>
