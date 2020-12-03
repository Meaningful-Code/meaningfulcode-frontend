import React from 'react';
import { Button, Container, Header, Icon, Image, List } from 'semantic-ui-react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import PageHeader from './PageHeader';
import ProjectsPage from './projects/ProjectsPage';
import Emoji from './components/Emoji';

import './App.css';

export default function App() {
  return (
    <Router>
      <Container>
        <PageHeader />
        <main>
          <Switch>
            <Route path="/about">
              <About />
            </Route>
            <Route path="/get-started">
              <GetStarted />
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

function Footer() {
  return (
    <footer>
      <div id="social">
        <Header as="h3">Support these projects: Share!</Header>
        <Button
          color="twitter"
          href="https://twitter.com/intent/tweet?source=https%3A%2F%2Fmeaningfulcode.org&text=Pick%20a%20cause%20to%20support%2C%20find%20Open%20Source%20projects%20to%20contribute%20to%2C%20and%20write%20%23MeaningfulCode%21%20%E2%9C%A8%20https%3A%2F%2Fmeaningfulcode.org%2F"
          target="_blank"
          title="Tweet"
        >
          <Icon name="twitter" />
          Twitter
        </Button>
        <Button
          color="linkedin"
          href="http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fmeaningfulcode.org&title=MeaningfulCode%20-%20Impactful%20open-source&summary=Pick%20a%20cause%20to%20support%2C%20find%20Open%20Source%20projects%20to%20contribute%20to%2C%20and%20write%20%23MeaningfulCode%21%20%E2%9C%A8%20https%3A%2F%2Fmeaningfulcode.org%2F&source=https%3A%2F%2Fmeaningfulcode.org"
          target="_blank"
          title="Share on LinkedIn"
        >
          <Icon name="linkedin" />
          LinkedIn
        </Button>
        <Button
          color="red"
          href="http://www.reddit.com/submit?url=https%3A%2F%2Fmeaningfulcode.org&title=MeaningfulCode%20-%20Impactful%20open-source"
          target="_blank"
          title="Submit to Reddit"
        >
          <Icon name="reddit" />
          Reddit
        </Button>
      </div>
    </footer>
  );
}

function GetStarted() {
  return (
    <>
      <Header as="h1">Get Started</Header>
      <p>
        Contributing can be daunting at first, but this is the first step of a rewarding
        journey, using your experience to benefit others while learning and meeting new
        passionate people.
      </p>
      <Header as="h2">Every project is different</Header>
      <p>
        Every project is different, so don&apos;t hesitate to look at multiple initiatives
        to find what makes the most sense to you. Look at their project page and website,
        issues tagged &quot;goodfirstissue&quot;, and contact them if you have any
        questions.
      </p>
      <p>
        To have a better idea of how the team works and how to help, you can also check
        the contribution guidelines and past pull requests.
      </p>
      <Header as="h2">You don&apos;t need to be an expert, all support matters</Header>
      <p>
        Depending on your goals and expertise, you may very well find yourself outside of
        your comfort zone. This is perfectly normal, and part of the learning experience.
        As long as you are motivated to learn and help, maintainers of open source
        projects are usually happy to help and guide you, to have your contribution
        integrated.
      </p>
      <p>
        Contributing to the code base is also one of many ways to help: some need support
        translating, improving documentation or tutorials, reviewing, or using it. And the
        simple act of sharing a project with others is also a great way to help.
      </p>
      <Header as="h2">More inspirational guides to get you started</Header>
      If you want to learn more before diving in, these are some great guides to get you
      started:
      <ul>
        <li>
          <a href="https://www.firsttimersonly.com/">
            First timers only: Welcome! Let’s do some open source!
          </a>
        </li>
        <li>
          <a href="https://alistapart.com/article/make-something-great-become-an-open-source-contributor/">
            Make Something Great: Become an Open Source Contributor
          </a>
        </li>
        <li>
          <a href="https://opensource.guide/how-to-contribute/">
            How to Contribute to Open Source
          </a>
        </li>
      </ul>
    </>
  );
}

function About() {
  return (
    <>
      <Header as="h1">Why this website?</Header>
      <p>
        There are many ways to have an impact on our society, and open source is one of
        those. But finding those impactful projects among all is this challenging, and the
        open-source map is changing every day. This website helps you find them: projects
        that matching your aspirations (health, society, environment, ...), and skills.
      </p>
      <p>
        By providing an easier way to find meaningful projects that people truly want to
        contribute to, we hope to accelerate those initiative and their positive impact on
        our society.
      </p>
      <br />
      <Header as="h2">Contact</Header>
      <Button color="teal" as="a" href="https://discord.gg/KPAm7wd7fJ">
        <Icon name="discord" />
        Discord
      </Button>
      <Button
        color="teal"
        as="a"
        href="https://github.com/Meaningful-Code/meaningfulcode-frontend"
      >
        <Icon name="github" />
        GitHub
      </Button>
      <Button color="teal" as="a" href="mailto:contact@meaningfulcode.org">
        <Icon name="discord" />
        Email
      </Button>
      <Header as="h2">Source code</Header>
      <p>
        The source code of this website is hosted on{' '}
        <a href="https://github.com/Meaningful-Code/meaningfulcode-frontend">GitHub</a>,
        contributors are welcome!
      </p>
      <Header as="h2">Author(s)</Header>
      <List relaxed="very">
        <List.Item>
          <Image avatar src="/img/adrien.svg" />
          <List.Content>
            <List.Header>
              <a href="https://www.linkedin.com/in/adrienleravat/">Adrien Leravat</a>
            </List.Header>
            <List.Description>
              Working on embedded software by day, passionate about learning and teaching
              technology.
            </List.Description>
          </List.Content>
        </List.Item>
      </List>
      <br />
      <Header as="h2">
        Thank you! <Emoji label="sparks" symbol="🎉" />
      </Header>
      <p>
        We are standing on the shoulders of giants, countless contributions, and this
        website is no exception. While it would be impossible to list everyone, we wanted
        to thank:
      </p>
      <ul>
        <li>
          John and Hank Green, for being such an inspiration to help others, along with
          many others
        </li>
        <li>
          Fatos Morina, for his article &quot;
          <a href="https://towardsdatascience.com/make-a-social-impact-by-contributing-to-these-open-source-projects-1d6d34e2b8b1">
            Make a social impact by contributing to these open source projects
          </a>
          &quot;, which kickstarted this project
        </li>
        <li>
          <a href="https://github.com/">GitHub</a> and its ecosystem (for hosting all
          these projects for free), <a href="https://www.codetriage.com/">Code triage</a>,
          React, Semantic UI, Isotope and the people behind those.
        </li>
      </ul>
      And more generally, thank you to:
      <ul>
        <li>all open-source developers</li>
        <li>the maintainers of meaningful and open-source projects</li>
        <li>
          those who shared and continue sharing these projects to a broader audience
        </li>
        <li>... and everyone who is giving their time to make a social impact</li>
      </ul>
      <p>We are all forever grateful.</p>
      <br />
      <Header as="h2">Supported by</Header>
      <Image
        as="a"
        alt="alt text"
        size="medium"
        href="https://thefuturistfoundation.com/"
        src="/img/futurist-foundation.png"
      />
    </>
  );
}
