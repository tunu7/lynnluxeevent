export default function FormError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p role="alert" className="rounded-sm border border-red-700/25 bg-red-50 px-4 py-3 text-sm text-red-900">
      {message}
    </p>
  );
}
