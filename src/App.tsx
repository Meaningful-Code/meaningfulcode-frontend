import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/ScopedCssBaseline';

import Header from './components/Header';
import Footer from './components/Footer';
import SubmitProject from './pages/SubmitProject';
import Projects from './pages/Projects';
import GetStarted from './pages/GetStarted';
import About from './pages/About';

import createDefaultTheme from './theme/createDefaultTheme';
import './theme/App.css';

export default function App() {
  const routerRef = React.createRef<Router>();
  return (
    <Router ref={routerRef}>
      <CssBaseline>
        <ThemeProvider theme={createDefaultTheme()}>
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
        </ThemeProvider>
      </CssBaseline>
    </Router>
  );
}
