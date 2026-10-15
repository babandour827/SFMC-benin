import type { AuthSession } from '../types';

const SESSION_KEY = 'sfmc.session';

// Stockage temporaire : à remplacer par un cookie httpOnly (voir notes)
export const sessionStore = {
  save(session: AuthSession): void {
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
  },

  read(): AuthSession | null {
    const raw = sessionStorage.getItem(SESSION_KEY);
    return raw ? (JSON.parse(raw) as AuthSession) : null;
  },

  clear(): void {
    sessionStorage.removeItem(SESSION_KEY);
  },
};