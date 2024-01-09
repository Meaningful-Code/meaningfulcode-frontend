import {Project} from '../models/Project'

export default function getMockProjects(): Project[] {
  return [
    {
      name: 'Project A',
      owner: 'Octocat',
      categories: ['humanitarian'],
      languages: ['Python', 'HTML'],
      stars: 120,
      description: 'Description text that will likely span on multiple lines.',
      url: 'https://github.com/project-a',
      websiteUrl: 'https://websitea.com',
      lastCommitTimestamp: 1687894587
    },
    {
      name: 'Project B',
      owner: 'Octocow',
      categories: ['health'],
      languages: ['Python', 'HTML'],
      stars: 13,
      description: 'Description text that will likely span on multiple lines.',
      url: 'https://github.com/project-b',
      websiteUrl: 'https://websiteb.com',
      lastCommitTimestamp: 1703135247
    },
    {
      name: 'Project C',
      owner: 'Octocrow',
      categories: ['health'],
      languages: ['Python', 'HTML'],
      stars: 1200,
      description: 'Description text that will likely span on multiple lines.',
      url: 'https://github.com/project-c',
      websiteUrl: 'https://websitec.com',
      lastCommitTimestamp: 1687124587
    },
    {
      name: 'Project D',
      owner: 'Octocus',
      categories: ['environment'],
      languages: ['C++'],
      stars: 320,
      description:
        'Description text that will likely span on multiple lines. Description text that will likely span on multiple lines. Description text that will likely span on multiple lines. Description text that will likely span on multiple lines. Description text that will likely span on multiple lines. Description text that will likely span on multiple lines. Description text that will likely span on multiple lines.',
      url: 'https://github.com/project-d',
      websiteUrl: 'https://websited.com',
      lastCommitTimestamp: 1701135247
    },
    {
      name: 'Project E',
      owner: 'Octocrate',
      categories: ['environment'],
      languages: ['C++', 'Bash'],
      stars: 560,
      url: 'https://github.com/project-e',
      websiteUrl: 'https://websited.com',
      lastCommitTimestamp: 1507824117
    },
    {
      name: 'Project F',
      owner: 'Octocanister-barista',
      categories: ['society'],
      languages: ['C', 'Go', 'Makefile', 'Dockerfile'],
      stars: 4201,
      description: 'Description text that will likely span on multiple lines.',
      url: 'https://github.com/project-f',
      websiteUrl: 'https://websitef.com',
      lastCommitTimestamp: 1587824117
    }
  ];
}