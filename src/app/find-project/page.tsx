// 'use server';

import React, { Suspense } from 'react';
import { Metadata } from 'next';
import Typography from '@mui/material/Typography';

import getHost from '@/utils/getHost';

import FindProjectForm from './FindProjectForm';

export const metadata: Metadata = {
  title: 'Ask and find your project!',
};

export default async function FindProject() {
  return (
    <>
      <Typography variant="h1">Find my project!</Typography>
      <p>Ask away, and let the AI agent recommend projects for you to contribute to.</p>
      <Typography variant="h2">I am looking for ...</Typography>
      <br />
      <Suspense>
        <FindProjectForm host={getHost()} />
      </Suspense>
    </>
  );
}
