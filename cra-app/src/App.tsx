import React, { useMemo, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import useMediaQuery from '@mui/material/useMediaQuery';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/ScopedCssBaseline';
import Container from '@mui/material/Container';

import Header from './components/Header';
import Footer from './components/Footer';
import SubmitProject from './pages/SubmitProject';
import Projects from './pages/Projects';
import GetStarted from './pages/GetStarted';
import About from './pages/About';

import createDefaultTheme from './theme/createDefaultTheme';
import './theme/App.css';

export default function App() {
  const prefersLightMode = useMediaQuery('(prefers-color-scheme: light)');
  const theme = useMemo(() => createDefaultTheme(prefersLightMode), [prefersLightMode]);
  const routerRef = React.createRef<Router>();
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

  return (
    <Router ref={routerRef}>
      <ThemeProvider theme={theme}>
        <CssBaseline>
          <Container id="root-container">
            <Header />
            <main>
              <Switch>
                <Route path="/submit-project">
                  <SubmitProject />
                </Route>
                <Route path="/get-started">
                  <GetStarted />
                </Route>
                <Route path="/about">
                  <About />
                </Route>
                <Route path="/">
                  <Projects />
                </Route>
              </Switch>
            </main>
            <Footer />
          </Container>
        </CssBaseline>
      </ThemeProvider>
    </Router>
  );
}
