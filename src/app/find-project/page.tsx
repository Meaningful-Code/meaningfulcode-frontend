// 'use server';

import React, { Suspense } from 'react';
import { Metadata } from 'next';
import Link from 'next/link';

import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';

import getHost from '@/utils/getHost';

import FindProjectForm from './FindProjectForm';

export const metadata: Metadata = {
  title: 'Ask and find your project!',
};

export default async function FindProject() {
  return (
    <>
      <Typography variant="h1">Natural language project search</Typography>
      <p>
        This page lets you search for projects using natural language from the same list
        of projects. For a more targeted search, please continue using the{' '}
        <Link href="/">main search page</Link> and its category, language, and search
        filters.
      </p>
      <Alert severity="info">
        This feature is experimental, and the quality of results may vary. We would love
        to hear your <Link href="/about">feedback</Link> if you have time!
      </Alert>
      <br />
      <br />
      <Typography variant="h2">What are you looking for?</Typography>
      <br />
      <Suspense>
        <FindProjectForm host={getHost()} />
      </Suspense>
    </>
  );
}
