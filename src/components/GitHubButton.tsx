import React from 'react';

import Button from '@mui/material/Button';
import Link from '@mui/material/Link';

import GitHubIcon from '@mui/icons-material/GitHub';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

type GitHubButtonProps = {
  url: string;
};

export default function GitHubButton(props: GitHubButtonProps) {
  const { url } = props;
  return (
    <Button
      component={Link}
      href={url}
      startIcon={<GitHubIcon />}
      endIcon={<KeyboardArrowRightIcon />}
    >
      GitHub&nbsp;
    </Button>
  );
}
