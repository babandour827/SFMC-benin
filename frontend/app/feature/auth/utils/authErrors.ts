export const NETWORK_ERROR_STATUS = 0;

export class AuthApiError extends Error {
  readonly status: number;

  constructor(status: number) {
    super(`Auth API error (${status})`);
    this.name = 'AuthApiError';
    this.status = status;
  }
}

const DEFAULT_MESSAGE = 'Une erreur est survenue. Veuillez réessayer.';

export function getUserMessage(error: unknown): string {
  if (!(error instanceof AuthApiError)) return DEFAULT_MESSAGE;

  if (error.status === NETWORK_ERROR_STATUS) {
    return 'Impossible de joindre le serveur. Vérifiez votre connexion.';
  }
  if (error.status === 400) return 'Les informations saisies sont invalides.';
  if (error.status === 401) return 'Email ou mot de passe incorrect.';
  if (error.status === 409) return 'Un compte existe déjà avec cet email.';
  if (error.status === 429) return 'Trop de tentatives. Réessayez dans une minute.';
  if (error.status >= 500) return 'Le serveur rencontre un problème. Réessayez plus tard.';

  return DEFAULT_MESSAGE;
}