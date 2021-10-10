import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Container, Button } from 'semantic-ui-react';

import CategoryIcon from './CategoryIcon';

const categoryAll = '';
export default function CategoryFilterMenu(props) {
  const { categories, onCategorySelected, initialCategory } = props;
  const [category, setCategory] = useState(initialCategory);
  const allCategories = [categoryAll].concat(categories);
  return (
    <Container className="categories" textAlign="center">
      {allCategories.map((btnCategory) => (
        <FilterButton
          key={btnCategory}
          label={btnCategory || 'all'}
          active={category === btnCategory}
          onClick={() => {
            setCategory(btnCategory);
            onCategorySelected(btnCategory);
          }}
        />
      ))}
    </Container>
  );
}

CategoryFilterMenu.propTypes = {
  initialCategory: PropTypes.string,
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  onCategorySelected: PropTypes.func.isRequired
};

CategoryFilterMenu.defaultProps = {
  initialCategory: categoryAll
};

function FilterButton(props) {
  const { label, active, onClick } = props;

  return (
    <Button as="h2" size="big" className={active ? 'active' : null} onClick={onClick}>
      <CategoryIcon type={label} />
      {label}
    </Button>
  );
}

FilterButton.propTypes = {
  label: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired
};
