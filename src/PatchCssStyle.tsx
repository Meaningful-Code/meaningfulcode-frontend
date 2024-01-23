'use client';

import React, { useEffect } from 'react';
import { useTheme } from '@mui/material/styles';

// import useMediaQuery from '@mui/material/useMediaQuery';
// const serverSide = typeof window === 'undefined';
// const prefersLightMode = useMediaQuery('(prefers-color-scheme: light)', {
//   noSsr: true,
// });
// const lightMode = serverSide || prefersLightMode;
export default function PatchCssStyle() {
  const theme = useTheme();
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
    document.body.style.backgroundColor = theme.palette.background.default;
  }, [theme.palette]);
  return <></>;
}
