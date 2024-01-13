import React from 'react';
import type { Metadata } from 'next';

import { Project } from '../../models/Project';
import { getProjects } from './ProjectApi';
import ProjectsContainer from './ProjectsContainer';

import './Main.css';

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

const DefaultPageTitle = 'Find Open-source projects with a social impact';

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  searchParams;
  const category = searchParams.category;
  const hasCategory = category && typeof category === 'string' && category !== 'all';
  return {
    title: hasCategory
      ? `${category.charAt(0).toUpperCase() + category.slice(1)} open-source projects`
      : DefaultPageTitle,
  };
}

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
