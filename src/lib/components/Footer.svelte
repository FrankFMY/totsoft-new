<script lang="ts">
	import { COMPANY_INFO } from '$lib/config/constants';
</script>

<footer class="bg-dark-900 py-12 border-t border-white/5">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
			<!-- Company Info -->
			<div>
				<h3 class="text-xl font-bold text-white mb-3">
					{COMPANY_INFO.name}
				</h3>
				<p class="text-slate-500 text-sm mb-4">
					{COMPANY_INFO.description}
				</p>
				<div class="text-slate-400 text-xs space-y-1">
					<p>ИНН: {COMPANY_INFO.inn}</p>
					<p>КПП: {COMPANY_INFO.kpp}</p>
					<p>ОГРН: {COMPANY_INFO.ogrn.number}</p>
					<p>ОКПО: {COMPANY_INFO.okpo}</p>
					<p>ОКТМО: {COMPANY_INFO.oktmo}</p>
					<p>
						ОКВЭД: {COMPANY_INFO.okved
							.map((item: { code: string }) => item.code)
							.join(', ')}
					</p>
				</div>
			</div>

			<!-- Contacts -->
			<div>
				<h4 class="text-lg font-semibold text-white mb-3">Контакты</h4>
				<div class="text-slate-400 text-sm space-y-2">
					{#each COMPANY_INFO.contacts.phones as phoneContact}
						<p>
							<a
								href="tel:{phoneContact.phone.replace(
									/\s/g,
									'',
								)}"
								class="hover:text-white transition-colors"
							>
								{phoneContact.phone}
							</a>
							<span class="block text-xs text-slate-500 mt-1"
								>{phoneContact.contact}</span
							>
						</p>
					{/each}
					<p>
						<a
							href="mailto:{COMPANY_INFO.contacts.email}"
							class="hover:text-white transition-colors"
						>
							{COMPANY_INFO.contacts.email}
						</a>
					</p>
					<p>
						<a
							href="https://t.me/{COMPANY_INFO.contacts.telegram.replace(
								'@',
								'',
							)}"
							target="_blank"
							rel="noopener noreferrer"
							class="hover:text-white transition-colors"
						>
							{COMPANY_INFO.contacts.telegram}
						</a>
					</p>
					<p class="text-xs text-slate-500 mt-3">
						{COMPANY_INFO.contacts.address}
					</p>
				</div>
			</div>

			<!-- Links -->
			<div>
				<h4 class="text-lg font-semibold text-white mb-3">
					Информация
				</h4>
				<div class="flex flex-col gap-2">
					<a
						href="#contact"
						class="text-slate-400 hover:text-white transition-colors text-sm"
					>
						Тендеры
					</a>
					<a
						href="/privacy"
						class="text-slate-400 hover:text-white transition-colors text-sm"
					>
						Политика конфиденциальности
					</a>
					<a
						href="#contact"
						class="text-slate-400 hover:text-white transition-colors text-sm"
					>
						Контакты
					</a>
				</div>
			</div>

			<!-- Bank Details -->
			<div>
				<h4 class="text-lg font-semibold text-white mb-3">
					Банковские реквизиты
				</h4>
				<div class="text-slate-400 text-xs space-y-1">
					<p>
						<span class="text-slate-500">Банк:</span>
						{COMPANY_INFO.bankDetails.bank}
					</p>
					<p>
						<span class="text-slate-500">Расчётный счет:</span>{' '}
						{COMPANY_INFO.bankDetails.account}
					</p>
					<p>
						<span class="text-slate-500"
							>Корреспондентский счёт:</span
						>{' '}
						{COMPANY_INFO.bankDetails.correspondentAccount}
					</p>
					<p>
						<span class="text-slate-500">БИК:</span>
						{COMPANY_INFO.bankDetails.bik}
					</p>
				</div>
			</div>
		</div>

		<!-- Copyright -->
		<div
			class="pt-8 border-t border-white/5 text-center text-slate-500 text-sm"
		>
			<p>
				© {new Date().getFullYear()}
				{COMPANY_INFO.name}. Все права защищены.
			</p>
		</div>
	</div>
</footer>
