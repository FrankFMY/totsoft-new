import { ArrowRight, Cpu, ShieldCheck, Zap } from 'lucide-react';
import React from 'react';

export const Hero: React.FC = () => {
	return (
		<section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
			{/* Background Elements */}
			<div className="absolute inset-0 z-0">
				<div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary-600/10 rounded-full blur-[120px] animate-pulse-slow"></div>
				<div
					className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-600/10 rounded-full blur-[120px] animate-pulse-slow"
					style={{ animationDelay: '1.5s' }}
				></div>
				<div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
			</div>

			<div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
				<div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-8 animate-fade-in-up hover:bg-white/10 transition-colors cursor-default">
					<ShieldCheck className="text-primary-400" size={16} />
					<span className="text-sm font-medium text-primary-100">Аккредитованная IT-компания</span>
				</div>

				<h1
					className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-6 animate-fade-in-up leading-tight"
					style={{ animationDelay: '0.1s' }}
				>
					Разработка высоконагруженных <br className="hidden md:block" />
					<span className="text-transparent bg-clip-text bg-linear-to-r from-primary-400 via-blue-400 to-indigo-400">
						IT-решений для Государства и Бизнеса
					</span>
				</h1>

				<p
					className="max-w-3xl text-lg md:text-xl text-slate-400 mb-10 animate-fade-in-up leading-relaxed"
					style={{ animationDelay: '0.2s' }}
				>
					Аккредитованная IT-компания. Работаем по 44-ФЗ и 223-ФЗ. Выделенные команды Senior/Middle
					разработчиков. Запуск проектной группы за 72 часа.
				</p>

				<div
					className="flex flex-col sm:flex-row gap-4 animate-fade-in-up"
					style={{ animationDelay: '0.3s' }}
				>
					<a
						href="#contact"
						className="inline-flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-500 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-lg shadow-primary-600/25 hover:shadow-primary-600/40 hover:-translate-y-1"
					>
						Обсудить задачу <ArrowRight size={20} />
					</a>
					<a
						href="#services"
						className="inline-flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all backdrop-blur-sm hover:-translate-y-1"
					>
						Наши услуги
					</a>
				</div>

				{/* Stats Grid */}
				<div
					className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 w-full max-w-5xl border-t border-white/5 pt-10 animate-fade-in-up"
					style={{ animationDelay: '0.5s' }}
				>
					<div className="text-center p-4 rounded-2xl hover:bg-white/5 transition-colors">
						<div className="text-3xl font-bold flex justify-center gap-1 text-primary-400">
							Middle+
						</div>
						<div className="text-sm text-slate-500 uppercase tracking-wide mt-2 font-medium">
							Уровень специалистов
						</div>
					</div>
					<div className="text-center p-4 rounded-2xl hover:bg-white/5 transition-colors">
						<div className="text-3xl font-bold text-white">72ч</div>
						<div className="text-sm text-slate-500 uppercase tracking-wide mt-2 font-medium">
							Запуск команды
						</div>
					</div>
					<div className="text-center p-4 rounded-2xl hover:bg-white/5 transition-colors">
						<div className="text-3xl font-bold text-white flex justify-center items-center gap-2">
							<Zap size={24} className="text-yellow-400" />
							<span className="text-white">44-ФЗ</span>
						</div>
						<div className="text-sm text-slate-500 uppercase tracking-wide mt-2 font-medium">
							Тендерная работа
						</div>
					</div>
					<div className="text-center p-4 rounded-2xl hover:bg-white/5 transition-colors">
						<div className="text-3xl font-bold text-white flex justify-center items-center gap-2">
							<Cpu size={24} className="text-blue-500" />
							<span>Senior+</span>
						</div>
						<div className="text-sm text-slate-500 uppercase tracking-wide mt-2 font-medium">
							Уровень команды
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};
