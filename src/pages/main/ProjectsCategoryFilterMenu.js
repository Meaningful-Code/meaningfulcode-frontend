import React, { useState, Component } from 'react';
import PropTypes from 'prop-types';
import { Container, Button } from 'semantic-ui-react';

import CategoryIcon from './CategoryIcon';

function ProjectsCategoryFilterMenu(props) {
  const { categories, isotopeRef } = props;
  const categoryAll = 'all';
  const allCategories = [categoryAll].concat(categories);
  const [category, setCategory] = useState(categoryAll);

  return (
    <Container className="categories" textAlign="center">
      {allCategories.map((btnCategory) => (
        <FilterButton
          key={btnCategory}
          label={btnCategory}
          active={category === btnCategory}
          onClick={() => {
            setCategory(btnCategory);
            if (isotopeRef.current) {
              const categoryFilter = btnCategory !== categoryAll ? btnCategory : null;
              isotopeRef.current.filterByCategory(categoryFilter);
            }
          }}
        />
      ))}
    </Container>
  );
}

ProjectsCategoryFilterMenu.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  isotopeRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Component) })
  ]).isRequired
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

export default ProjectsCategoryFilterMenu;
