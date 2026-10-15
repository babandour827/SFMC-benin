import type { Metadata } from 'next';
import RegisterPage from '@/app/feature/auth/pages/RegisterPage';

export const metadata: Metadata = { title: 'Inscription | SFMC Bénin' };

export default function Page() {
  return <RegisterPage />;
}