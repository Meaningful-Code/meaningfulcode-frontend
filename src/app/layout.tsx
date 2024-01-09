import * as React from 'react';
import Container from '@mui/material/Container';
import ThemeRegistry from '@/components/ThemeRegistry/ThemeRegistry';
// import Header from '../components/Header';
import Footer from '../components/Footer';

import './layout.css';

export const metadata = {
  title: 'Find Open-source projects with a social impact',
  description:
    'Pick a cause to support, find Open Source projects to contribute to, and make an impact! Write meaningful code, from environment, to health',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // const prefersLightMode = useMediaQuery('(prefers-color-scheme: light)');
  // const theme = useMemo(() => createDefaultTheme(prefersLightMode), [prefersLightMode]);
  // useEffect(() => {
  //   const root = document.documentElement;
  //   root.style.setProperty('--gray', '#888');
  //   root.style.setProperty('--white', '#fff');
  //   root.style.setProperty('--black', '#000');

  //   /* @ts-ignore: color type not properly recognized */
  //   root.style.setProperty('--cat-all-color', theme.palette.cat_all.main);
  //   /* @ts-ignore: color type not properly recognized */
  //   root.style.setProperty('--cat-health-color', theme.palette.cat_health.main);
  //   /* @ts-ignore: color type not properly recognized */
  //   root.style.setProperty('--cat-education-color', theme.palette.cat_education.main);
  //   root.style.setProperty(
  //     '--cat-environment-color',
  //     /* @ts-ignore: color type not properly recognized */
  //     theme.palette.cat_environment.main
  //   );
  //   /* @ts-ignore: color type not properly recognized */
  //   root.style.setProperty('--cat-society-color', theme.palette.cat_society.main);
  //   root.style.setProperty(
  //     '--cat-humanitarian-color',
  //     /* @ts-ignore: color type not properly recognized */
  //     theme.palette.cat_humanitarian.main
  //   );
  //   root.style.setProperty(
  //     '--cat-accessibility-color',
  //     /* @ts-ignore: color type not properly recognized */
  //     theme.palette.cat_accessibility.main
  //   );
  //   document.body.style.backgroundColor = theme.palette.background.default;
  // }, [theme.palette]);

  return (
    <html lang="en">
      <body>
        <ThemeRegistry>
          {/* <Header /> */}
          <Container component="main" id="root-container">
            {children}
          </Container>
          <Footer />
        </ThemeRegistry>
      </body>
    </html>
  );
}
