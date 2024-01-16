'use client';

import React from 'react';
import { useRouter, useParams, useSearchParams } from 'next/navigation';

import { Project } from '@/models/Project';
import {
  decodeSearchParams,
  projectsUrlFromState,
  categoryFromParams,
} from './projectUrl';

import HeaderAndMenus from './HeaderAndMenus';
import ProjectsGrid from './ProjectsGrid';
import { SortingAndFilteringHandlers } from './ProjectsSortingMenu';

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

function sortProjects(projects: Project[], sorting: string): Project[] {
  projects.sort((a, b) => {
    switch (sorting) {
      case 'stars':
        return b.stars - a.stars;
      case 'lastCommit':
        return b.lastCommitTimestamp - a.lastCommitTimestamp;
      case 'bookmarked':
        // Handled in ProjectsGrid
        return 0;
      default:
        throw new Error(`Unknown sorting: ${sorting}`);
    }
  });
  return projects;
}

type ProjectsContainerProps = {
  projects: Project[];
  languages: string[];
};

export default function ProjectsContainer(props: ProjectsContainerProps) {
  const { projects, languages } = props;
  const router = useRouter();
  const params = useParams<{ category: string[] }>();
  const searchParams = useSearchParams();
  const category = categoryFromParams(params);
  const { language, search, sorting } = decodeSearchParams(searchParams);

  const filteredProjects =
    category || language || search
      ? filterProjects(projects, category, language, search)
      : projects;
  const sortedProjects = sorting
    ? sortProjects(filteredProjects, sorting)
    : filteredProjects;

  const handlers: SortingAndFilteringHandlers = {
    sortByStars: () => {
      router.push(projectsUrlFromState(category, language, search, 'stars'));
    },
    sortByLastCommit: () => {
      router.push(projectsUrlFromState(category, language, search, 'lastCommit'));
    },
    sortByBookmarked: () => {
      router.push(projectsUrlFromState(category, language, search, 'bookmarked'));
    },
    filterByLanguage: (language) => {
      router.push(projectsUrlFromState(category, language, search, sorting));
    },
    filterBySearch: (search) => {
      router.push(projectsUrlFromState(category, language, search, sorting));
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
        sorting={sorting}
      />
      <ProjectsGrid
        projects={sortedProjects}
        sortByBookmarked={sorting === 'bookmarked'}
      />
    </>
  );
}
