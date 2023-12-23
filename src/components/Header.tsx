import React from 'react';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { Link as RouterLink } from 'react-router-dom';

import useMinimalGaTracker from '../components/useMinimalGaTracker';

export default function PageHeader() {
  useMinimalGaTracker();
  return (
    <header>
      <Grid container spacing={2}>
        <Grid item sm={12} md={6}>
          <Link to="/" component={RouterLink} underline="none">
            <Stack component="h1" className="header" direction="row">
              <img id="logo" src="/meaningfulcode-logo.png" alt="logo" loading="lazy" />
              <Stack>
                <Typography id="title" color="primary">
                  Meaningful Code
                </Typography>
                {/* Workaround custom palette color typo issue */}
                <Typography color="#808080">
                  Find Open Source projects, <br />
                  contribute, make a difference.
                </Typography>
              </Stack>
            </Stack>
          </Link>
        </Grid>
        <Grid item id="links" sm={12} md={6}>
          <Stack component="nav" direction="row" justifyContent="flex-end" spacing={1}>
            <Button
              id="addProject"
              variant="contained"
              disableElevation
              component={RouterLink}
              to="submit-project"
            >
              Add a project!
            </Button>
            <Button
              variant="outlined"
              /* @ts-ignore: color type not properly recognized */
              color="neutral"
              component={RouterLink}
              to="/get-started"
            >
              Get started
            </Button>
            <Button
              variant="outlined"
              /* @ts-ignore: color type not properly recognized */
              color="neutral"
              component={RouterLink}
              to="/about"
            >
              About
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </header>
  );
}
