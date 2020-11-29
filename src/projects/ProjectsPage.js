import React, { Component } from 'react';
import { Container, Grid, Responsive } from 'semantic-ui-react'

import ProjectsContainer from './ProjectsContainer';
import ProjectCard, { ProjectPlaceholder } from './ProjectCard';
import ProjectsCategoryFilterMenu from './ProjectsCategoryFilterMenu'
import ProjectsSortingMenu from './ProjectsSortingMenu';

const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}

export default class ProjectView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      projects: undefined
    }

    this.isotopeRef = React.createRef()
  }

  async componentDidMount() {
    this.tryGetProjects()
  }

  setProjects(updatedProjects) {
    let languagesSet = new Set()
    updatedProjects.forEach(project => {
      if (project.languages) {
        for (let i = 0; i < project.languages.length && i < 3; i++)
          languagesSet.add(project.languages[i])
      }
    });

    this.languages = Array.from(languagesSet).sort()

    this.setState({
      loading: false,
      projects: updatedProjects
    });
  }

  async tryGetProjects() {
    let sleepTime = 5000
    while (true) {
      try {
        const projectsModel = await this.getProjects();
        this.setProjects(projectsModel);
        break;
      } catch (err) {
        console.error("Failed to retrieve project list: " + err)
        await sleep(sleepTime)
        sleepTime = Math.min(1 + sleepTime * 1.3, 30000)
      }
    }
  }

  async getProjects() {
    if (process.env.REACT_APP_FORCE_API === 'stub') {
      return this.sampleProjects();
    }

    let getProjectsApiUrl = '/api/projects';
    if (process.env.REACT_APP_FORCE_API === 'prod') {
      const proxyurl = "https://cors-anywhere.herokuapp.com/";
      const url = "https://meaningfulcode.org/api/projects";
      getProjectsApiUrl = proxyurl + url;
    }

    const res = await fetch(getProjectsApiUrl);
    const updatedProjects = await res.text();
    if (!res.ok) {
      throw new Error('An error occured calling "' + getProjectsApiUrl + '": '
        + res.statusText)
    }

    return JSON.parse(updatedProjects);
  }

  sampleProjects() {
    return [{ name: "Project A", owner: "Octocat", categories: ["humanitarian"], languages: ["Python", "HTML"], stars: "120", description: "Description text that will likely span on multiple lines.", url: "https://github.com/project-a", websiteUrl: "https://websitea.com", lastCommitTime: "2020-02-27T19:35:32Z" },
    { name: "Project B", owner: "Octocow", categories: ["health"], languages: ["Python", "HTML"], stars: "13", description: "Description text that will likely span on multiple lines.", url: "https://github.com/project-b", websiteUrl: "https://websiteb.com", lastCommitTime: "2016-10-27T19:35:32Z" },
    { name: "Project C", owner: "Octocrow", categories: ["health"], languages: ["Python", "HTML"], stars: "1200", description: "Description text that will likely span on multiple lines.", url: "https://github.com/project-c", websiteUrl: "https://websitec.com", lastCommitTime: "2020-09-15T19:35:32Z" },
    { name: "Project D", owner: "Octocus", categories: ["environment"], languages: ["C++"], stars: "320", description: "Description text that will likely span on multiple lines. Description text that will likely span on multiple lines. Description text that will likely span on multiple lines. Description text that will likely span on multiple lines. Description text that will likely span on multiple lines. Description text that will likely span on multiple lines. Description text that will likely span on multiple lines.", url: "https://github.com/project-d", websiteUrl: "https://websited.com", lastCommitTime: "2013-02-27T19:35:32Z" },
    { name: "Project E", owner: "Octocrate", categories: ["environment"], languages: ["C++", "Bash"], stars: "560", description: "Description text that will likely span on multiple lines.", url: "https://github.com/project-e", websiteUrl: "https://websited.com", lastCommitTime: "2016-10-27T19:35:32Z" },
    { name: "Project F", owner: "Octocanister-barista", categories: ["society"], languages: ["C", "Go", "Makefile", "Dockerfile"], stars: "4201", description: "Description text that will likely span on multiple lines.", url: "https://github.com/project-f", websiteUrl: "https://websitef.com", lastCommitTime: "2020-02-27T19:35:32Z" }]
  }

  categories() {
    return ["health", "education", "environment", "society", "humanitarian"]
  }

  render() {
    if (this.state.loading) {
      return (<>
        <IntroductionText />
        <ProjectsCategoryFilterMenu isotopeRef={this.isotopeRef} categories={this.categories()} />
        <ProjectsSortingMenu isotopeRef={this.isotopeRef} />
        <Grid style={{ "margin": "0 60px" }} columns={3} stackable>
          <ProjectPlaceholder />
          <ProjectPlaceholder />
          <ProjectPlaceholder />
          <ProjectPlaceholder />
          <ProjectPlaceholder />
          <ProjectPlaceholder />
        </Grid>
      </>)
    } else {
      return (<>
        <IntroductionText />
        <ProjectsCategoryFilterMenu isotopeRef={this.isotopeRef} categories={this.categories()} />
        <ProjectsSortingMenu isotopeRef={this.isotopeRef} languages={this.languages} />
        <ProjectsContainer ref={this.isotopeRef}>
          {this.state.projects.map(project => (
            <ProjectCard key={project.url} project={project} />
          ))}
        </ProjectsContainer>
      </>)
    }
  }
}

function IntroductionText() {
  return (<>
    <Responsive as={Container} maxWidth={991}>
      <p><b>Pick a cause to support</b>, and <b>find Open Source projects</b> there to make our world better. From the environment to health, accessibility, and humanitarian, we believe that <b>code can make a difference</b> when contributed to the right projects.</p>
    </Responsive>
    <Responsive as={Container} minWidth={992}>
      <p><b>Pick a cause to support</b>, and <b>find Open Source projects</b> that make our world better.<br />From the environment to health, accessibility, and humanitarian, we believe that <b>code can make a difference</b> when contributed to the right projects. Connecting great projects and developers, to make a difference.</p>
    </Responsive>
  </>
  )
}
