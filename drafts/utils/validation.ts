import { VALIDATION } from '../config/constants';

export interface ValidationResult {
  isValid: boolean;
  message?: string;
}

/**
 * Валидация email адреса
 */
export const validateEmail = (email: string): ValidationResult => {
  if (!email.trim()) {
    return { isValid: false, message: 'Email обязателен для заполнения' };
  }

  if (!VALIDATION.email.pattern.test(email)) {
    return { isValid: false, message: VALIDATION.email.message };
  }

  return { isValid: true };
};

/**
 * Валидация номера телефона
 */
export const validatePhone = (phone: string): ValidationResult => {
  if (!phone.trim()) {
    return { isValid: false, message: 'Телефон обязателен для заполнения' };
  }

  const digitsOnly = phone.replace(/\D/g, '');
  if (digitsOnly.length < VALIDATION.phone.minLength) {
    return { isValid: false, message: VALIDATION.phone.message };
  }

  if (!VALIDATION.phone.pattern.test(phone)) {
    return { isValid: false, message: VALIDATION.phone.message };
  }

  return { isValid: true };
};

/**
 * Валидация имени
 */
export const validateName = (name: string): ValidationResult => {
  if (!name.trim()) {
    return { isValid: false, message: 'Имя обязательно для заполнения' };
  }

  if (name.trim().length < VALIDATION.name.minLength) {
    return { isValid: false, message: VALIDATION.name.message };
  }

  return { isValid: true };
};

/**
 * Валидация описания проекта
 */
export const validateDescription = (
  description: string,
  minLength: number = 20
): ValidationResult => {
  if (!description.trim()) {
    return { isValid: false, message: 'Описание проекта обязательно для заполнения' };
  }

  if (description.trim().length < minLength) {
    return {
      isValid: false,
      message: `Описание должно содержать минимум ${minLength} символов`,
    };
  }

  return { isValid: true };
};
