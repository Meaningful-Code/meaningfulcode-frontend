import React, { createContext } from 'react';
import ProjectsContainer from './ProjectsContainer';

export interface ProjectPageContextInterface {
  projectsViewRef: React.RefObject<ProjectsContainer> | null;
  category: string | null;
  language: string | null;
  languages: string[] | null;
}

export const ProjectPageContext = createContext<ProjectPageContextInterface>({
  projectsViewRef: null,
  category: null,
  language: null,
  languages: null
});
