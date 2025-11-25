import { AlertCircle, CheckCircle2, Loader2, Send } from 'lucide-react';
import React, { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { CONTACT_CONFIG } from '../config/constants';
import { submitContactForm } from '../services/api';
import { ContactStatus } from '../types';
import {
  type ValidationResult,
  validateDescription,
  validateEmail,
  validateName,
  validatePhone,
} from '../utils/validation';

type FormField = 'name' | 'email' | 'phone' | 'description';

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  description?: string;
  privacyConsent?: string;
}

interface ContactFormState {
  name: string;
  email: string;
  phone: string;
}

export const ContactForm: React.FC = () => {
  const [description, setDescription] = useState<string>('');
  const [contact, setContact] = useState<ContactFormState>({ name: '', email: '', phone: '' });
  const [privacyConsent, setPrivacyConsent] = useState<boolean>(false);
  const [status, setStatus] = useState<ContactStatus>(ContactStatus.IDLE);
  const [errors, setErrors] = useState<FormErrors>({});
  const [errorMessage, setErrorMessage] = useState<string>('');

  // Валидация полей в реальном времени
  const validateField = useCallback((field: FormField, value: string) => {
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
        validationResult = validateDescription(value, CONTACT_CONFIG.minDescriptionLength);
        break;
      default:
        return;
    }

    if (!validationResult.isValid) {
      setErrors((prev) => ({ ...prev, [field]: validationResult.message }));
    } else {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  }, []);

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setDescription(value);
    if (value) {
      validateField('description', value);
    }
  };

  const handleContactChange =
    (field: keyof ContactFormState) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setContact((prev) => ({ ...prev, [field]: value }));

      // Валидация при потере фокуса или изменении
      if (value) {
        validateField(field as FormField, value);
      }
    };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Валидация всех полей
    const nameValidation = validateName(contact.name);
    const emailValidation = validateEmail(contact.email);
    const phoneValidation = validatePhone(contact.phone);
    const descValidation = validateDescription(description, CONTACT_CONFIG.minDescriptionLength);

    const hasErrors =
      !nameValidation.isValid ||
      !emailValidation.isValid ||
      !phoneValidation.isValid ||
      !descValidation.isValid ||
      !privacyConsent;

    if (hasErrors) {
      setErrors({
        name: nameValidation.message,
        email: emailValidation.message,
        phone: phoneValidation.message,
        description: descValidation.message,
        privacyConsent: !privacyConsent
          ? 'Необходимо согласие на обработку персональных данных'
          : undefined,
      });
      return;
    }

    setStatus(ContactStatus.SENDING);
    setErrorMessage('');

    try {
      const result = await submitContactForm({
        ...contact,
        description,
        analysis: null,
      });

      if (result.success) {
        setStatus(ContactStatus.SUCCESS);
        setDescription('');
        setContact({ name: '', email: '', phone: '' });
        setPrivacyConsent(false);
        setErrors({});
      } else {
        setStatus(ContactStatus.ERROR);
        setErrorMessage(result.error || 'Не удалось отправить заявку. Попробуйте позже.');
      }
    } catch (error) {
      console.error('Submit error:', error);
      setStatus(ContactStatus.ERROR);
      setErrorMessage(
        error instanceof Error
          ? `Ошибка отправки: ${error.message}`
          : 'Произошла ошибка при отправке формы. Попробуйте позже.'
      );
    }
  };

  return (
    <section id="contact" className="py-24 bg-linear-to-b from-dark-900 to-dark-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Начнем проект?</h2>
            <p className="text-slate-400 text-lg">
              Опишите вашу задачу, и наши менеджеры подготовят точную смету и свяжутся с вами в
              ближайшее время.
            </p>
          </div>

          <div className="bg-dark-800 border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl">
            {status === ContactStatus.SUCCESS ? (
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="text-green-500 w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Заявка отправлена!</h3>
                <p className="text-slate-400">
                  Менеджер Тотсофт свяжется с вами в течение {CONTACT_CONFIG.responseTimeMinutes}{' '}
                  минут.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setStatus(ContactStatus.IDLE);
                    setErrorMessage('');
                  }}
                  className="mt-6 text-primary-500 hover:text-primary-400 font-medium transition-colors"
                  aria-label="Отправить еще одну заявку"
                >
                  Отправить еще одну
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto" noValidate>
                {/* Сообщение об ошибке */}
                {status === ContactStatus.ERROR && errorMessage && (
                  <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 flex items-start gap-3">
                    <AlertCircle className="text-red-400 w-5 h-5 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-red-300 text-sm font-medium">Ошибка</p>
                      <p className="text-red-400 text-sm mt-1">{errorMessage}</p>
                    </div>
                  </div>
                )}

                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-slate-400 mb-2">
                    Ваше имя
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={contact.name}
                    onChange={handleContactChange('name')}
                    onBlur={() => validateField('name', contact.name)}
                    className={`w-full bg-dark-900 border rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-1 transition-colors ${
                      errors.name
                        ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                        : 'border-white/10 focus:border-primary-500 focus:ring-primary-500'
                    }`}
                    placeholder="Иван Иванов"
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? 'name-error' : undefined}
                  />
                  {errors.name && (
                    <p id="name-error" className="mt-1 text-sm text-red-400" role="alert">
                      {errors.name}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-slate-400 mb-2"
                    >
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      value={contact.email}
                      onChange={handleContactChange('email')}
                      onBlur={() => validateField('email', contact.email)}
                      className={`w-full bg-dark-900 border rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-1 transition-colors ${
                        errors.email
                          ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                          : 'border-white/10 focus:border-primary-500 focus:ring-primary-500'
                      }`}
                      placeholder="hello@company.com"
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? 'email-error' : undefined}
                    />
                    {errors.email && (
                      <p id="email-error" className="mt-1 text-sm text-red-400" role="alert">
                        {errors.email}
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-slate-400 mb-2"
                    >
                      Телефон
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      required
                      value={contact.phone}
                      onChange={handleContactChange('phone')}
                      onBlur={() => validateField('phone', contact.phone)}
                      className={`w-full bg-dark-900 border rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-1 transition-colors ${
                        errors.phone
                          ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                          : 'border-white/10 focus:border-primary-500 focus:ring-primary-500'
                      }`}
                      placeholder="+7 (999) 123-45-67"
                      aria-invalid={!!errors.phone}
                      aria-describedby={errors.phone ? 'phone-error' : undefined}
                    />
                    {errors.phone && (
                      <p id="phone-error" className="mt-1 text-sm text-red-400" role="alert">
                        {errors.phone}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium text-slate-400 mb-2"
                  >
                    О проекте
                    <span className="ml-2 text-xs text-slate-500">
                      (минимум {CONTACT_CONFIG.minDescriptionLength} символов)
                    </span>
                  </label>
                  <textarea
                    id="description"
                    rows={5}
                    value={description}
                    onChange={handleDescriptionChange}
                    onBlur={() => validateField('description', description)}
                    className={`w-full bg-dark-900 border rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-1 resize-none transition-colors ${
                      errors.description
                        ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                        : 'border-white/10 focus:border-primary-500 focus:ring-primary-500'
                    }`}
                    placeholder="Нам нужно разработать маркетплейс для строительных материалов..."
                    aria-invalid={!!errors.description}
                    aria-describedby={errors.description ? 'description-error' : undefined}
                  />
                  {errors.description && (
                    <p id="description-error" className="mt-1 text-sm text-red-400" role="alert">
                      {errors.description}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="privacy-consent"
                    className="flex items-start gap-3 cursor-pointer group"
                  >
                    <input
                      id="privacy-consent"
                      type="checkbox"
                      checked={privacyConsent}
                      onChange={(e) => {
                        setPrivacyConsent(e.target.checked);
                        if (e.target.checked) {
                          setErrors((prev) => {
                            const newErrors = { ...prev };
                            delete newErrors.privacyConsent;
                            return newErrors;
                          });
                        }
                      }}
                      className="mt-1 w-5 h-5 rounded border-white/20 bg-dark-900 text-primary-600 focus:ring-2 focus:ring-primary-500 focus:ring-offset-0 cursor-pointer"
                      aria-invalid={!!errors.privacyConsent}
                      aria-describedby={errors.privacyConsent ? 'privacy-error' : undefined}
                    />
                    <span className="text-sm text-slate-400 group-hover:text-slate-300 transition-colors">
                      Я согласен на{' '}
                      <Link
                        to="/privacy"
                        className="text-primary-400 hover:text-primary-300 underline"
                      >
                        обработку персональных данных
                      </Link>
                    </span>
                  </label>
                  {errors.privacyConsent && (
                    <p id="privacy-error" className="mt-1 text-sm text-red-400" role="alert">
                      {errors.privacyConsent}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={status === ContactStatus.SENDING}
                  className="w-full bg-primary-600 hover:bg-primary-500 text-white py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed text-lg"
                  aria-label="Отправить заявку"
                >
                  {status === ContactStatus.SENDING ? (
                    <>
                      <Loader2 className="animate-spin" size={20} aria-hidden="true" />
                      Отправка...
                    </>
                  ) : (
                    <>
                      <Send size={20} aria-hidden="true" />
                      Отправить заявку
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
