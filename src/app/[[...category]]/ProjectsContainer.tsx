'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useParams, useSearchParams } from 'next/navigation';
import Grid from '@mui/material/Grid';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Theme } from '@mui/material/styles';

import { Project } from '@/models/Project';
import { decodeSearchParams, projectsUrlFromState } from './projectUrl';
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

function sortProjects(
  projects: Project[],
  bookmarkedProjects: { [key: string]: boolean },
  sorting: string | null
): Project[] {
  projects.sort((a, b) => {
    if (sorting === 'stars') {
      return b.stars - a.stars;
    } else if (sorting === 'lastCommit') {
      return b.lastCommitTimestamp - a.lastCommitTimestamp;
    } else if (sorting === 'bookmarked') {
      // fitler based on boolean flag
      return bookmarkedProjects[a.url] ? -1 : 1;
    }
    return 0;
  });
  return projects;
}

export default function ProjectsContainer(props: ProjectsContainerProps) {
  const router = useRouter();
  const params = useParams<{ category: string }>();
  const { projects, languages } = props;
  const category = params.category && params.category[0];
  const searchParams = useSearchParams();
  const { language, search, sorting } = decodeSearchParams(searchParams);
  const [bookmarkedProjects, setBookmarkedProjects] = useState<{
    [key: string]: boolean;
  }>({});
  const filteredProjects = filterProjects(projects, category, language, search);
  const sortedProjects = sortProjects(filteredProjects, bookmarkedProjects, sorting);

  const isSmallScreen = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
  const isMediumScreen = useMediaQuery((theme: Theme) =>
    theme.breakpoints.between('sm', 'md')
  );

  let columns;
  if (isSmallScreen) {
    columns = 1;
  } else if (isMediumScreen) {
    columns = 2;
  } else {
    columns = 3;
  }

  useEffect(() => {
    let bookmarkedProjects: { [key: string]: boolean } = {};
    for (let i = 0; i < sortedProjects.length; i++) {
      const project = sortedProjects[i];
      bookmarkedProjects[project.url] =
        localStorage.getItem(`${project.url}.bookmarked`) === '1';
    }
    setBookmarkedProjects(bookmarkedProjects);
    // We should only extract bookmarkedProjects once, no dependencies.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function bookmarkProject(projectUrl: string) {
    const bookmarkKey = `${projectUrl}.bookmarked`;
    const state = Number(localStorage.getItem('bookmarkState') || '0');
    if (!bookmarkedProjects[projectUrl]) {
      localStorage.setItem(bookmarkKey, '1');
      setBookmarkedProjects({ ...bookmarkedProjects, [projectUrl]: true });
    } else {
      localStorage.removeItem(bookmarkKey);
      setBookmarkedProjects({ ...bookmarkedProjects, [projectUrl]: false });
    }
    localStorage.setItem('bookmarkState', String(state + 1));
  }

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
      <Grid container columns={columns} spacing={2} justifyContent={'center'}>
        {sortedProjects.map((project) => (
          <Grid item key={project.url}>
            <ProjectCard
              project={project}
              onBookmarkClick={bookmarkProject}
              bookmarked={bookmarkedProjects[project.url]}
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
}
