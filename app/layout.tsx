import React from 'react'; // Import React
import '@/styles/globals.css';
import { Metadata } from 'next';
import clsx from 'clsx';
import { Providers } from './providers';
import { siteConfig } from '@/config/site';
import { fontSans } from '@/config/fonts';
import Header from '@/components/Header';
import { AuthContextProvider } from '../config/AuthContext';
import { Toaster } from 'react-hot-toast';
import '../styles/globals.css';

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: '/MT_icon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <head />
      <body
        className={clsx(
          'min-h-screen bg-background font-sans antialiased',
          fontSans.variable
        )}
      >
        <AuthContextProvider>
          {/* <Providers> */}
            <Toaster />
            <div className="relative flex flex-col h-screen">
              <Header />
              {/* <main className="container mx-auto max-w-7xl pt-16 px-6 flex-grow"> */}
              <main>{children}</main>
              {/* <footer className="w-full flex items-center justify-center py-3 bg-white">
              <Link
                isExternal
                className="flex items-center gap-1 text-current"
                href="https://nextui-docs-v2.vercel.app?utm_source=next-app-template"
                title="nextui.org homepage"
                >
                <span className="text-default-600">Powered by</span>
                <p className="text-primary">NextUI</p>
              </Link>
            </footer> */}
            </div>
          {/* </Providers> */}
        </AuthContextProvider>
      </body>
    </html>
  );
}
