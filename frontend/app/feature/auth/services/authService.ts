import type { AuthSession, LoginPayload, RegisterPayload } from '../types';
import { AuthApiError, NETWORK_ERROR_STATUS } from '../utils/authErrors';

// Relayé vers l'API Gateway par le rewrite de next.config.ts
const API_BASE_URL = '/api';

async function postJson(path: string, body: unknown): Promise<Response> {
  let response: Response;

  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
  } catch {
    throw new AuthApiError(NETWORK_ERROR_STATUS);
  }

  if (!response.ok) throw new AuthApiError(response.status);
  return response;
}

export async function login(payload: LoginPayload): Promise<AuthSession> {
  const response = await postJson('/auth/login', payload);
  return (await response.json()) as AuthSession;
}

export async function register(payload: RegisterPayload): Promise<void> {
  await postJson('/users/register', payload);
}