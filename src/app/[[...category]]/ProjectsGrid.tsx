import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';

import { Project } from '@/models/Project';
import ProjectCard from './ProjectCard';

type ProjectsGridProps = {
  projects: Project[];
  sortByBookmarked: boolean | null;
};

export default function ProjectsGrid(props: ProjectsGridProps) {
  const { projects, sortByBookmarked } = props;
  const [bookmarkedProjects, setBookmarkedProjects] = useState<{
    [key: string]: boolean;
  }>({});
  const sortedProjects = sortByBookmarked ? sortBookmarked(projects) : projects;

  useEffect(() => {
    let bookmarkedProjects: { [key: string]: boolean } = {};
    for (let i = 0; i < projects.length; i++) {
      const project = projects[i];
      bookmarkedProjects[project.url] =
        localStorage.getItem(`${project.url}.bookmarked`) === '1';
    }
    setBookmarkedProjects(bookmarkedProjects);
  }, [projects]);

  function sortBookmarked(projects: Project[]): Project[] {
    projects.sort((a, b) => {
      if (bookmarkedProjects[a.url] && !bookmarkedProjects[b.url]) {
        return -1;
      }
      if (!bookmarkedProjects[a.url] && bookmarkedProjects[b.url]) {
        return 1;
      }
      return 0;
    });
    return projects;
  }

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

  return (
    <Grid container spacing={2} justifyContent={'center'}>
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
  );
}
