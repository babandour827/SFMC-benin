'use client';

import { useState, type InputHTMLAttributes } from 'react';
import { Eye, EyeOff, type LucideIcon } from 'lucide-react';

type FormFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  id: string;
  label: string;
  icon: LucideIcon;
  error?: string;
};

export function FormField({ id, label, icon: Icon, error, type = 'text', ...inputProps }: FormFieldProps) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const isPassword = type === 'password';
  const inputType = isPassword && isPasswordVisible ? 'text' : type;
  const errorId = `${id}-error`;
  const borderColor = error ? 'border-red-500' : 'border-[#AEAEAE]';

  return (
    <div className="mb-4 flex flex-col">
      <label htmlFor={id} className="flex items-center gap-2 text-sm text-[#666666]">
        <Icon size={16} aria-hidden /> {label}
      </label>

      <div className="relative mt-1">
        <input
          {...inputProps}
          id={id}
          type={inputType}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
          className={`w-full rounded-lg border px-3 py-2 text-sm text-[#666666] focus:outline-none focus:ring-2 focus:ring-yellow-400 ${borderColor} ${isPassword ? 'pr-10' : ''}`}
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setIsPasswordVisible((visible) => !visible)}
            aria-label={isPasswordVisible ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#999999]"
          >
            {isPasswordVisible ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>

      {error && (
        <p id={errorId} className="mt-1 text-xs text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}