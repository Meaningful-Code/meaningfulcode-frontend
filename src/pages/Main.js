import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Grid } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import qs from 'qs';

import HeaderText from './main/HeaderText';
import ProjectsContainer from './main/ProjectsContainer';
import ProjectCard, { ProjectPlaceholder } from './main/ProjectCard';
import CategoryMenu from './main/CategoryMenu';
import ProjectsSortingMenu from './main/ProjectsSortingMenu';
import getProjects, { categories } from '../projects/projects';

import './main/Main.css';

const sleep = (milliseconds) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

function shuffle(array) {
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
    <Grid style={{ margin: '0 60px' }} columns={3} stackable>
      <ProjectPlaceholder />
      <ProjectPlaceholder />
      <ProjectPlaceholder />
      <ProjectPlaceholder />
      <ProjectPlaceholder />
      <ProjectPlaceholder />
    </Grid>
  );
}

function stateFromUrl(pathname, queryString) {
  // Schema: meaningfulcode.org/<category>?language=<lang>
  const pathGroups = pathname.split('/', 2);
  const category = pathGroups.length >= 2 ? pathGroups[1] : null;

  const { language } = qs.parse(queryString, {
    ignoreQueryPrefix: true
  });

  return {
    category,
    language
  };
}

function urlFromState(category, language) {
  const queryString = language ? `?language=${encodeURIComponent(language)}` : '';
  return `/${category}${queryString}`;
}

export class ProjectPage extends Component {
  constructor(props) {
    super(props);
    const { location } = this.props;
    const { category, language } = stateFromUrl(location.pathname, location.search);

    this.state = {
      loading: true,
      projects: [],
      languages: [],
      category,
      language
    };

    this.isotopeRef = React.createRef();
    this.onLanguageChanged = this.onLanguageChanged.bind(this);
  }

  async componentDidMount() {
    this.tryGetProjects();
  }

  componentDidUpdate(prevProps) {
    const { location } = this.props;
    if (location.pathname !== prevProps.location.pathname) {
      const { category } = stateFromUrl(location.pathname, location.search);
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        category
      });
    }
  }

  onLanguageChanged(language) {
    const { history } = this.props;
    const { category } = this.state;
    this.setState({ language });
    history.push(urlFromState(category, language));
  }

  setProjects(updatedProjects) {
    const languagesSet = new Set();
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
      languages: Array.from(languagesSet).sort()
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

  headerAndMenus() {
    const { category, languages, language } = this.state;

    return (
      <>
        <HeaderText category={category} />
        <CategoryMenu
          categories={categories}
          category={category}
          urlTemplate={urlFromState(':', language)}
        />
        <ProjectsSortingMenu
          isotopeRef={this.isotopeRef}
          languages={languages}
          language={language}
          onLanguageChanged={this.onLanguageChanged}
        />
      </>
    );
  }

  render() {
    const { category, language, loading, projects } = this.state;

    if (loading) {
      return (
        <>
          {this.headerAndMenus()}
          <PlaceholderProjectsContainer />
        </>
      );
    }

    return (
      <>
        {this.headerAndMenus()}
        <ProjectsContainer ref={this.isotopeRef} category={category} language={language}>
          {projects.map((project) => (
            <ProjectCard key={project.url} project={project} />
          ))}
        </ProjectsContainer>
      </>
    );
  }
}

ProjectPage.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  location: PropTypes.object.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  history: PropTypes.object.isRequired
};

export default withRouter(ProjectPage);
