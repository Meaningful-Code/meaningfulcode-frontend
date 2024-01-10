import React from 'react';
import Link from 'next/link';
import * as MuiLink from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Theme } from '@mui/material/styles';

export default function Logo() {
  const isNotMobile = useMediaQuery((theme: Theme) => theme.breakpoints.up('sm'));
  return (
    <MuiLink.default href="/" component={Link} underline="none">
      <Stack component="h1" className="header" direction="row">
        <img id="logo" src="/meaningfulcode-logo.png" alt="logo" loading="lazy" />
        <Stack>
          <Typography id="title" color="primary">
            Meaningful Code
          </Typography>
          {isNotMobile && (
            <Typography id="subtitle" color="var(--gray)">
              Find Open Source projects, <br />
              contribute, make a difference.
            </Typography>
          )}
        </Stack>
      </Stack>
    </MuiLink.default>
  );
}
