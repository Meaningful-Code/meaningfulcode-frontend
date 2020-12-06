import React from 'react';
import { Button, Header, Icon, Image, List } from 'semantic-ui-react';

import Emoji from '../components/Emoji';

export default function About() {
  return (
    <>
      <Header as="h1">Why this website?</Header>
      <p>
        There are many ways to have an impact on our society, and open source is one of
        those. But finding those impactful projects among all is this challenging, and
        the open-source map is changing every day. This website helps you find them:
        projects that matching your aspirations (health, society, environment, ...), and
        skills.
      </p>
      <p>
        By providing an easier way to find meaningful projects that people truly want to
        contribute to, we hope to accelerate those initiative and their positive impact
        on our society.
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
          these projects for free), <a href="https://www.codetriage.com/">Code triage</a>
          , React, Semantic UI, Isotope and the people behind those.
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
