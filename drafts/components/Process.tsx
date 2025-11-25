import { Cog, FileCode, Headphones, MessageSquare, Rocket } from 'lucide-react';
import React from 'react';

export const Process: React.FC = () => {
	const steps = [
		{
			id: '01',
			title: 'Анализ и оценка',
			desc: 'Изучение ТЗ / потребностей. Оценка сроков и бюджета. Формирование команды.',
			icon: <MessageSquare size={24} />
		},
		{
			id: '02',
			title: 'Договор и старт',
			desc: 'Подписание контракта с SLA. Kickoff-встреча. Доступ к инфраструктуре.',
			icon: <FileCode size={24} />
		},
		{
			id: '03',
			title: 'Разработка',
			desc: 'Спринты по 2 недели. Еженедельные отчеты. Демо промежуточных результатов.',
			icon: <Cog size={24} />
		},
		{
			id: '04',
			title: 'Тестирование и сдача',
			desc: 'Функциональное и нагрузочное тестирование. Документация. Передача в эксплуатацию.',
			icon: <Rocket size={24} />
		},
		{
			id: '05',
			title: 'Поддержка',
			desc: 'Гарантийное обслуживание. Доработки и масштабирование. Консультации.',
			icon: <Headphones size={24} />
		}
	];

	return (
		<section id="process" className="py-24 bg-dark-900 border-t border-white/5">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="text-center mb-16">
					<h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Как мы работаем</h2>
					<p className="text-slate-400 text-lg max-w-2xl mx-auto mb-4">
						Ведем вас за руку на всех этапах. Прозрачность — наш главный принцип. Вы всегда знаете,
						за что платите и на какой стадии проект.
					</p>
					<p className="text-slate-500 text-sm max-w-xl mx-auto">
						Все этапы прописаны в договоре с SLA. Гарантируем соблюдение сроков и качества. Возможна
						постоплата по договоренности.
					</p>
				</div>

				<div className="relative">
					{/* Connecting Line (Desktop) */}
					<div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-linear-to-r from-dark-800 via-primary-500/50 to-dark-800 -translate-y-1/2 z-0"></div>

					<div className="grid grid-cols-1 md:grid-cols-5 gap-8 relative z-10">
						{steps.map((step) => (
							<div key={step.id} className="relative group">
								<div className="bg-dark-800 border border-white/10 p-6 rounded-2xl h-full hover:border-primary-500/50 transition-all hover:-translate-y-2 hover:shadow-lg hover:shadow-primary-900/20">
									<div className="w-12 h-12 bg-dark-900 rounded-full border border-white/10 flex items-center justify-center text-primary-400 mb-4 group-hover:bg-primary-500 group-hover:text-white transition-colors shadow-inner">
										{step.icon}
									</div>
									<div className="absolute top-6 right-6 text-4xl font-bold text-white/5 font-mono group-hover:text-primary-500/10 transition-colors">
										{step.id}
									</div>
									<h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
									<p className="text-sm text-slate-400 leading-relaxed">{step.desc}</p>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
};
