import axios from 'axios';

import getMockProjects from './mock';

const prodAPIUrl = 'https://meaningfulcode.org';
const forcedApi = process.env.REACT_APP_FORCE_API;

function APIUrl() {
  if (forcedApi === 'prod') return prodAPIUrl;
  if (forcedApi === 'local') return 'http://localhost:3001';
  return '';
}

const projectsEndpoint = `${APIUrl()}/api/projects`;
const submitProjectEndpoint = `${APIUrl()}/api/submit-project`;

export const categories = [
  'health',
  'education',
  'environment',
  'society',
  'humanitarian',
  'accessibility'
];

export default async function getProjects() {
  if (forcedApi === 'stub') {
    return getMockProjects();
  }

  const res = await fetch(projectsEndpoint);
  const updatedProjects = await res.text();
  if (!res.ok) {
    const error = `An error occured while getting projects from "${projectsEndpoint}": ${res.statusText}`;
    throw new Error(error);
  }

  return JSON.parse(updatedProjects);
}

export async function submitProject(project, recaptcha) {
  try {
    const data = { project, recaptcha };
    const res = await axios.post(submitProjectEndpoint, data);
    const { url } = res.data;
    return url;
  } catch (err) {
    if (err.response && err.response.data) {
      const { reason } = err.response.data;
      throw new Error(`Failed to submit project: ${reason}`);
    } else {
      // eslint-disable-next-line no-console
      console.log(`Error submitting project: ${err}`);
      throw new Error(`Failed to submit project`);
    }
  }
}
