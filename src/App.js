import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Container from '@mui/material/Container';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import { createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/ScopedCssBaseline';

import Header from './components/Header';
import Footer from './components/Footer';
import SubmitProject from './pages/SubmitProject';
import Projects from './pages/Projects';
import GetStarted from './pages/GetStarted';
import About from './pages/About';

import './theme/App.css';

const theme = createTheme({
  palette: {
    primary: { main: '#35b87b', contrastText: '#fff' },
    secondary: { main: '#4461ad', contrastText: '#fff' },
    neutral: { main: '#808080', contrastText: '#000' }
  },
  typography: {
    h1: { fontSize: '2em' },
    h2: { fontSize: '1.7em' },
    h3: { fontSize: '1.5em' }
  }
});

export default function App() {
  const routerRef = React.createRef();
  return (
    <Router ref={routerRef}>
      <CssBaseline>
        <ThemeProvider theme={theme}>
          <Container>
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
        </ThemeProvider>
      </CssBaseline>
    </Router>
  );
}
