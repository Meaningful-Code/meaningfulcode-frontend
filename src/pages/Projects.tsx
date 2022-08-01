import React, { Component, useContext } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import Grid from '@mui/material/Grid';

import HeaderText from './projects/HeaderText';
import ProjectsContainer from './projects/ProjectsContainer';
import ProjectCard, { ProjectPlaceholder } from './projects/ProjectCard';
import CategoryMenu from './projects/CategoryMenu';
import ProjectsSortingMenu from './projects/ProjectsSortingMenu';
import { Project, categories } from '../models/Project';
import { getProjects } from '../api/ProjectApi';
import { ProjectPageContextInterface, ProjectPageContext } from './projects/Context';

import './projects/Main.css';

const sleep = function (milliseconds: number) {
  // eslint-disable-next-line no-promise-executor-return
  new Promise((resolve) => setTimeout(resolve, milliseconds));
};
const DefaultPageTitle = 'Find Open-source projects with a social impact';

function shuffle(array: any[]) {
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

function PlaceholderProjectsContainer() {
  return (
    <Grid container spacing={2}>
      <ProjectPlaceholder />
      <ProjectPlaceholder />
      <ProjectPlaceholder />
      <ProjectPlaceholder />
      <ProjectPlaceholder />
      <ProjectPlaceholder />
    </Grid>
  );
}

function stateFromUrl(pathname: string, queryString: string) {
  // Schema: meaningfulcode.org/<category>?language=<lang>
  const pathGroups = pathname.split('/', 2);
  const category = pathGroups.length >= 2 ? pathGroups[1] : null;
  const searchParams = new URLSearchParams(queryString);
  const language = searchParams.get('language');

  return { category, language };
}

function urlFromState(category: string | null, language: string | null): string {
  const queryString = language ? `?language=${encodeURIComponent(language)}` : '';
  return `/${category || ''}${queryString}`;
}

type MenuProps = {
  onLanguageChanged: (language: string) => void;
};

function HeaderAndMenus(props: MenuProps) {
  const { onLanguageChanged } = props;
  const pageContext = useContext(ProjectPageContext);

  return (
    <>
      <HeaderText category={pageContext.category} />
      <CategoryMenu
        categories={categories}
        category={pageContext.category || undefined}
        urlTemplate={urlFromState(':', pageContext.language)}
      />
      <ProjectsSortingMenu onLanguageChanged={onLanguageChanged} />
    </>
  );
}

type ProjectPageState = {
  loading: boolean;
  projects: Project[];
  languages: string[];
  category: string | null;
  language: string | null;
};

export class ProjectPage extends Component<RouteComponentProps, ProjectPageState> {
  projectsViewRef: React.RefObject<ProjectsContainer>;

  constructor(props: RouteComponentProps) {
    super(props);
    const { location } = this.props;
    const { category, language } = stateFromUrl(location.pathname, location.search);

    this.state = {
      loading: true,
      projects: [],
      languages: [],
      category,
      language,
    };

    this.projectsViewRef = React.createRef<ProjectsContainer>();
    this.onLanguageChanged = this.onLanguageChanged.bind(this);
  }

  async componentDidMount() {
    this.tryGetProjects();
  }

  componentDidUpdate(prevProps: RouteComponentProps) {
    const { location } = this.props;
    if (location.pathname !== prevProps.location.pathname) {
      const { category } = stateFromUrl(location.pathname, location.search);
      document.title =
        category && category !== 'all'
          ? `${
              category.charAt(0).toUpperCase() + category.slice(1)
            } open-source projects`
          : DefaultPageTitle;

      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        category,
      });
    }
  }

  onLanguageChanged(language: string) {
    const { history } = this.props;
    const { category } = this.state;
    this.setState({ language });
    history.push(urlFromState(category, language));
  }

  setProjects(updatedProjects: any[]) {
    const languagesSet = new Set<string>();
    updatedProjects.forEach((project) => {
      if (project.languages) {
        for (let i = 0; i < project.languages.length && i < 3; i++) {
          languagesSet.add(project.languages[i]);
        }
      }
    });

    this.setState({
      loading: false,
      projects: shuffle(updatedProjects),
      languages: Array.from(languagesSet).sort(),
    });
  }

  async tryGetProjects() {
    let sleepTime = 5000;
    while (true) {
      try {
        // eslint-disable-next-line no-await-in-loop
        const projectsModel = await getProjects();
        this.setProjects(projectsModel);
        break;
      } catch (err) {
        // eslint-disable-next-line no-await-in-loop
        await sleep(sleepTime);
        sleepTime = Math.min(1 + sleepTime * 1.3, 30000);
      }
    }
  }

  render() {
    const { category, language, languages, loading, projects } = this.state;

    if (loading) {
      return (
        <>
          <HeaderAndMenus onLanguageChanged={this.onLanguageChanged} />
          <PlaceholderProjectsContainer />
        </>
      );
    }

    const context: ProjectPageContextInterface = {
      projectsViewRef: this.projectsViewRef,
      category,
      language,
      languages,
    };

    return (
      <ProjectPageContext.Provider value={context}>
        <HeaderAndMenus onLanguageChanged={this.onLanguageChanged} />
        <ProjectsContainer
          ref={this.projectsViewRef}
          category={category}
          language={language}
        >
          {projects.map((project: Project) => (
            <ProjectCard key={project.url} project={project} />
          ))}
        </ProjectsContainer>
      </ProjectPageContext.Provider>
    );
  }
}

export default withRouter(ProjectPage);
