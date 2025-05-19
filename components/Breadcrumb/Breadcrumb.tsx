'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Breadcrumb({ show }: { show?: boolean }) {
  const pathname = usePathname();
  const segments = pathname.split('/').filter(Boolean);

  return (
    show && (
      <nav
        aria-label="Breadcrumb"
        className="mb-4">
        <ol className="flex space-x-2 text-sm text-gray-500">
          <li>
            <Link
              href="/"
              className="hover:underline text-blue-600">
              Home
            </Link>
          </li>
          {segments.map((segment, idx) => {
            const href = '/' + segments.slice(0, idx + 1).join('/');
            const label = decodeURIComponent(segment.replace(/-/g, ' '));
            return (
              <li
                key={href}
                className="flex items-center">
                <span className="mx-2">/</span>
                {idx === segments.length - 1 ? (
                  <span className="text-gray-700">{label}</span>
                ) : (
                  <Link
                    href={href}
                    className="hover:underline text-blue-600">
                    {label}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    )
  );
}
