import React, { Component } from 'react';
import { Container, Grid, Responsive } from 'semantic-ui-react';

import ProjectsContainer from './main/ProjectsContainer';
import ProjectCard, { ProjectPlaceholder } from './main/ProjectCard';
import ProjectsCategoryFilterMenu from './main/ProjectsCategoryFilterMenu';
import ProjectsSortingMenu from './main/ProjectsSortingMenu';

import './main/Main.css';

const sleep = (milliseconds) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

function sampleProjects() {
  return [
    {
      name: 'Project A',
      owner: 'Octocat',
      categories: ['humanitarian'],
      languages: ['Python', 'HTML'],
      stars: '120',
      description: 'Description text that will likely span on multiple lines.',
      url: 'https://github.com/project-a',
      websiteUrl: 'https://websitea.com',
      lastCommitTimestamp: '1607894587'
    },
    {
      name: 'Project B',
      owner: 'Octocow',
      categories: ['health'],
      languages: ['Python', 'HTML'],
      stars: '13',
      description: 'Description text that will likely span on multiple lines.',
      url: 'https://github.com/project-b',
      websiteUrl: 'https://websiteb.com',
      lastCommitTimestamp: '1607824587'
    },
    {
      name: 'Project C',
      owner: 'Octocrow',
      categories: ['health'],
      languages: ['Python', 'HTML'],
      stars: '1200',
      description: 'Description text that will likely span on multiple lines.',
      url: 'https://github.com/project-c',
      websiteUrl: 'https://websitec.com',
      lastCommitTimestamp: '1607124587'
    },
    {
      name: 'Project D',
      owner: 'Octocus',
      categories: ['environment'],
      languages: ['C++'],
      stars: '320',
      description:
        'Description text that will likely span on multiple lines. Description text that will likely span on multiple lines. Description text that will likely span on multiple lines. Description text that will likely span on multiple lines. Description text that will likely span on multiple lines. Description text that will likely span on multiple lines. Description text that will likely span on multiple lines.',
      url: 'https://github.com/project-d',
      websiteUrl: 'https://websited.com',
      lastCommitTimestamp: '1607824117'
    },
    {
      name: 'Project E',
      owner: 'Octocrate',
      categories: ['environment'],
      languages: ['C++', 'Bash'],
      stars: '560',
      description: 'Description text that will likely span on multiple lines.',
      url: 'https://github.com/project-e',
      websiteUrl: 'https://websited.com',
      lastCommitTimestamp: '1507824117'
    },
    {
      name: 'Project F',
      owner: 'Octocanister-barista',
      categories: ['society'],
      languages: ['C', 'Go', 'Makefile', 'Dockerfile'],
      stars: '4201',
      description: 'Description text that will likely span on multiple lines.',
      url: 'https://github.com/project-f',
      websiteUrl: 'https://websitef.com',
      lastCommitTimestamp: '1587824117'
    }
  ];
}

async function getProjects() {
  if (process.env.REACT_APP_FORCE_API === 'stub') {
    return sampleProjects();
  }

  let getProjectsApiUrl = '/api/projects';
  if (process.env.REACT_APP_FORCE_API === 'prod') {
    const proxyurl = 'https://cors-anywhere.herokuapp.com/';
    const url = 'https://meaningfulcode.org/api/projects';
    getProjectsApiUrl = proxyurl + url;
  }

  const res = await fetch(getProjectsApiUrl);
  const updatedProjects = await res.text();
  if (!res.ok) {
    const error = `An error occured calling "${getProjectsApiUrl}": ${res.statusText}`;
    throw new Error(error);
  }

  return JSON.parse(updatedProjects);
}
function categories() {
  return ['health', 'education', 'environment', 'society', 'humanitarian'];
}

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
export default class ProjectView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      projects: [],
      languages: []
    };

    this.isotopeRef = React.createRef();
  }

  async componentDidMount() {
    this.tryGetProjects();
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
    const { languages } = this.state;

    return (
      <>
        <IntroductionText />
        <ProjectsCategoryFilterMenu
          isotopeRef={this.isotopeRef}
          categories={categories()}
        />
        <ProjectsSortingMenu isotopeRef={this.isotopeRef} languages={languages} />
      </>
    );
  }

  render() {
    const { loading, projects } = this.state;

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
        <ProjectsContainer ref={this.isotopeRef}>
          {projects.map((project) => (
            <ProjectCard key={project.url} project={project} />
          ))}
        </ProjectsContainer>
      </>
    );
  }
}

function IntroductionText() {
  return (
    <>
      <Responsive as={Container} maxWidth={991}>
        <p>
          <b>Pick a cause to support</b>, and <b>find Open Source projects</b> willing to
          make our world better. From the environment to health and humanitarian, we
          believe that <b>code can make a difference</b> when contributed to the right
          projects.
        </p>
      </Responsive>
      <Responsive as={Container} minWidth={992}>
        <p style={{ textAlign: 'center', margin: '0 5em', fontSize: '20px' }}>
          <b>Pick a cause to support</b>, and <b>find Open Source projects</b> willing to
          make our world better. <br />
          From the environment to health, accessibility, and humanitarian, we believe
          that <b>code can make a difference</b> when contributed to the right projects.
        </p>
      </Responsive>
    </>
  );
}
