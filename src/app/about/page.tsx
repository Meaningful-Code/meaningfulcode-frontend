import React from 'react';
import { Metadata } from 'next';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import EmailIcon from '@mui/icons-material/Email';
import GitHubIcon from '@mui/icons-material/GitHub';
import MarkChatUnreadIcon from '@mui/icons-material/MarkChatUnread';

import Emoji from '@/components/Emoji';

export const metadata: Metadata = {
  title: 'About Meaningfulcode.org',
};

export default function About() {
  return (
    <div id="about">
      <Typography variant="h1">Why this website?</Typography>
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
      <Typography variant="h2">Reach out</Typography>
      <Button
        variant="outlined"
        href="https://discord.gg/KPAm7wd7fJ"
        disableElevation
        color="secondary"
        startIcon={<MarkChatUnreadIcon />}
      >
        Discord
      </Button>
      <Button
        variant="outlined"
        href="mailto:contact@meaningfulcode.org"
        disableElevation
        color="secondary"
        startIcon={<EmailIcon />}
      >
        Email
      </Button>
      <Typography variant="h2">Get the source</Typography>
      <Button
        variant="outlined"
        href="https://github.com/Meaningful-Code/meaningfulcode-frontend"
        disableElevation
        color="secondary"
        startIcon={<GitHubIcon />}
      >
        GitHub
      </Button>
      <p>Contributors are welcome, and source is licensed under GPL-3.0:</p>
      <ul>
        <li>
          The source code of the fronted is available on{' '}
          <Link href="https://github.com/Meaningful-Code/meaningfulcode-frontend">
            the Frontend repository
          </Link>
        </li>
        <li>
          The static list of projects is available on{' '}
          <Link href="https://github.com/Meaningful-Code/meaningful-projects">
            the Projects repository
          </Link>
        </li>
        <li>
          The backend is available to internal contributors, but not open-source yet for
          security reasons
        </li>
      </ul>
      <Typography variant="h2">
        Thank you! <Emoji label="sparks" symbol="🎉" />
      </Typography>
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
          <Link href="https://towardsdatascience.com/make-a-social-impact-by-contributing-to-these-open-source-projects-1d6d34e2b8b1">
            Make a social impact by contributing to these open source projects
          </Link>
          &quot;, which kickstarted this project
        </li>
        <li>
          <Link href="https://github.com/">GitHub</Link> and its ecosystem (for hosting
          all these projects for free),{' '}
          <Link href="https://www.codetriage.com/">Code triage</Link>, React, MUI,
          Isotope and the people behind those.
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
      <Typography variant="h2">People</Typography>
      <List>
        <ListItem>
          <ListItemAvatar>
            <Avatar alt="Adrien Leravat" src="/img/adrien.svg" />
          </ListItemAvatar>
          <ListItemText
            primary={
              <Link href="https://www.linkedin.com/in/adrienleravat/">
                Adrien Leravat
              </Link>
            }
            secondary="Working on embedded software by day, passionate about learning and teaching
            technology. Feel free to get in touch!"
          />
        </ListItem>
      </List>
    </div>
  );
}
