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

function stateFromUrl(category: string | null, searchParams: ReadonlyURLSearchParams) {
  // Schema: meaningfulcode.org/<category>?language=<lang>
  const language = searchParams.get('language');
  return { category, language };
}

function urlFromState(category: string | null, language: string | null): string {
  const queryString = language ? `?language=${encodeURIComponent(language)}` : '';
  return `/${category || ''}${queryString}`;
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
        language={language}
        languages={languages}
        filterByLanguage={onLanguageChanged}
        filterBySearch={() => {}} // TODO
        sortByBookmarked={() => {}} // TODO
        sortByLastCommit={() => {}} // TODO
        sortByStars={() => {}} // TODO
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
  language: string | null
) {
  const filteredProjects = projects.filter((project) => {
    if (category && category !== 'all') {
      return project.categories.includes(category);
    }
    return true;
  });
  if (language) {
    return filteredProjects.filter((project) => {
      if (project.languages) {
        return project.languages.includes(language);
      }
      return false;
    });
  }
  return filteredProjects;
}

export default function ProjectsContainer(props: ProjectsContainerProps) {
  const router = useRouter();
  const params = useParams<{ category: string }>();
  const { projects, languages } = props;
  const searchParams = useSearchParams();
  const { category, language } = stateFromUrl(params.category, searchParams);

  function setLanguage(language: string) {
    router.push(urlFromState(category, language));
  }

  const filteredProjects = filterProjects(projects, category, language);

  return (
    <>
      <HeaderAndMenus
        onLanguageChanged={setLanguage}
        category={category}
        language={language}
        languages={languages}
      />
      <Masonry columns={3} spacing={2}>
        {filteredProjects.map((project) => (
          <ProjectCard key={project.url} project={project} />
        ))}
      </Masonry>
    </>
  );
}
