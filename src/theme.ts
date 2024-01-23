'use client';

import { createTheme } from '@mui/material/styles';

function createCustomTheme(lightMode: boolean) {
  const theme = createTheme({
    palette: {
      mode: lightMode ? 'light' : 'dark',
      primary: {
        main: lightMode ? '#3c9d76' : '#54a484',
        contrastText: lightMode ? '#fff' : '#000',
      },
      secondary: { main: lightMode ? '#1f647d' : '#62a7d0', contrastText: '#fff' },
      neutral: {
        main: lightMode ? '#0b7c78' : '#d0d0d0',
        contrastText: lightMode ? '#000' : '#000',
      },
      cat_all: {
        main: lightMode ? '#1f647d' : '#287693',
        contrastText: lightMode ? '#000' : '#000',
      },
      cat_environment: {
        main: lightMode ? '#3c9d76' : '#3c9d76',
        contrastText: lightMode ? '#000' : '#fff',
      },
      cat_humanitarian: {
        main: lightMode ? '#cc8562' : '#cc8562',
        contrastText: lightMode ? '#000' : '#fff',
      },
      cat_accessibility: {
        main: lightMode ? '#1f647d' : '#287693',
        contrastText: lightMode ? '#000' : '#fff',
      },
      cat_society: {
        main: lightMode ? '#1f647d' : '#287693',
        contrastText: lightMode ? '#000' : '#fff',
      },
      cat_health: {
        main: lightMode ? '#cc8562' : '#cc8562',
        contrastText: lightMode ? '#000' : '#fff',
      },
      cat_education: {
        main: lightMode ? '#3c9d76' : '#3c9d76',
        contrastText: lightMode ? '#000' : '#fff',
      },
    },
    typography: {
      fontFamily: 'var(--font-base)',
      h1: { fontSize: '2em' },
      h2: { fontSize: '1.7em' },
      h3: { fontSize: '1.5em' },
    },
  });
  return theme;
}

export const lightTheme = createCustomTheme(true);
export const darkTheme = createCustomTheme(false);
