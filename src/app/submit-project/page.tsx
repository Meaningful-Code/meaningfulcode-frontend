import React from 'react';
import { Metadata } from 'next';

import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

import SubmitProjectForm from './SubmitProjectForm';

export const metadata: Metadata = {
  title: 'Submit a project for good',
};

export default function SubmitProject() {
  const ProjectsRepository = 'https://github.com/Meaningful-Code/meaningful-projects';
  const NewProjectIssueLink =
    'https://github.com/Meaningful-Code/meaningfulcode-frontend/issues/new?assignees=&labels=meaningful+project&template=meaningful_project.md&title=Meaningful+project%3A+';
  return (
    <>
      <Typography variant="h1">Submit a project</Typography>
      <p>
        If you have an impactful project that you want to share with the community, you
        can: please submit it here! You can also manually create an to submit your
        project.
      </p>
      <ul>
        <li>
          <Link href={ProjectsRepository}>Create a pull request</Link> directly on GitHub
        </li>
        <li>
          <Link href={NewProjectIssueLink}>Create an issue</Link> on GitHub
        </li>
        <li>Or fill the form below</li>
      </ul>
      <br />
      <SubmitProjectForm />
    </>
  );
}
