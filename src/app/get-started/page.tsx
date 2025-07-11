import React from 'react';
import { Metadata } from 'next';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata() {
  const t = await getTranslations('GetStarted');
  return {
    title: t('metadataTitle'),
  };
}

export default function GetStarted() {
  const t = useTranslations('GetStarted');
  return (
    <>
      <Typography variant="h1">{t('title')}</Typography>
      <p>{t('paragraph1')}</p>
      <Typography variant="h2">{t('section1.title')}</Typography>
      <p>{t('section1.paragraph1')}</p>
      <p>{t('section1.paragraph2')}</p>
      <Typography variant="h2">{t('section2.title')}</Typography>
      <p>{t('section2.paragraph1')}</p>
      <p>{t('section2.paragraph2')}</p>
      <Typography variant="h2">{t('section3.title')}</Typography>
      {t('section3.intro')}
      {t.rich('section3.list', {
        ul: (chunks) => <ul>{chunks}</ul>,
        li: (chunks) => <li>{chunks}</li>,
        link1: (chunks) => <Link href="https://www.firsttimersonly.com/">{chunks}</Link>,
        link2: (chunks) => (
          <Link href="https://alistapart.com/article/make-something-great-become-an-open-source-contributor/">
            {chunks}
          </Link>
        ),
        link3: (chunks) => (
          <Link href="https://opensource.guide/how-to-contribute/">{chunks}</Link>
        ),
      })}
    </>
  );
}
