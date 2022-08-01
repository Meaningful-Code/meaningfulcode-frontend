import React from 'react';
import { Link } from 'react-router-dom';

import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import CategoryIcon from './CategoryIcon';

type CategoryButtonProps = {
  category: string;
  active: boolean;
  targetUrl: string;
};

export default function CategoryButton(props: CategoryButtonProps) {
  const { category, active, targetUrl } = props;

  return (
    <Button
      className={active ? 'active' : undefined}
      variant={active ? 'contained' : undefined}
      color="primary"
      disableElevation
      component={Link}
      to={targetUrl}
      sx={{
        marginRight: 5,
        paddingLeft: 10
      }}
      startIcon={<CategoryIcon type={category} />}
    >
      {/* @ts-ignore: component prop not properly recognized*/}
      <Typography variant="button" component={active ? 'h1' : undefined}>
        {category}
      </Typography>
    </Button>
  );
}
