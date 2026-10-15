import type { ReactNode } from 'react';

type SubmitButtonProps = {
  isLoading: boolean;
  loadingLabel: string;
  children: ReactNode;
};

export function SubmitButton({ isLoading, loadingLabel, children }: SubmitButtonProps) {
  return (
    <button
      type="submit"
      disabled={isLoading}
      className="w-full rounded-lg bg-[#E7A519] py-2 text-white transition hover:bg-[#d49416] disabled:cursor-not-allowed disabled:opacity-50"
    >
      {isLoading ? loadingLabel : children}
    </button>
  );
}