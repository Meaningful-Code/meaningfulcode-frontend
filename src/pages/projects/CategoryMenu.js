import React from 'react';
import PropTypes from 'prop-types';

import Container from '@mui/material/Container';

import CategoryButton from '../../components/CategoryButton';

const categoryAll = 'all';
export default function CategoryMenu(props) {
  const { categories, category, urlTemplate } = props;
  const allCategories = [categoryAll].concat(categories);
  return (
    <Container className="categories" sx={{ textAlign: 'center' }}>
      {allCategories.map((btnCategory) => (
        <CategoryButton
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
