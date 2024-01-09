import React from 'react';

import Container from '@mui/material/Container';

import CategoryButton from '../../components/CategoryButton';

const categoryAll = 'all';
type CategoryMenuProps = {
  categories: string[];
  category?: string;
  urlTemplate: string;
};

export default function CategoryMenu(props: CategoryMenuProps) {
  const { categories, category = categoryAll, urlTemplate } = props;
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
