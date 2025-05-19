import { GeistSans } from 'geist/font/sans';
import './globals.scss';
import Nav from '@/components/Nav/Nav';
import Footer from '@/components/Footer/Footer';
import ErrorBoundary from '@/components/ErrorBoundary/index';
import Breadcrumb from '@/components/Breadcrumb';

// import Font Awesome CSS
import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';
import { SessionProvider } from 'next-auth/react';
import { EnumsProvider } from './providers/enumsProvider/enumsProvider';
config.autoAddCss = false;

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000';

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: 'OCI',
  description: 'OCI Karate',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="es"
      className={GeistSans.className}>
      <body className="bg-background text-foreground flex flex-col min-h-screen relative">
        <SessionProvider>
          <EnumsProvider>
            <div className="z-10 sticky top-0">
              <Nav />
            </div>
            <ErrorBoundary>
              <Breadcrumb show={false} />
              <main className="flex flex-col items-center flex-1 w-full h-full overflow-hidden">
                {children}
              </main>
            </ErrorBoundary>
            {/* <Footer /> */}
          </EnumsProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
