<script lang="ts">
	interface TechCategory {
		title: string;
		technologies: string[];
	}

	const categories: TechCategory[] = [
		{
			title: 'Языки программирования',
			technologies: ['TypeScript', 'JavaScript', 'Python', 'Java', 'C#', 'Go', 'PHP']
		},
		{
			title: 'Backend',
			technologies: ['Node.js', 'Bun', 'Express', 'NestJS', 'FastAPI', 'Django', 'Spring', '.NET']
		},
		{
			title: 'Frontend',
			technologies: ['React', 'Next.js', 'Vue', 'Angular', 'SvelteKit', 'TailwindCSS', 'Bootstrap']
		},
		{
			title: 'Мобильная разработка',
			technologies: ['React Native', 'Flutter', 'Swift', 'Kotlin', 'Capacitor']
		},
		{
			title: 'CMS и платформы',
			technologies: [
				'WordPress',
				'1C-Bitrix',
				'Joomla',
				'Tilda',
				'Drupal',
				'OpenCart',
				'Django CMS',
				'Selectel S3',
				'Yandex.Cloud',
				'ЮKassa',
				'amoCRM'
			]
		},
		{
			title: 'Базы данных',
			technologies: [
				'PostgreSQL',
				'MySQL',
				'MongoDB',
				'Redis',
				'SQLite',
				'MS SQL',
				'PocketBase',
				'SurrealDB',
				'Supabase',
				'Firebase',
				'ELK Stack'
			]
		},
		{
			title: 'Инфраструктура и DevOps',
			technologies: [
				'Docker',
				'Kubernetes',
				'Nginx',
				'Linux',
				'AWS',
				'Azure',
				'GitHub Actions',
				'GitLab CI',
				'Jenkins'
			]
		},
		{
			title: 'Тестирование',
			technologies: [
				'Jest',
				'Vitest',
				'Playwright',
				'Cypress',
				'Pytest',
				'JUnit',
				'xUnit',
				'Postman',
				'Appium',
				'Storybook',
				'k6',
				'SonarQube',
				'Testing Library'
			]
		}
	];

	const allTechnologies = categories.flatMap((cat) => cat.technologies);
	const marqueeTechnologies = [
		...allTechnologies,
		...allTechnologies,
		...allTechnologies,
		...allTechnologies
	];
</script>

<section id="stack" class="py-16 bg-dark-800 border-y border-white/5 overflow-hidden relative">
	<div class="max-w-7xl mx-auto px-4 mb-12">
		<div class="text-center mb-10">
			<h3 class="text-2xl md:text-3xl font-bold text-white mb-4">
				Технологии, с которыми мы работаем
			</h3>
			<p class="text-slate-400 max-w-2xl mx-auto">
				Используем современные Open Source решения. Поддерживаем импортозамещение.
			</p>
		</div>

		<!-- Categories Grid -->
		<div class="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
			{#each categories as category (category.title)}
				<div
					class="bg-dark-900 border border-white/5 rounded-2xl p-6 hover:border-primary-500/30 transition-all"
				>
					<h4 class="text-xl font-bold text-white mb-4 text-center">
						{category.title}
					</h4>
					<div class="flex flex-wrap gap-2 justify-center">
						{#each category.technologies as tech (tech)}
							<span
								class="px-3 py-1.5 bg-dark-800 border border-white/10 rounded-lg text-sm text-slate-300 hover:text-white hover:border-primary-500/50 transition-colors"
							>
								{tech}
							</span>
						{/each}
					</div>
				</div>
			{/each}
		</div>

		<!-- Marquee Animation -->
		<div class="relative flex overflow-x-hidden py-8 bg-dark-900/50 rounded-2xl">
			<div class="animate-marquee whitespace-nowrap flex gap-12 items-center">
				{#each marqueeTechnologies as tech, i (i)}
					<span
						class="text-xl md:text-3xl font-bold text-slate-600 hover:text-white hover:scale-110 transition-all cursor-default select-none"
					>
						{tech}
					</span>
				{/each}
			</div>

			<div
				class="absolute top-0 left-0 bg-linear-to-r from-dark-800 via-dark-800/80 to-transparent w-32 h-full z-10"
			></div>
			<div
				class="absolute top-0 right-0 bg-linear-to-l from-dark-800 via-dark-800/80 to-transparent w-32 h-full z-10"
			></div>
		</div>
	</div>
</section>
