'use client';

import { useRouter } from 'next/navigation';
import { login, register } from '../services/authService';
import { sessionStore } from '../services/sessionStore';
import type { RegisterPayload } from '../types';
import { getHomeRoute } from '../utils/roleRoutes';
import { validateRegister } from '../utils/validation';
import { useAuthForm } from './useAuthForm';

export function useRegisterForm() {
  const router = useRouter();

  return useAuthForm<RegisterPayload>({
    initialValues: { firstName: '', lastName: '', email: '', password: '' },
    validate: validateRegister,
    submit: async (values) => {
      const payload: RegisterPayload = {
        firstName: values.firstName.trim(),
        lastName: values.lastName.trim(),
        email: values.email.trim(),
        password: values.password,
      };

      await register(payload);
      // L'inscription ne renvoie pas de token : connexion automatique
      const session = await login({ email: payload.email, password: payload.password });
      sessionStore.save(session);
      router.push(getHomeRoute(session.user.role));
    },
  });
}