import { CheckCircle, Menu, X } from 'lucide-react';
import React, { useEffect, useState } from 'react';

export const Navbar: React.FC = () => {
	const [isScrolled, setIsScrolled] = useState(false);
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	useEffect(() => {
		const handleScroll = (): void => {
			setIsScrolled(window.scrollY > 20);
		};

		// Используем passive listener для лучшей производительности
		const options: AddEventListenerOptions = { passive: true };
		window.addEventListener('scroll', handleScroll, options);

		return () => {
			// Важно: removeEventListener требует те же опции, что и addEventListener
			window.removeEventListener('scroll', handleScroll, options);
		};
	}, []);

	const navLinks = [
		{ name: 'Услуги', href: '#services' },
		{ name: 'Технологии', href: '#stack' },
		{ name: 'Преимущества', href: '#about' },
		{ name: 'Процесс', href: '#process' }
	];

	const scrollToTop = (): void => {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	};

	return (
		<nav
			className={`fixed top-0 w-full z-50 transition-all duration-300 ${
				isScrolled
					? 'bg-dark-900/90 backdrop-blur-md border-b border-white/10 py-4'
					: 'bg-transparent py-6'
			}`}
		>
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
				{/* Logo */}
				<button
					type="button"
					onClick={scrollToTop}
					className="flex items-center gap-1 hover:opacity-80 transition-opacity"
					aria-label="Перейти наверх страницы"
				>
					<div className="w-10 h-10 flex items-center justify-center">
						<img src="/logo.svg" alt="TOTSOFT" className="w-10 h-10" />
					</div>
					<div className="flex flex-col">
						<img src="/logo-text.svg" alt="TOTSOFT" className="h-7" />
						<span className="text-[10px] uppercase tracking-widest text-primary-400 flex items-center gap-1 mt-0.5">
							<CheckCircle size={10} /> Аккредитовано
						</span>
					</div>
				</button>

				{/* Desktop Nav */}
				<div className="hidden md:flex items-center space-x-8">
					{navLinks.map((link) => (
						<a
							key={link.name}
							href={link.href}
							className="text-slate-300 hover:text-white transition-colors text-sm font-medium uppercase tracking-wide"
						>
							{link.name}
						</a>
					))}
					<a
						href="tel:+79198281874"
						className="flex flex-col items-center text-white hover:text-primary-400 transition-colors"
					>
						<span className="text-base font-semibold">+7 (919) 828-18-74</span>
						<span className="text-xs text-slate-400 text-center">Пн-Пт 9:00 - 18:00</span>
					</a>
					<a
						href="#contact"
						className="bg-white text-dark-900 hover:bg-primary-50 px-6 py-2.5 rounded-lg font-semibold transition-all transform hover:scale-105 shadow-lg shadow-white/10"
					>
						Обсудить проект
					</a>
				</div>

				{/* Mobile Menu Button */}
				<div className="md:hidden">
					<button
						type="button"
						onClick={() => setIsMenuOpen(!isMenuOpen)}
						className="text-white focus:outline-none focus:ring-2 focus:ring-primary-500 rounded p-1"
						aria-label={isMenuOpen ? 'Закрыть меню' : 'Открыть меню'}
						aria-expanded={isMenuOpen}
					>
						{isMenuOpen ? <X size={28} /> : <Menu size={28} />}
					</button>
				</div>
			</div>

			{/* Mobile Nav */}
			{isMenuOpen && (
				<nav
					className="md:hidden absolute top-full left-0 w-full bg-dark-800 border-b border-white/10 shadow-2xl"
					aria-label="Мобильная навигация"
				>
					<div className="px-4 pt-2 pb-6 space-y-2">
						{navLinks.map((link) => (
							<a
								key={link.name}
								href={link.href}
								onClick={() => setIsMenuOpen(false)}
								className="block px-3 py-3 text-base font-medium text-slate-300 hover:text-white hover:bg-white/5 rounded-md"
							>
								{link.name}
							</a>
						))}
						<button
							type="button"
							onClick={() => {
								setIsMenuOpen(false);
								window.location.href = '#contact';
							}}
							className="block w-full mt-4 text-center px-3 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-bold"
						>
							Обсудить проект
						</button>
					</div>
				</nav>
			)}
		</nav>
	);
};
