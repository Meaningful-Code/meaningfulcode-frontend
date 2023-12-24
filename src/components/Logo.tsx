import React from 'react';

import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Theme } from '@mui/material/styles';
import { Link as RouterLink } from 'react-router-dom';

export default function Logo() {
  const isNotMobile = useMediaQuery((theme: Theme) => theme.breakpoints.up('sm'));
  return (
    <Link to="/" component={RouterLink} underline="none">
      <Stack component="h1" className="header" direction="row">
        <img id="logo" src="/meaningfulcode-logo.png" alt="logo" loading="lazy" />
        <Stack>
          <Typography id="title" color="primary">
            Meaningful Code
          </Typography>
          {isNotMobile && (
            <Typography id="subtitle" color="#808080">
              Find Open Source projects, <br />
              contribute, make a difference.
            </Typography>
          )}
        </Stack>
      </Stack>
    </Link>
  );
}
