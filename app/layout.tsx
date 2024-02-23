import { GeistSans } from 'geist/font/sans';
import './globals.scss';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

// import Font Awesome CSS
import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';
import Providers from './providers';
config.autoAddCss = false;

const defaultUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : 'http://localhost:3000';

export const metadata = {
    metadataBase: new URL(defaultUrl),
    title: 'Next.js and Supabase Starter Kit',
    description: 'The fastest way to build apps with Next.js and Supabase',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html
            lang="en"
            className={GeistSans.className}>
            <body className="bg-background text-foreground flex flex-col min-h-screen">
                <Providers>
                    <div className="z-10">
                        <Nav />
                    </div>
                    <main className="flex flex-col items-center flex-1">
                        {children}
                    </main>
                    <Footer />
                </Providers>
            </body>
        </html>
    );
}
