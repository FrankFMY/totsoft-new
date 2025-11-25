<script lang="ts">
	import {
		CircleAlertIcon,
		CircleCheckIcon,
		Loader2Icon,
		SendIcon,
	} from 'lucide-svelte';
	import { CONTACT_CONFIG } from '$lib/config/constants';
	import { submitContactForm } from '$lib/services/api';
	import { ContactStatus } from '$lib/types';
	import {
		type ValidationResult,
		validateDescription,
		validateEmail,
		validateName,
		validatePhone,
	} from '$lib/utils/validation';

	type FormField = 'name' | 'email' | 'phone' | 'description';

	interface FormErrors {
		name?: string;
		email?: string;
		phone?: string;
		description?: string;
		privacyConsent?: string;
	}

	let description = $state('');
	let contact = $state({ name: '', email: '', phone: '' });
	let privacyConsent = $state(false);
	let status = $state<ContactStatus>(ContactStatus.IDLE);
	let errors = $state<FormErrors>({});
	let errorMessage = $state('');

	// Валидация полей в реальном времени
	const validateField = (field: FormField, value: string) => {
		let validationResult: ValidationResult;

		switch (field) {
			case 'name':
				validationResult = validateName(value);
				break;
			case 'email':
				validationResult = validateEmail(value);
				break;
			case 'phone':
				validationResult = validatePhone(value);
				break;
			case 'description':
				validationResult = validateDescription(
					value,
					CONTACT_CONFIG.minDescriptionLength,
				);
				break;
			default:
				return;
		}

		if (!validationResult.isValid) {
			errors = { ...errors, [field]: validationResult.message };
		} else {
			const newErrors = { ...errors };
			delete newErrors[field];
			errors = newErrors;
		}
	};

	const handleDescriptionChange = (e: Event) => {
		const target = e.target as HTMLTextAreaElement;
		const value = target.value;
		description = value;
		if (value) {
			validateField('description', value);
		}
	};

	const handleContactChange =
		(field: 'name' | 'email' | 'phone') => (e: Event) => {
			const target = e.target as HTMLInputElement;
			const value = target.value;
			contact = { ...contact, [field]: value };

			// Валидация при изменении
			if (value) {
				validateField(field as FormField, value);
			}
		};

	const handleBlur = (field: FormField, value: string) => {
		validateField(field, value);
	};

	const handleSubmit = async (e: SubmitEvent) => {
		e.preventDefault();

		// Валидация всех полей
		const nameValidation = validateName(contact.name);
		const emailValidation = validateEmail(contact.email);
		const phoneValidation = validatePhone(contact.phone);
		const descValidation = validateDescription(
			description,
			CONTACT_CONFIG.minDescriptionLength,
		);

		const hasErrors =
			!nameValidation.isValid ||
			!emailValidation.isValid ||
			!phoneValidation.isValid ||
			!descValidation.isValid ||
			!privacyConsent;

		if (hasErrors) {
			errors = {
				name: nameValidation.message,
				email: emailValidation.message,
				phone: phoneValidation.message,
				description: descValidation.message,
				privacyConsent:
					!privacyConsent ?
						'Необходимо согласие на обработку персональных данных'
					:	undefined,
			};
			return;
		}

		status = ContactStatus.SENDING;
		errorMessage = '';

		try {
			const result = await submitContactForm({
				...contact,
				description,
				analysis: null,
			});

			if (result.success) {
				status = ContactStatus.SUCCESS;
				description = '';
				contact = { name: '', email: '', phone: '' };
				privacyConsent = false;
				errors = {};
			} else {
				status = ContactStatus.ERROR;
				errorMessage =
					result.error ||
					'Не удалось отправить заявку. Попробуйте позже.';
			}
		} catch (error) {
			console.error('Submit error:', error);
			status = ContactStatus.ERROR;
			errorMessage =
				error instanceof Error ?
					`Ошибка отправки: ${error.message}`
				:	'Произошла ошибка при отправке формы. Попробуйте позже.';
		}
	};

	const handlePrivacyConsentChange = (e: Event) => {
		const target = e.target as HTMLInputElement;
		privacyConsent = target.checked;
		if (target.checked) {
			const newErrors = { ...errors };
			delete newErrors.privacyConsent;
			errors = newErrors;
		}
	};
</script>

<section
	id="contact"
	class="py-24 bg-linear-to-b from-dark-900 to-dark-800"
>
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="max-w-4xl mx-auto">
			<div class="text-center mb-12">
				<h2 class="text-3xl md:text-5xl font-bold text-white mb-4">
					Начнем проект?
				</h2>
				<p class="text-slate-400 text-lg">
					Опишите вашу задачу, и наши менеджеры подготовят точную
					смету и свяжутся с вами в ближайшее время.
				</p>
			</div>

			<div
				class="bg-dark-800 border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl"
			>
				{#if status === ContactStatus.SUCCESS}
					<div class="text-center py-12">
						<div
							class="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6"
						>
							<CircleCheckIcon class="text-green-500 w-10 h-10" />
						</div>
						<h3 class="text-2xl font-bold text-white mb-2">
							Заявка отправлена!
						</h3>
						<p class="text-slate-400">
							Менеджер Тотсофт свяжется с вами в течение {CONTACT_CONFIG.responseTimeMinutes}
							минут.
						</p>
						<button
							type="button"
							onclick={() => {
								status = ContactStatus.IDLE;
								errorMessage = '';
							}}
							class="mt-6 text-primary-500 hover:text-primary-400 font-medium transition-colors"
							aria-label="Отправить еще одну заявку"
						>
							Отправить еще одну
						</button>
					</div>
				{:else}
					<form
						onsubmit={(e) => {
							e.preventDefault();
							handleSubmit(e);
						}}
						class="space-y-6 max-w-2xl mx-auto"
						novalidate
					>
						<!-- Сообщение об ошибке -->
						{#if status === ContactStatus.ERROR && errorMessage}
							<div
								class="bg-red-500/10 border border-red-500/30 rounded-xl p-4 flex items-start gap-3"
							>
								<CircleAlertIcon
									class="text-red-400 w-5 h-5 shrink-0 mt-0.5"
								/>
								<div>
									<p class="text-red-300 text-sm font-medium">
										Ошибка
									</p>
									<p class="text-red-400 text-sm mt-1">
										{errorMessage}
									</p>
								</div>
							</div>
						{/if}

						<div>
							<label
								for="name"
								class="block text-sm font-medium text-slate-400 mb-2"
							>
								Ваше имя
							</label>
							<input
								id="name"
								type="text"
								required
								value={contact.name}
								oninput={handleContactChange('name')}
								onblur={() => handleBlur('name', contact.name)}
								class="w-full bg-dark-900 border rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-1 transition-colors {(
									errors.name
								) ?
									'border-red-500 focus:border-red-500 focus:ring-red-500'
								:	'border-white/10 focus:border-primary-500 focus:ring-primary-500'}"
								placeholder="Иван Иванов"
								aria-invalid={!!errors.name}
								aria-describedby={errors.name ? 'name-error' : (
									undefined
								)}
							/>
							{#if errors.name}
								<p
									id="name-error"
									class="mt-1 text-sm text-red-400"
									role="alert"
								>
									{errors.name}
								</p>
							{/if}
						</div>

						<div class="grid grid-cols-2 gap-4">
							<div>
								<label
									for="email"
									class="block text-sm font-medium text-slate-400 mb-2"
								>
									Email
								</label>
								<input
									id="email"
									type="email"
									required
									value={contact.email}
									oninput={handleContactChange('email')}
									onblur={() =>
										handleBlur('email', contact.email)}
									class="w-full bg-dark-900 border rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-1 transition-colors {(
										errors.email
									) ?
										'border-red-500 focus:border-red-500 focus:ring-red-500'
									:	'border-white/10 focus:border-primary-500 focus:ring-primary-500'}"
									placeholder="hello@company.com"
									aria-invalid={!!errors.email}
									aria-describedby={errors.email ?
										'email-error'
									:	undefined}
								/>
								{#if errors.email}
									<p
										id="email-error"
										class="mt-1 text-sm text-red-400"
										role="alert"
									>
										{errors.email}
									</p>
								{/if}
							</div>
							<div>
								<label
									for="phone"
									class="block text-sm font-medium text-slate-400 mb-2"
								>
									Телефон
								</label>
								<input
									id="phone"
									type="tel"
									required
									value={contact.phone}
									oninput={handleContactChange('phone')}
									onblur={() =>
										handleBlur('phone', contact.phone)}
									class="w-full bg-dark-900 border rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-1 transition-colors {(
										errors.phone
									) ?
										'border-red-500 focus:border-red-500 focus:ring-red-500'
									:	'border-white/10 focus:border-primary-500 focus:ring-primary-500'}"
									placeholder="+7 (999) 123-45-67"
									aria-invalid={!!errors.phone}
									aria-describedby={errors.phone ?
										'phone-error'
									:	undefined}
								/>
								{#if errors.phone}
									<p
										id="phone-error"
										class="mt-1 text-sm text-red-400"
										role="alert"
									>
										{errors.phone}
									</p>
								{/if}
							</div>
						</div>

						<div>
							<label
								for="description"
								class="block text-sm font-medium text-slate-400 mb-2"
							>
								О проекте
								<span class="ml-2 text-xs text-slate-500">
									(минимум {CONTACT_CONFIG.minDescriptionLength}
									символов)
								</span>
							</label>
							<textarea
								id="description"
								rows={5}
								value={description}
								oninput={handleDescriptionChange}
								onblur={() =>
									handleBlur('description', description)}
								class="w-full bg-dark-900 border rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-1 resize-none transition-colors {(
									errors.description
								) ?
									'border-red-500 focus:border-red-500 focus:ring-red-500'
								:	'border-white/10 focus:border-primary-500 focus:ring-primary-500'}"
								placeholder="Нам нужно разработать маркетплейс для строительных материалов..."
								aria-invalid={!!errors.description}
								aria-describedby={errors.description ?
									'description-error'
								:	undefined}
							></textarea>
							{#if errors.description}
								<p
									id="description-error"
									class="mt-1 text-sm text-red-400"
									role="alert"
								>
									{errors.description}
								</p>
							{/if}
						</div>

						<div>
							<label
								for="privacy-consent"
								class="flex items-center gap-3 cursor-pointer group"
							>
								<input
									id="privacy-consent"
									type="checkbox"
									checked={privacyConsent}
									onchange={handlePrivacyConsentChange}
									class="w-5 h-5 rounded border-white/20 bg-dark-900 text-primary-600 focus:ring-2 focus:ring-primary-500 focus:ring-offset-0 cursor-pointer shrink-0"
									aria-invalid={!!errors.privacyConsent}
									aria-describedby={errors.privacyConsent ?
										'privacy-error'
									:	undefined}
								/>
								<span
									class="text-sm text-slate-400 group-hover:text-slate-300 transition-colors leading-relaxed"
								>
									Я согласен на
									<a
										href="/privacy"
										class="text-primary-400 hover:text-primary-300 underline ml-1"
									>
										обработку персональных данных
									</a>
								</span>
							</label>
							{#if errors.privacyConsent}
								<p
									id="privacy-error"
									class="mt-1 text-sm text-red-400"
									role="alert"
								>
									{errors.privacyConsent}
								</p>
							{/if}
						</div>

						<button
							type="submit"
							disabled={status === ContactStatus.SENDING}
							class="w-full bg-primary-600 hover:bg-primary-500 text-white py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed text-lg"
							aria-label="Отправить заявку"
						>
							{#if status === ContactStatus.SENDING}
								<Loader2Icon
									class="animate-spin"
									size={20}
									aria-hidden="true"
								/>
								Отправка...
							{:else}
								<SendIcon
									size={20}
									aria-hidden="true"
								/>
								Отправить заявку
							{/if}
						</button>
					</form>
				{/if}
			</div>
		</div>
	</div>
</section>
