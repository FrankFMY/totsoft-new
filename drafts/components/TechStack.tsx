import React from 'react';

interface TechCategory {
  title: string;
  technologies: string[];
}

export const TechStack: React.FC = () => {
  const categories: TechCategory[] = [
    {
      title: 'Языки программирования',
      technologies: ['TypeScript', 'JavaScript', 'Python', 'Java', 'C#', 'Go', 'PHP'],
    },
    {
      title: 'Backend',
      technologies: ['Node.js', 'Bun', 'Express', 'NestJS', 'FastAPI', 'Django', 'Spring', '.NET'],
    },
    {
      title: 'Frontend',
      technologies: ['React', 'Next.js', 'Vue', 'Angular', 'SvelteKit', 'TailwindCSS', 'Bootstrap'],
    },
    {
      title: 'Мобильная разработка',
      technologies: ['React Native', 'Flutter', 'Swift', 'Kotlin', 'Capacitor'],
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
        'amoCRM',
      ],
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
        'ELK Stack',
      ],
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
        'Jenkins',
      ],
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
        'Testing Library',
      ],
    },
  ];

  const allTechnologies = categories.flatMap((cat) => cat.technologies);

  return (
    <section
      id="stack"
      className="py-16 bg-dark-800 border-y border-white/5 overflow-hidden relative"
    >
      <div className="max-w-7xl mx-auto px-4 mb-12">
        <div className="text-center mb-10">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Технологии, с которыми мы работаем
          </h3>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Используем современные Open Source решения. Поддерживаем импортозамещение.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
          {categories.map((category) => (
            <div
              key={category.title}
              className="bg-dark-900 border border-white/5 rounded-2xl p-6 hover:border-primary-500/30 transition-all"
            >
              <h4 className="text-xl font-bold text-white mb-4 text-center">{category.title}</h4>
              <div className="flex flex-wrap gap-2 justify-center">
                {category.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 bg-dark-800 border border-white/10 rounded-lg text-sm text-slate-300 hover:text-white hover:border-primary-500/50 transition-colors"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Marquee Animation */}
        <div className="relative flex overflow-x-hidden py-8 bg-dark-900/50 rounded-2xl">
          <div className="animate-marquee whitespace-nowrap flex gap-12 items-center">
            {/* Duplicate list enough times for smooth infinite scroll */}
            {[...allTechnologies, ...allTechnologies, ...allTechnologies, ...allTechnologies].map(
              (tech, idx) => (
                <span
                  // biome-ignore lint/suspicious/noArrayIndexKey: idx необходим для дублированного массива в анимации
                  key={`${tech}-${idx}`}
                  className="text-xl md:text-3xl font-bold text-slate-600 hover:text-white hover:scale-110 transition-all cursor-default select-none"
                >
                  {tech}
                </span>
              )
            )}
          </div>

          <div className="absolute top-0 left-0 bg-linear-to-r from-dark-800 via-dark-800/80 to-transparent w-32 h-full z-10"></div>
          <div className="absolute top-0 right-0 bg-linear-to-l from-dark-800 via-dark-800/80 to-transparent w-32 h-full z-10"></div>
        </div>
      </div>
    </section>
  );
};
