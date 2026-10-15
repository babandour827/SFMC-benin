'use client';

import Link from 'next/link';
import { Lock, Mail } from 'lucide-react';
import { AuthLayout } from '../components/AuthLayout';
import { FormAlert } from '../components/FormAlert';
import { FormField } from '../components/FormField';
import { SubmitButton } from '../components/SubmitButton';
import { useLoginForm } from '../hooks/useLoginForm';

export default function LoginPage() {
  const { values, fieldErrors, formError, isSubmitting, handleChange, handleSubmit } = useLoginForm();

  return (
    <AuthLayout
      title="Bienvenue !"
      subtitle="Connectez-vous pour accéder à votre espace de travail"
      footer={
        <>
          Pas encore de compte ?{' '}
          <Link href="/register" className="font-semibold text-[#E7A519] hover:underline">
            Créer un compte
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} noValidate>
        <FormAlert message={formError} />

        <FormField
          id="email"
          type="email"
          label="Email"
          icon={Mail}
          placeholder="exemple@sfmc.bj"
          autoComplete="email"
          value={values.email}
          onChange={handleChange('email')}
          error={fieldErrors.email}
        />

        <FormField
          id="password"
          type="password"
          label="Mot de passe"
          icon={Lock}
          placeholder="********"
          autoComplete="current-password"
          value={values.password}
          onChange={handleChange('password')}
          error={fieldErrors.password}
        />

        <SubmitButton isLoading={isSubmitting} loadingLabel="Connexion...">
          Se connecter
        </SubmitButton>
      </form>
    </AuthLayout>
  );
}