import React from 'react';

import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

import getHost from '@/utils/getHost';
import SubmitProjectForm from './SubmitProjectForm';
import { useTranslations } from 'next-intl';

import { getTranslations } from 'next-intl/server';

export async function generateMetadata() {
  const t = await getTranslations('SubmitProject');
  return {
    title: t('metadataTitle'),
  };
}

export default function SubmitProject() {
  const t = useTranslations('SubmitProject');
  const ProjectsRepository = 'https://github.com/Meaningful-Code/meaningful-projects';
  const NewProjectIssueLink =
    'https://github.com/Meaningful-Code/meaningfulcode-frontend/issues/new?assignees=&labels=meaningful+project&template=meaningful_project.md&title=Meaningful+project%3A+';
  return (
    <>
      <Typography variant="h1">{t('title')}</Typography>
      <p>{t('paragraph1')}</p>
      {t.rich('list', {
        ul: (chunks) => <ul>{chunks}</ul>,
        li: (chunks) => <li>{chunks}</li>,
        link1: (chunks) => <Link href={ProjectsRepository}>{chunks}</Link>,
        link2: (chunks) => <Link href={NewProjectIssueLink}>{chunks}</Link>,
      })}
      <br />
      <SubmitProjectForm host={getHost()} />
    </>
  );
}
