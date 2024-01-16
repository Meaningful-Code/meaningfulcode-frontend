import React from 'react';

import Container from '@mui/material/Container';

import { categories } from '@/models/Project';
import CategoryButton from '@/components/CategoryButton';
import { projectsUrlFromState } from './projectUrl';

import HeaderText from './HeaderText';
import ProjectsSortingMenu, { SortingAndFilteringHandlers } from './ProjectsSortingMenu';

const categoryAll = 'all';
type CategoryButtonsProps = {
  categories: string[];
  category?: string;
  urlTemplate: string;
};

export function CategoryButtons(props: CategoryButtonsProps) {
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

type MenuProps = {
  category: string | null;
  language: string | null;
  languages: string[];
  search: string | null;
  sorting: string | null;
  handlers: SortingAndFilteringHandlers;
};

export default function HeaderAndMenus(props: MenuProps) {
  const { handlers, category, language, languages, search, sorting } = props;
  return (
    <>
      <CategoryButtons
        categories={categories}
        category={category || undefined}
        urlTemplate={projectsUrlFromState(':', language, search, sorting)}
      />
      <HeaderText category={category} />
      <ProjectsSortingMenu
        language={language}
        languages={languages}
        search={search}
        handlers={handlers}
      />
    </>
  );
}
