'use client';

import React from 'react';
import { useRouter, useParams, useSearchParams } from 'next/navigation';
import { Project } from '@/models/Project';
import { projectsStateFromUrl, projectsUrlFromState } from './projectUrl';

import Masonry from '@mui/lab/Masonry';
import ProjectCard from './ProjectCard';
import HeaderAndMenus from './HeaderAndMenus';
import { SortingAndFilteringHandlers } from './ProjectsSortingMenu';

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
  const { category, language, search, sorting } = projectsStateFromUrl(
    params.category,
    searchParams
  );

  const filteredProjects = filterProjects(projects, category, language, search);
  const sortedProjects = filteredProjects.sort((a, b) => {
    if (sorting === 'stars') {
      return b.stars - a.stars;
    } else if (sorting === 'lastCommit') {
      return b.lastCommitTimestamp - a.lastCommitTimestamp;
    }
    // else if (sorting === 'bookmarked') {

    // }
    return 0;
  });

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
      <Masonry columns={3} spacing={2}>
        {sortedProjects.map((project) => (
          <ProjectCard key={project.url} project={project} />
        ))}
      </Masonry>
    </>
  );
}
