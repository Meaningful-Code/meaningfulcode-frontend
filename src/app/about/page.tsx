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
import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata() {
  const t = await getTranslations('About');
  return {
    title: t('metadataTitle'),
  };
}

export default function About() {
  const t = useTranslations('About');
  return (
    <div id="about">
      <Typography variant="h1">{t('title')}</Typography>
      <p>{t('paragraph1')}</p>
      <p>{t('paragraph2')}</p>
      <Typography variant="h2">{t('reachOut.title')}</Typography>
      <Button
        variant="outlined"
        href="https://discord.gg/KPAm7wd7fJ"
        disableElevation
        color="secondary"
        startIcon={<MarkChatUnreadIcon />}
      >
        {t('reachOut.discord')}
      </Button>
      <Button
        variant="outlined"
        href="mailto:contact@meaningfulcode.org"
        disableElevation
        color="secondary"
        startIcon={<EmailIcon />}
      >
        {t('reachOut.email')}
      </Button>
      <Typography variant="h2">{t('source.title')}</Typography>
      <Button
        variant="outlined"
        href="https://github.com/Meaningful-Code/meaningfulcode-frontend"
        disableElevation
        color="secondary"
        startIcon={<GitHubIcon />}
      >
        {t('source.github')}
      </Button>
      <p>{t('source.note')}</p>
      <ul>
        <li>
          {t.rich('source.item1', {
            linkFrontend: (chunks) => (
              <Link href="https://github.com/Meaningful-Code/meaningfulcode-frontend">
                {chunks}
              </Link>
            ),
          })}
        </li>
        <li>
          {t.rich('source.item2', {
            linkProjects: (chunks) => (
              <Link href="https://github.com/Meaningful-Code/meaningful-projects">
                {chunks}
              </Link>
            ),
          })}
        </li>
        <li>{t('source.item3')}</li>
      </ul>
      <Typography variant="h2">
        {t.rich('thanks.title', {
          emoji: () => <Emoji label="sparks" symbol="🎉" />,
        })}
      </Typography>
      <p>{t('thanks.paragraph1')}</p>
      <ul>
        <li>{t('thanks.item1')}</li>
        <li>
          {t.rich('thanks.item2', {
            linkArticle: (chunks) => (
              <Link href="https://towardsdatascience.com/make-a-social-impact-by-contributing-to-these-open-source-projects-1d6d34e2b8b1">
                {chunks}
              </Link>
            ),
          })}
        </li>
        <li>
          {t.rich('thanks.item3', {
            linkGitHub: (chunks) => <Link href="https://github.com/">{chunks}</Link>,
            linkTriage: (chunks) => (
              <Link href="https://www.codetriage.com/">{chunks}</Link>
            ),
          })}
        </li>
      </ul>
      {t('thanks.moreThanksIntro')}
      <ul>
        <li>{t('thanks.item4')}</li>
        <li>{t('thanks.item5')}</li>
        <li>{t('thanks.item6')}</li>
        <li>{t('thanks.item7')}</li>
      </ul>
      <p>{t('thanks.closing')}</p>
      <Typography variant="h2">{t('people.title')}</Typography>
      <List>
        <ListItem>
          <ListItemAvatar>
            <Avatar alt="Adrien Leravat" src="/img/adrien.svg" />
          </ListItemAvatar>
          <ListItemText
            primary={
              <Link href="https://www.linkedin.com/in/adrienleravat/">
                {t('people.adrien.name')}
              </Link>
            }
            secondary={t('people.adrien.bio')}
          />
        </ListItem>
      </List>
    </div>
  );
}
