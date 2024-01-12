import React from 'react';

import { Project } from '../../models/Project';
import { getProjects } from './ProjectApi';
import ProjectsContainer from './ProjectsContainer';

import './Main.css';

function shuffleProjects(array: Project[]): Project[] {
  let i = array.length - 1;
  for (; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    // eslint-disable-next-line no-param-reassign
    array[i] = array[j];
    // eslint-disable-next-line no-param-reassign
    array[j] = temp;
  }
  return array;
}

function getLanguageSet(projects: Project[]): Set<string> {
  const languagesSet = new Set<string>();
  projects.forEach((project) => {
    if (project.languages) {
      for (let i = 0; i < project.languages.length && i < 3; i++) {
        languagesSet.add(project.languages[i]);
      }
    }
  });
  return languagesSet;
}

export default async function ProjectPage() {
  let projects = await getProjects();
  projects = shuffleProjects(projects);
  const languages = Array.from(getLanguageSet(projects));

  return (
    <>
      <ProjectsContainer projects={projects} languages={languages} />
    </>
  );
  // }
}
