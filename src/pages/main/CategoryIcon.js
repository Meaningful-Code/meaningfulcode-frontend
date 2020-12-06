import React from 'react';
import PropTypes from 'prop-types';
import { Icon, List } from 'semantic-ui-react';

function getCategoryColor(type) {
  switch (type) {
    case 'all':
      return 'black';
    case 'environment':
      return 'green';
    case 'humanitarian':
      return 'orange';
    case 'accessibility':
      return 'blue';
    case 'society':
      return 'violet';
    case 'health':
      return 'teal';
    case 'education':
      return 'red';
    case 'justice':
      return 'yellow';
    default:
      return 'black';
  }
}

function getCategoryIconName(type) {
  switch (type) {
    case 'all':
      return 'question';
    case 'environment':
      return 'leaf';
    case 'humanitarian':
      return 'food';
    case 'accessibility':
      return 'handicap';
    case 'society':
      return 'transgender alternate';
    case 'health':
      return 'dna';
    case 'education':
      return 'book';
    case 'justice':
      return 'balance scale';
    default:
      return 'question';
  }
}

function CategoryIcon(props) {
  const { type } = props;

  return (
    <Icon
      circular
      inverted
      color={getCategoryColor(type)}
      name={getCategoryIconName(type)}
    />
  );
}

CategoryIcon.propTypes = {
  type: PropTypes.string.isRequired
};

function CategoryListIcon(props) {
  const { type } = props;

  return (
    <List.Icon
      circular
      inverted
      color={getCategoryColor(type)}
      name={getCategoryIconName(type)}
    />
  );
}

CategoryListIcon.propTypes = {
  type: PropTypes.string.isRequired
};

export default CategoryIcon;
export { CategoryListIcon };
