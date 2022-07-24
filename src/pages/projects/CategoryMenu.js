import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import CategoryIcon from '../../components/CategoryIcon';

const categoryAll = 'all';
export default function CategoryMenu(props) {
  const { categories, category, urlTemplate } = props;
  const allCategories = [categoryAll].concat(categories);
  return (
    <Container className="categories" sx={{ textAlign: 'center' }}>
      {allCategories.map((btnCategory) => (
        <CategoryLink
          key={btnCategory}
          category={btnCategory || 'all'}
          active={category === btnCategory}
          targetUrl={urlTemplate.replace(':', btnCategory)}
        />
      ))}
    </Container>
  );
}

CategoryMenu.propTypes = {
  category: PropTypes.string,
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  urlTemplate: PropTypes.string.isRequired
};

CategoryMenu.defaultProps = {
  category: categoryAll
};

function CategoryLink(props) {
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
      {category}
    </Button>
  );
}

CategoryLink.propTypes = {
  category: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
  targetUrl: PropTypes.string.isRequired
};
