import axios from 'axios';

import getMockProjects from './[[...category]]/MockProjects';
import { Project } from '@/models/Project';

const projectsEndpoint = `${getApiUrl()}/api/projects`;
const submitProjectEndpoint = `${getApiUrl()}/api/submit-project`;

function getApiUrl() {
  if (process.env.NEXT_PUBLIC_VERCEL_ENV) {
    return `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`;
  } else if (process.env.NODE_ENV === 'test') {
    return 'http://localhost:3000';
  } else {
    return 'https://meaningfulcode.org';
  }
}

export async function getProjects(): Promise<Project[]> {
  if (process.env.API_MODE === 'stub') {
    return getMockProjects();
  }

  console.log(`Fetching projects from "${projectsEndpoint}"`);
  // start a timer to measure the duration of the fetch
  const start = process.hrtime();
  const res = await fetch(projectsEndpoint, { next: { revalidate: 4 * 3600 } });
  console.log(`Fetch took... ${process.hrtime(start)}`);
  if (!res.ok) {
    const error = `An error occured while getting projects from "${projectsEndpoint}": ${res.statusText}`;
    throw new Error(error);
  }
  const data = await res.json();
  console.log(`res.json took ... ${process.hrtime(start)}`);
  // check that data is an array
  if (!Array.isArray(data)) {
    const error = `Project data received in invalid format  "${projectsEndpoint}": ${data}`;
    throw new Error(error);
  }
  return data;
}

export type ProjectSubmission = {
  name: string;
  website: string;
  repository: string;
  category: string;
  description: string;
};

export async function submitProject(project: ProjectSubmission, recaptcha: string) {
  try {
    const data = { project, recaptcha };
    const res = await axios.post(submitProjectEndpoint, data);
    const { url } = res.data;
    return url;
  } catch (err: any) {
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
