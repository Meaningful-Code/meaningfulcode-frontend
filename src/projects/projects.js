import getMockProjects from './mock';

const projectsUrl = '/api/projects';
const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
const prodProjectsUrl = 'https://meaningfulcode.org/api/projects';
const prodCorsProjectsUrl = proxyUrl + prodProjectsUrl;

export const categories = [
  'health',
  'education',
  'environment',
  'society',
  'humanitarian',
  'accessibility'
];

export default async function getProjects() {
  const forcedApi = process.env.REACT_APP_FORCE_API;
  if (forcedApi === 'stub') {
    return getMockProjects();
  }

  const getProjectsApiUrl = forcedApi === 'prod' ? prodCorsProjectsUrl : projectsUrl;
  const res = await fetch(getProjectsApiUrl);
  const updatedProjects = await res.text();
  if (!res.ok) {
    const error = `An error occured while getting projects from "${getProjectsApiUrl}": ${res.statusText}`;
    throw new Error(error);
  }

  return JSON.parse(updatedProjects);
}
