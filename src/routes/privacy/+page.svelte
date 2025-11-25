<script lang="ts">
	import { ArrowLeft } from 'lucide-svelte';
	import { COMPANY_INFO } from '$lib/config/constants';
</script>

<svelte:head>
	<title>Политика конфиденциальности | Тотсофт</title>
	<meta name="description" content="Политика конфиденциальности ООО Тотсофт" />
</svelte:head>

<div class="min-h-screen bg-dark-900 text-white">
	<div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
		<!-- Header -->
		<div class="mb-8">
			<a
				href="/"
				class="inline-flex items-center gap-2 text-primary-400 hover:text-primary-300 transition-colors mb-6"
			>
				<ArrowLeft size={20} />
				<span>Вернуться на главную</span>
			</a>
			<h1 class="text-4xl md:text-5xl font-bold text-white mb-4">Политика конфиденциальности</h1>
			<p class="text-slate-400 text-lg">Последнее обновление: 25 ноября 2025 г.</p>
		</div>

		<!-- Content -->
		<div class="space-y-6">
			<section class="bg-dark-800 rounded-2xl p-8 border border-white/10">
				<h2 class="text-2xl font-bold text-white mb-4">1. Общие положения</h2>
				<p class="text-slate-300 leading-relaxed mb-4">
					Настоящая Политика конфиденциальности определяет порядок обработки и защиты персональных
					данных пользователей веб-сайта {COMPANY_INFO.name} (далее — «Сайт»).
				</p>
				<p class="text-slate-300 leading-relaxed">
					Используя Сайт, вы соглашаетесь с условиями настоящей Политики конфиденциальности. Если вы
					не согласны с условиями данной Политики, пожалуйста, не используйте Сайт.
				</p>
			</section>

			<section class="bg-dark-800 rounded-2xl p-8 border border-white/10">
				<h2 class="text-2xl font-bold text-white mb-4">2. Собираемая информация</h2>
				<p class="text-slate-300 leading-relaxed mb-4">
					При использовании Сайта мы можем собирать следующую информацию:
				</p>
				<ul class="list-disc list-inside text-slate-300 space-y-2">
					<li>Имя и контактные данные (email, телефон)</li>
					<li>Информация о проекте, которую вы предоставляете через форму обратной связи</li>
					<li>Техническая информация (IP-адрес, тип браузера, операционная система)</li>
					<li>Информация о посещении Сайта (время посещения, просмотренные страницы)</li>
				</ul>
			</section>

			<section class="bg-dark-800 rounded-2xl p-8 border border-white/10">
				<h2 class="text-2xl font-bold text-white mb-4">3. Цели обработки данных</h2>
				<p class="text-slate-300 leading-relaxed mb-4">
					Персональные данные обрабатываются в следующих целях:
				</p>
				<ul class="list-disc list-inside text-slate-300 space-y-2">
					<li>Обработка заявок и обращений пользователей</li>
					<li>Связь с пользователями по вопросам их запросов</li>
					<li>Улучшение качества работы Сайта</li>
					<li>Соблюдение требований законодательства Российской Федерации</li>
				</ul>
			</section>

			<section class="bg-dark-800 rounded-2xl p-8 border border-white/10">
				<h2 class="text-2xl font-bold text-white mb-4">4. Защита данных</h2>
				<p class="text-slate-300 leading-relaxed mb-4">
					Мы принимаем необходимые технические и организационные меры для защиты персональных данных
					от неправомерного доступа, изменения, раскрытия или уничтожения.
				</p>
				<p class="text-slate-300 leading-relaxed">
					Все данные передаются по защищенному соединению (HTTPS) и хранятся на защищенных серверах.
				</p>
			</section>

			<section class="bg-dark-800 rounded-2xl p-8 border border-white/10">
				<h2 class="text-2xl font-bold text-white mb-4">5. Передача данных третьим лицам</h2>
				<p class="text-slate-300 leading-relaxed mb-4">
					Мы не передаем персональные данные третьим лицам, за исключением следующих случаев:
				</p>
				<ul class="list-disc list-inside text-slate-300 space-y-2">
					<li>Когда это необходимо для выполнения вашего запроса</li>
					<li>Когда это требуется по законодательству Российской Федерации</li>
					<li>С вашего явного согласия</li>
				</ul>
			</section>

			<section class="bg-dark-800 rounded-2xl p-8 border border-white/10">
				<h2 class="text-2xl font-bold text-white mb-4">6. Права пользователей</h2>
				<p class="text-slate-300 leading-relaxed mb-4">Вы имеете право:</p>
				<ul class="list-disc list-inside text-slate-300 space-y-2">
					<li>Получать информацию о ваших персональных данных</li>
					<li>Требовать исправления неточных данных</li>
					<li>Требовать удаления ваших персональных данных</li>
					<li>Отозвать согласие на обработку персональных данных</li>
				</ul>
			</section>

			<section class="bg-dark-800 rounded-2xl p-8 border border-white/10">
				<h2 class="text-2xl font-bold text-white mb-4">7. Cookies</h2>
				<p class="text-slate-300 leading-relaxed mb-4">
					Сайт может использовать файлы cookie для улучшения пользовательского опыта. Вы можете
					настроить свой браузер для отказа от приема файлов cookie, однако это может повлиять на
					функциональность Сайта.
				</p>
			</section>

			<section class="bg-dark-800 rounded-2xl p-8 border border-white/10">
				<h2 class="text-2xl font-bold text-white mb-4">8. Изменения в Политике</h2>
				<p class="text-slate-300 leading-relaxed">
					Мы оставляем за собой право вносить изменения в настоящую Политику конфиденциальности. Все
					изменения вступают в силу с момента их публикации на Сайте. Рекомендуем периодически
					просматривать данную страницу для ознакомления с актуальной версией Политики.
				</p>
			</section>

			<section class="bg-dark-800 rounded-2xl p-8 border border-white/10">
				<h2 class="text-2xl font-bold text-white mb-4">9. Контакты</h2>
				<p class="text-slate-300 leading-relaxed mb-4">
					По всем вопросам, связанным с обработкой персональных данных, вы можете обращаться:
				</p>
				<div class="text-slate-300 space-y-2">
					<p>
						<strong class="text-white">Организация:</strong>
						{COMPANY_INFO.name}
					</p>
					<p>
						<strong class="text-white">ИНН:</strong>
						{COMPANY_INFO.inn}
					</p>
					<p>
						<strong class="text-white">КПП:</strong>
						{COMPANY_INFO.kpp}
					</p>
					<p>
						<strong class="text-white">ОГРН:</strong>
						{COMPANY_INFO.ogrn.number}
					</p>
					<p>
						<strong class="text-white">Email:</strong>
						<a href="mailto:dev@totsoft.net" class="text-primary-400 hover:text-primary-300">
							dev@totsoft.net
						</a>
					</p>
					<p>
						<strong class="text-white">Сайт:</strong>
						<a href="https://totsoft.net" class="text-primary-400 hover:text-primary-300">
							https://totsoft.net
						</a>
					</p>
				</div>
			</section>
		</div>

		<!-- Footer -->
		<div class="mt-12 pt-8 border-t border-white/10 text-center text-slate-500 text-sm">
			<p>
				© {new Date().getFullYear()}
				{COMPANY_INFO.name}. Все права защищены.
			</p>
		</div>
	</div>
</div>
