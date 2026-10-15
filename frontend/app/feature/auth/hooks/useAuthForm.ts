'use client';

import { useState, type ChangeEvent, type FormEvent } from 'react';
import type { FieldErrors } from '../types';
import { getUserMessage } from '../utils/authErrors';

type UseAuthFormOptions<T extends Record<string, string>> = {
  initialValues: T;
  validate: (values: T) => FieldErrors<T>;
  submit: (values: T) => Promise<void>;
};

export function useAuthForm<T extends Record<string, string>>({
  initialValues,
  validate,
  submit,
}: UseAuthFormOptions<T>) {
  const [values, setValues] = useState<T>(initialValues);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors<T>>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (field: keyof T) => (event: ChangeEvent<HTMLInputElement>) => {
    setValues((previous) => ({ ...previous, [field]: event.target.value }));
    setFieldErrors((previous) => ({ ...previous, [field]: undefined }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError(null);

    const errors = validate(values);
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) return;

    setIsSubmitting(true);
    try {
      await submit(values);
    } catch (error) {
      setFormError(getUserMessage(error));
    } finally {
      setIsSubmitting(false);
    }
  };

  return { values, fieldErrors, formError, isSubmitting, handleChange, handleSubmit };
}