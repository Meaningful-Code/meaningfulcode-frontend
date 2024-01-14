import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Theme } from '@mui/material/styles';

export default function Logo() {
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
  return (
    <Link href="/">
      <Stack component="h1" className="header" direction="row">
        <Image
          id="logo"
          src="/meaningfulcode-logo.png"
          alt="logo"
          loading="lazy"
          width={isMobile ? 48 : 96}
          height={isMobile ? 48 : 96}
        />
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
