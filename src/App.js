import React from 'react';
import { Container } from 'semantic-ui-react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './semantic-ui/semantic.less';

import Header from './components/Header';
import Footer from './components/Footer';
import SubmitProject from './pages/SubmitProject';
import ProjectsPage from './pages/Main';
import GetStarted from './pages/GetStarted';
import About from './pages/About';

import './theme/App.css';

export default function App() {
  const routerRef = React.createRef();
  return (
    <Router ref={routerRef}>
      <Container>
        <Header />
        <main>
          <Switch>
            <Route path="/about">
              <About />
            </Route>
            <Route path="/get-started">
              <GetStarted />
            </Route>
            <Route path="/submit-project">
              <SubmitProject />
            </Route>
            <Route path="/">
              <ProjectsPage />
            </Route>
          </Switch>
        </main>
        <Footer />
      </Container>
    </Router>
  );
}
