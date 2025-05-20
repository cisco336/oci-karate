import { RichText } from '@graphcms/rich-text-react-renderer';

export default function RichTextRenderer({ content }: { content: any }) {
  return (
    <RichText
      content={content}
      renderers={{
        h1: ({ children }) => (
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
            {children}
          </h1>
        ),
        h2: ({ children }) => (
          <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl dark:text-white">
            {children}
          </h2>
        ),
        h3: ({ children }) => (
          <h3 className="text-2xl font-semibold text-gray-800 dark:text-white">
            {children}
          </h3>
        ),
        p: ({ children }) => (
          <p className="mb-4 text-lg text-gray-700 dark:text-gray-300">
            {children}
          </p>
        ),
        ul: ({ children }) => (
          <ul className="list-disc pl-6 mb-4">{children}</ul>
        ),
        ol: ({ children }) => (
          <ol className="list-decimal pl-6 mb-4">{children}</ol>
        ),
        li: ({ children }) => <li className="mb-2">{children}</li>,
        a: ({ href, children }) => (
          <a
            href={href}
            className="text-blue-600 underline hover:text-blue-800">
            {children}
          </a>
        ),
      }}
    />
  );
}
