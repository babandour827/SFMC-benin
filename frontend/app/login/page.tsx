import type { Metadata } from 'next';
import LoginPage from '@/app/feature/auth/pages/LoginPage';

export const metadata: Metadata = { title: 'Connexion | SFMC Bénin' };

export default function Page() {
  return <LoginPage />;
}