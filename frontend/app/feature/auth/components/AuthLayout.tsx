import type { ReactNode } from 'react';
import Image from 'next/image';
import { Building2 } from 'lucide-react';

type AuthLayoutProps = {
  title: string;
  subtitle: string;
  footer: ReactNode;
  children: ReactNode;
};

export function AuthLayout({ title, subtitle, footer, children }: AuthLayoutProps) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F7F7F5] p-4">
      <div className="flex w-full max-w-225 overflow-hidden rounded-xl shadow-[4px_4px_4px_rgba(0,0,0,0.25)]">
        <section className="flex w-full flex-col bg-white p-6 sm:p-8 md:w-1/2">
          <div className="mb-6 flex items-center gap-2">
            <Building2 size={32} className="text-[#E7A519]" aria-hidden />
            <span className="text-xl font-semibold text-[#E7A519]">SFMC Bénin</span>
          </div>

          <h1 className="mb-2 text-2xl font-semibold text-[#666666] sm:text-3xl">{title}</h1>
          <p className="mb-6 text-sm text-[#999999] sm:text-base">{subtitle}</p>

          {children}

          <p className="mt-6 text-center text-sm text-[#666666]">{footer}</p>
        </section>

        <aside
          aria-hidden
          className="relative hidden bg-[radial-gradient(50%_50%_at_50%_50%,rgba(255,207,104,0.77)_0%,rgba(245,181,45,0.885)_74.99%,#E7A519_99.99%)] md:block md:w-1/2"
        >
          <Image
            src="/images/heroAuthImage.png"
            alt=""
            fill
            priority
            sizes="(min-width: 768px) 450px, 0px"
            className="object-contain p-8"
          />
        </aside>
      </div>
    </main>
  );
}