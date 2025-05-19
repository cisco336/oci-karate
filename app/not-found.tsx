'use client';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-8 text-center">
      <h1 className="text-6xl font-bold text-danger-400">404</h1>
      <h2 className="text-3xl font-semibold">Página no encontrada</h2>
      <p className="text-lg text-gray-400 max-w-xl">
        Lo sentimos, la página que buscas no existe o ha sido movida.
      </p>
      <Link
        href="/"
        className="mt-4 px-6 py-3 bg-primary-500 text-white rounded-lg shadow hover:bg-primary-600 transition">
        Volver al inicio
      </Link>
    </div>
  );
}
