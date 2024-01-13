import React from 'react';
import type { Metadata } from 'next';

import { Project } from '../../models/Project';
import { getProjects } from './ProjectApi';
import ProjectsContainer from './ProjectsContainer';

import './Main.css';
import shuffle from '@/utils/shuffle';

type Props = {
  params: { category: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

const DefaultPageTitle = 'Find Open-source projects with a social impact';

export async function generateMetadata({
  params,
  searchParams,
}: Props): Promise<Metadata> {
  searchParams;
  const category = params.category;
  const hasCategory = category && category !== 'all';
  return {
    title: hasCategory
      ? `${category.charAt(0).toUpperCase() + category.slice(1)} open-source projects`
      : DefaultPageTitle,
  };
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
  projects = shuffle(projects);
  const languages = Array.from(getLanguageSet(projects));

  return (
    <>
      <ProjectsContainer projects={projects} languages={languages} />
    </>
  );
  // }
}
