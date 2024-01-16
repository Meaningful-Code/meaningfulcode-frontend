'use client';

import React, { useEffect, useMemo } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import NextAppDirEmotionCacheProvider from './EmotionCache';
import createCustomTheme from './theme';
import useMediaQuery from '@mui/material/useMediaQuery';

export default function ThemeRegistry({ children }: { children: React.ReactNode }) {
  const serverSide = typeof window === 'undefined';
  const prefersLightMode = useMediaQuery('(prefers-color-scheme: light)', {
    noSsr: true,
  });
  const lightMode = serverSide || prefersLightMode;
  const theme = useMemo(() => createCustomTheme(lightMode), [lightMode]);

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--gray', '#888');
    root.style.setProperty('--white', '#fff');
    root.style.setProperty('--black', '#000');

    /* @ts-ignore: color type not properly recognized */
    root.style.setProperty('--cat-all-color', theme.palette.cat_all.main);
    /* @ts-ignore: color type not properly recognized */
    root.style.setProperty('--cat-health-color', theme.palette.cat_health.main);
    /* @ts-ignore: color type not properly recognized */
    root.style.setProperty('--cat-education-color', theme.palette.cat_education.main);
    root.style.setProperty(
      '--cat-environment-color',
      /* @ts-ignore: color type not properly recognized */
      theme.palette.cat_environment.main
    );
    /* @ts-ignore: color type not properly recognized */
    root.style.setProperty('--cat-society-color', theme.palette.cat_society.main);
    root.style.setProperty(
      '--cat-humanitarian-color',
      /* @ts-ignore: color type not properly recognized */
      theme.palette.cat_humanitarian.main
    );
    root.style.setProperty(
      '--cat-accessibility-color',
      /* @ts-ignore: color type not properly recognized */
      theme.palette.cat_accessibility.main
    );
  }, [theme.palette]);

  return (
    <NextAppDirEmotionCacheProvider options={{ key: 'mui' }}>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        {children}
      </ThemeProvider>
    </NextAppDirEmotionCacheProvider>
  );
}
