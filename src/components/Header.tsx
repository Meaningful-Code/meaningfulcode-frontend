'use client';

import React, { useState } from 'react';

import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MenuIcon from '@mui/icons-material/Menu';
import Link from 'next/link';

// import useMinimalGaTracker from '../components/useMinimalGaTracker';
import MobileMenu from './MobileMenu';
import Logo from './Logo';

function HeaderLinks() {
  return (
    <>
      <Button
        id="addProject"
        variant="outlined"
        disableElevation
        component={Link}
        href="/submit-project"
      >
        Add a project!
      </Button>
      <Button
        /* @ts-ignore: color type not properly recognized */
        color="neutral"
        component={Link}
        href="/get-started"
      >
        Get started
      </Button>
      <Button
        /* @ts-ignore: color type not properly recognized */
        color="neutral"
        component={Link}
        href="/about"
      >
        About
      </Button>
    </>
  );
}

export default function PageHeader() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <header>
      <Grid container spacing={2}>
        <Grid item xs={10} sm={6}>
          <Logo />
        </Grid>
        <Grid item xs={2} sx={{ display: { xs: 'block', sm: 'none' } }}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleDrawerToggle}
          >
            <MenuIcon />
          </IconButton>
        </Grid>
        <Grid item sm={6} sx={{ display: { xs: 'none', sm: 'block' } }}>
          <Stack component="nav" direction="row" justifyContent="flex-end" spacing={1}>
            <HeaderLinks />
          </Stack>
        </Grid>
      </Grid>
      <Drawer anchor="left" open={drawerOpen} onClose={handleDrawerToggle}>
        <Box
          role="presentation"
          onClick={handleDrawerToggle}
          onKeyDown={handleDrawerToggle}
        >
          <MobileMenu />
        </Box>
      </Drawer>
    </header>
  );
}
