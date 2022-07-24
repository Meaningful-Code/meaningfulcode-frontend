import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import CategoryIcon from './CategoryIcon';

export default function CategoryButton(props) {
  const { category, active, targetUrl } = props;

  return (
    <Button
      className={active ? 'active' : null}
      variant={active ? 'contained' : null}
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
      <Typography variant="button" component={active ? 'h1' : ''}>
        {category}
      </Typography>
    </Button>
  );
}

CategoryButton.propTypes = {
  category: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
  targetUrl: PropTypes.string.isRequired
};
