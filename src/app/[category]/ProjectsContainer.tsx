'use client';

import React from 'react';
import {
  useRouter,
  ReadonlyURLSearchParams,
  useParams,
  useSearchParams,
} from 'next/navigation';
import { Project, categories } from '@/models/Project';

import HeaderText from './HeaderText';
import CategoryMenu from './CategoryMenu';
import Masonry from '@mui/lab/Masonry';
import ProjectCard from './ProjectCard';
import ProjectsSortingMenu from './ProjectsSortingMenu';
import { SortingAndFilteringHandlers } from './ProjectsSortingMenu';

function stateFromUrl(category: string | null, searchParams: ReadonlyURLSearchParams) {
  // Schema: meaningfulcode.org/<category>?language=<lang>
  const language = searchParams.get('language');
  const search = searchParams.get('search');
  return { category, language, search };
}

function urlFromState(
  category: string | null,
  language: string | null,
  search: string | null
): string {
  const params = new URLSearchParams();
  if (language) {
    params.append('language', language);
  }
  if (search) {
    params.append('search', search);
  }
  const queryString = params.toString();
  return `/${category || ''}${queryString ? `?${queryString}` : ''}`;
}

type MenuProps = {
  category: string | null;
  language: string | null;
  languages: string[];
  search: string | null;
  handlers: SortingAndFilteringHandlers;
};

function HeaderAndMenus(props: MenuProps) {
  const { handlers, category, language, languages, search } = props;

  return (
    <>
      <CategoryMenu
        categories={categories}
        category={category || undefined}
        urlTemplate={urlFromState(':', language, search)}
      />
      <HeaderText category={category} />
      <ProjectsSortingMenu
        language={language}
        languages={languages}
        handlers={handlers}
      />
    </>
  );
}

type ProjectsContainerProps = {
  projects: Project[];
  languages: string[];
};

function filterProjects(
  projects: Project[],
  category: string | null,
  language: string | null,
  search: string | null
): Project[] {
  const searchLowered = search?.toLowerCase();
  return projects.filter((project) => {
    if (category && category !== 'all' && !project.categories.includes(category)) {
      return false;
    }
    if (language && !project.languages?.includes(language)) {
      return false;
    }
    if (searchLowered) {
      return (
        project.owner.toLowerCase().includes(searchLowered) ||
        project.name.toLowerCase().includes(searchLowered) ||
        project.description?.toLowerCase().includes(searchLowered)
      );
    }
    return true;
  });
}

export default function ProjectsContainer(props: ProjectsContainerProps) {
  const router = useRouter();
  const params = useParams<{ category: string }>();
  const { projects, languages } = props;
  const searchParams = useSearchParams();
  const { category, language, search } = stateFromUrl(params.category, searchParams);

  const filteredProjects = filterProjects(projects, category, language, search);

  const handlers: SortingAndFilteringHandlers = {
    sortByStars: () => {},
    sortByLastCommit: () => {},
    sortByBookmarked: () => {},
    filterByLanguage: (language) => {
      router.push(urlFromState(category, language, search));
    },
    filterBySearch: (search) => {
      router.push(urlFromState(category, language, search));
    },
  };

  return (
    <>
      <HeaderAndMenus
        handlers={handlers}
        category={category}
        language={language}
        languages={languages}
        search={search}
      />
      <Masonry columns={3} spacing={2}>
        {filteredProjects.map((project) => (
          <ProjectCard key={project.url} project={project} />
        ))}
      </Masonry>
    </>
  );
}
