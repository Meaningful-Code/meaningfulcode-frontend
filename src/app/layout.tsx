import * as React from 'react';
import dynamic from 'next/dynamic';
import Script from 'next/script';
import { Open_Sans } from 'next/font/google';

import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { lightTheme } from '@/theme';
import PatchCssStyle from '@/PatchCssStyle';

import { GOOGLE_TAG_ID } from '@/constants/constants';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

import './layout.css';

export const metadata = {
  title: 'Open-source for good',
  description:
    'Pick a cause to support, find Open Source projects to contribute to, and make an impact! Write meaningful code, from environment, to health',
};

export function PageLayout({ children }: { children: React.ReactNode }) {
  return (
    <AppRouterCacheProvider options={{ enableCssLayer: true }}>
      <ThemeProvider theme={lightTheme}>
        <CssBaseline />
        {/* Color patching disabled until dark theme restored */}
        {/* <PatchCssStyle /> */}
        <div id="root">
          <Header />
          <Container component="main" id="root-container">
            {children}
          </Container>
          <Footer />
        </div>
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
}

const open_sans_font = Open_Sans({
  subsets: ['latin'],
  variable: '--font-base',
  display: 'swap',
});

const GaPageEvent = dynamic(() => import('@/components/GaPageEvent'), {
  ssr: false,
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={open_sans_font.className}>
      <body>
        <Script
          async
          src={'https://www.googletagmanager.com/gtag/js?id=' + GOOGLE_TAG_ID}
        />
        <Script id="gtag">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag() {
              dataLayer.push(arguments);
            }
            gtag('js', new Date());
            gtag('config', '` +
            GOOGLE_TAG_ID +
            `', {
              anonymize_ip: true,
              client_storage: 'none',
              ad_storage: 'denied',
              analytics_storage: 'denied',
            });`}
        </Script>
        <GaPageEvent />
        <PageLayout>{children}</PageLayout>
      </body>
    </html>
  );
}
