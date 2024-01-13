'use client';

import React from 'react';
import {
  useRouter,
  ReadonlyURLSearchParams,
  usePathname,
  useSearchParams,
} from 'next/navigation';
import { Project, categories } from '@/models/Project';

import HeaderText from './HeaderText';
import CategoryMenu from './CategoryMenu';
import Masonry from '@mui/lab/Masonry';
import ProjectCard from './ProjectCard';
import ProjectsSortingMenu from './ProjectsSortingMenu';

function stateFromUrl(pathname: string, searchParams: ReadonlyURLSearchParams) {
  // Schema: meaningfulcode.org/<category>?language=<lang>
  // const pathGroups = pathname.split('/', 3);
  // const category = pathGroups.length >= 3 ? pathGroups[2] : null;
  const category = searchParams.get('category');
  const language = searchParams.get('language');

  return { category, language };
}

function urlFromState(category: string | null, language: string | null): string {
  let queryString = '';

  if (category) {
    queryString += `?category=${category}`;
  }
  if (language) {
    // Add an '&' if queryString already has a '?', otherwise add a '?'
    queryString += queryString.includes('?') ? `&` : `?`;
    queryString += `language=${encodeURIComponent(language)}`;
  }

  // return `/projects/${category || ''}${queryString}`;
  return `/projects${queryString}`;
}

type MenuProps = {
  category: string | null;
  language: string | null;
  languages: string[];
  onLanguageChanged: (language: string) => void;
};

function HeaderAndMenus(props: MenuProps) {
  const { onLanguageChanged, category, language, languages } = props;

  return (
    <>
      <CategoryMenu
        categories={categories}
        category={category || undefined}
        urlTemplate={urlFromState(':', language)}
      />
      <HeaderText category={category} />
      <ProjectsSortingMenu
        onLanguageChanged={onLanguageChanged}
        language={language}
        languages={languages}
      />
    </>
  );
}

type ProjectsContainerProps = {
  projects: Project[];
  languages: string[];
};

export default function ProjectsContainer(props: ProjectsContainerProps) {
  const { projects, languages } = props;
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { category, language } = stateFromUrl(pathname, searchParams);

  function setLanguage(language: string) {
    const url = urlFromState(category, language);
    useRouter().push(url);
  }

  return (
    <>
      <HeaderAndMenus
        onLanguageChanged={setLanguage}
        category={category}
        language={language}
        languages={languages}
      />
      <Masonry columns={3} spacing={2}>
        {projects.map((project) => (
          <ProjectCard key={project.url} project={project} />
        ))}
      </Masonry>
    </>
  );
}
