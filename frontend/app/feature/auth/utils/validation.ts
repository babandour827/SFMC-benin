import type { FieldErrors, LoginPayload, RegisterPayload } from '../types';

const LIMITS = {
  emailMax: 254,
  passwordMin: 8,
  passwordMax: 72,
  nameMax: 80,
} as const;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateEmail(rawEmail: string): string | undefined {
  const email = rawEmail.trim();
  if (!email) return "L'email est requis.";
  if (email.length > LIMITS.emailMax || !EMAIL_PATTERN.test(email)) {
    return 'Adresse email invalide.';
  }
  return undefined;
}

function validatePassword(password: string): string | undefined {
  if (!password) return 'Le mot de passe est requis.';
  if (password.length < LIMITS.passwordMin) {
    return `Le mot de passe doit contenir au moins ${LIMITS.passwordMin} caractères.`;
  }
  if (password.length > LIMITS.passwordMax) {
    return `Le mot de passe ne doit pas dépasser ${LIMITS.passwordMax} caractères.`;
  }
  return undefined;
}

function validateName(rawName: string, label: string): string | undefined {
  const name = rawName.trim();
  if (!name) return `${label} est requis.`;
  if (name.length > LIMITS.nameMax) {
    return `${label} ne doit pas dépasser ${LIMITS.nameMax} caractères.`;
  }
  return undefined;
}

function compact<T extends object>(
  errors: Partial<Record<keyof T, string | undefined>>,
): FieldErrors<T> {
  return Object.fromEntries(
    Object.entries(errors).filter(([, message]) => message !== undefined),
  ) as FieldErrors<T>;
}

export function validateLogin(values: LoginPayload): FieldErrors<LoginPayload> {
  return compact<LoginPayload>({
    email: validateEmail(values.email),
    password: values.password ? undefined : 'Le mot de passe est requis.',
  });
}

export function validateRegister(values: RegisterPayload): FieldErrors<RegisterPayload> {
  return compact<RegisterPayload>({
    firstName: validateName(values.firstName, 'Le prénom'),
    lastName: validateName(values.lastName, 'Le nom'),
    email: validateEmail(values.email),
    password: validatePassword(values.password),
  });
}