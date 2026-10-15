type FormAlertProps = {
  message: string | null;
};

export function FormAlert({ message }: FormAlertProps) {
  if (!message) return null;

  return (
    <p role="alert" className="mb-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">
      {message}
    </p>
  );
}