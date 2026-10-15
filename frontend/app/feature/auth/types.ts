export type UserRole = 'admin' | 'operator' | 'client';

export type LoginPayload = {
  email: string;
  password: string;
};

export type RegisterPayload = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};

export type AuthUser = {
  id: string;
  email: string;
  role: UserRole;
};

export type AuthSession = {
  accessToken: string;
  refreshToken: string;
  tokenType: string;
  expiresIn: number;
  user: AuthUser;
};

export type FieldErrors<T> = Partial<Record<keyof T, string>>;