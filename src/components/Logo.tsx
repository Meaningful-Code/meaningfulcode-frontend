import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { Box } from '@mui/material';

export default function Logo() {
  return (
    <Link href="/">
      <Stack component="h1" className="header" direction="row">
        <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
          <Image
            src="/meaningfulcode-logo.png"
            alt="logo"
            loading="lazy"
            width={48}
            height={48}
          />
        </Box>
        <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
          <Image
            src="/meaningfulcode-logo.png"
            alt="logo"
            loading="lazy"
            width={96}
            height={96}
          />
        </Box>
        <Stack>
          <Typography id="title" color="primary">
            Meaningful Code
          </Typography>
          <Typography id="subtitle" color="var(--gray)">
            Find Open Source projects, <br />
            contribute, make a difference.
          </Typography>
        </Stack>
      </Stack>
    </Link>
  );
}
