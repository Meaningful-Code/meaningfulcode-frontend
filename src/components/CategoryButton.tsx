import React from 'react';
import Link from 'next/link';

import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';

import CategoryIcon, { getCategoryMuiColor } from './CategoryIcon';

type CategoryButtonProps = {
  category: string;
  active: boolean;
  targetUrl: string;
};

export default function CategoryButton(props: CategoryButtonProps) {
  const { category, active, targetUrl } = props;
  const theme = useTheme();

  const getTextColor = () => {
    if (theme.palette.mode === 'light') {
      return active ? theme.palette.common.white : theme.palette.common.black;
    } else {
      return theme.palette.common.white;
    }
  };

  return (
    <Button
      className={active ? 'active' : undefined}
      variant={active ? 'contained' : 'outlined'}
      disableElevation
      component={Link}
      /* @ts-ignore: color type not properly recognized */
      color={getCategoryMuiColor(category)}
      href={targetUrl}
      sx={{
        color: getTextColor(),
        marginRight: 5,
        paddingLeft: 10,
      }}
      startIcon={<CategoryIcon type={category} inverted={!active} />}
    >
      {/* @ts-ignore: component prop not properly recognized*/}
      <Typography variant="button" component={active ? 'h1' : undefined}>
        {category}
      </Typography>
    </Button>
  );
}
