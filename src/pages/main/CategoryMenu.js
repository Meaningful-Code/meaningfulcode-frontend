import React from 'react';
import PropTypes from 'prop-types';
import { Container, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import CategoryIcon from '../../components/CategoryIcon';

const categoryAll = 'all';
export default function CategoryMenu(props) {
  const { categories, category, urlTemplate } = props;
  const allCategories = [categoryAll].concat(categories);
  return (
    <Container className="categories" textAlign="center">
      {allCategories.map((btnCategory) => (
        <CategoryLink
          key={btnCategory}
          label={btnCategory || 'all'}
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
  const { label, active, targetUrl } = props;

  return (
    <Button as={Link} size="big" className={active ? 'active' : null} to={targetUrl}>
      <CategoryIcon type={label} />
      {label}
    </Button>
  );
}

CategoryLink.propTypes = {
  label: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
  targetUrl: PropTypes.string.isRequired
};
