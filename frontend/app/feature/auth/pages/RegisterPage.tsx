'use client';

import Link from 'next/link';
import { Lock, Mail, User } from 'lucide-react';
import { AuthLayout } from '../components/AuthLayout';
import { FormAlert } from '../components/FormAlert';
import { FormField } from '../components/FormField';
import { SubmitButton } from '../components/SubmitButton';
import { useRegisterForm } from '../hooks/useRegisterForm';

export default function RegisterPage() {
  const { values, fieldErrors, formError, isSubmitting, handleChange, handleSubmit } = useRegisterForm();

  return (
    <AuthLayout
      title="Créer un compte"
      subtitle="Rejoignez la plateforme pour passer et suivre vos commandes"
      footer={
        <>
          Déjà un compte ?{' '}
          <Link href="/login" className="font-semibold text-[#E7A519] hover:underline">
            Se connecter
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} noValidate>
        <FormAlert message={formError} />

        <div className="grid grid-cols-1 gap-x-4 sm:grid-cols-2">
          <FormField
            id="firstName"
            label="Prénom"
            icon={User}
            autoComplete="given-name"
            value={values.firstName}
            onChange={handleChange('firstName')}
            error={fieldErrors.firstName}
          />
          <FormField
            id="lastName"
            label="Nom"
            icon={User}
            autoComplete="family-name"
            value={values.lastName}
            onChange={handleChange('lastName')}
            error={fieldErrors.lastName}
          />
        </div>

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
          placeholder="8 caractères minimum"
          autoComplete="new-password"
          value={values.password}
          onChange={handleChange('password')}
          error={fieldErrors.password}
        />

        <SubmitButton isLoading={isSubmitting} loadingLabel="Création du compte...">
          Créer mon compte
        </SubmitButton>
      </form>
    </AuthLayout>
  );
}