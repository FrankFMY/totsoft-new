import { CheckCircle2, FileText, Server, ShieldCheck, Users } from 'lucide-react';
import React from 'react';

interface TrustItem {
	title: string;
	description: string;
	icon: React.ReactNode;
}

export const TrustBar: React.FC = () => {
	const trustItems: TrustItem[] = [
		{
			title: 'Аккредитованная IT-компания',
			description: 'Официальный статус и соответствие требованиям Минцифры',
			icon: <ShieldCheck className="w-6 h-6 text-primary-400" />
		},
		{
			title: 'Работаем по 44-ФЗ и 223-ФЗ',
			description: 'Готовность к тендерным процедурам и спецсчетам',
			icon: <FileText className="w-6 h-6 text-blue-400" />
		},
		{
			title: 'Команда уровня Senior/Middle+',
			description: 'Штат квалифицированных инженеров с опытом 5+ лет',
			icon: <Users className="w-6 h-6 text-green-400" />
		},
		{
			title: 'Собственные HighLoad-продукты',
			description: 'Развиваем внутренние IT-платформы. Долгий горизонт планирования',
			icon: <Server className="w-6 h-6 text-purple-400" />
		},
		{
			title: 'Гарантия по договору',
			description: 'Финансовая ответственность и возможность постоплаты',
			icon: <CheckCircle2 className="w-6 h-6 text-yellow-400" />
		}
	];

	return (
		<section className="py-16 bg-dark-800 border-y border-white/5">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="text-center mb-12">
					<h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Почему нам доверяют</h2>
					<p className="text-slate-400 max-w-2xl mx-auto">
						Мы молодая компания, но каждый наш сотрудник — ветеран индустрии. Надежность и
						экспертиза — наш главный актив.
					</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
					{trustItems.map((item) => (
						<div
							key={item.title}
							className="bg-dark-900 border border-white/5 rounded-xl p-6 hover:border-primary-500/30 transition-all hover:-translate-y-1 text-center"
						>
							<div className="flex justify-center mb-4">{item.icon}</div>
							<h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
							<p className="text-sm text-slate-400 leading-relaxed">{item.description}</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};
