import React from 'react';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Skeleton from '@mui/material/Skeleton';

export default function ProjectPlaceholder() {
  return (
    <Grid item xs={4} className="project-item">
      <Card raised sx={{ padding: '1em' }}>
        <Skeleton />
        <Skeleton sx={{ marginBottom: '2em' }} />
        <Skeleton width="75%" />
        <Skeleton width="60%" />
        <Skeleton width="70%" sx={{ marginBottom: '1em' }} />
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton width="60%" sx={{ marginBottom: '2em' }} />
      </Card>
    </Grid>
  );
}
