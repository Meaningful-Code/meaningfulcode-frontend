import React from 'react';
import type { Metadata } from 'next';

import shuffle from '@/utils/shuffle';
import { Project, categories } from '@/models/Project';
import getProjects from './getProjects';
import ProjectsContainer from './ProjectsContainer';
import { categoryFromParams } from './projectUrl';

import './style.css';

type Props = {
  params: { category: string[] };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateStaticParams() {
  let routes: {}[] = categories.map((category) => {
    return [{ category: category }];
  });
  routes.push([{ category: 'all' }]);
  routes.push([{}]);
  return routes;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const DefaultPageTitle = 'Find Open-source projects with a social impact';
  const category = categoryFromParams(params);
  return {
    title: category
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
  projects = projects.filter((project) => {
    const nowInSeconds = Date.now() / 1000;
    return project.lastCommitTimestamp > nowInSeconds - 6 * 30 * 24 * 60 * 60;
  });
  shuffle(projects);
  const languages = Array.from(getLanguageSet(projects));
  return <ProjectsContainer projects={projects} languages={languages} />;
}
