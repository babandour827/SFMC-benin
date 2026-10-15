'use client';

import { useRouter } from 'next/navigation';
import { login } from '../services/authService';
import { sessionStore } from '../services/sessionStore';
import type { LoginPayload } from '../types';
import { getHomeRoute } from '../utils/roleRoutes';
import { validateLogin } from '../utils/validation';
import { useAuthForm } from './useAuthForm';

export function useLoginForm() {
  const router = useRouter();

  return useAuthForm<LoginPayload>({
    initialValues: { email: '', password: '' },
    validate: validateLogin,
    submit: async (values) => {
      const session = await login({ email: values.email.trim(), password: values.password });
      sessionStore.save(session);
      router.push(getHomeRoute(session.user.role));
    },
  });
}