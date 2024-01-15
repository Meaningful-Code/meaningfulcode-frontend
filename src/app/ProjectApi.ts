import axios from 'axios';

import getMockProjects from './[[...category]]/MockProjects';
import { Project } from '@/models/Project';

const apiMode = process.env.API_MODE;
const projectsEndpoint = `${getApiUrl()}/api/projects`;
const submitProjectEndpoint = `${getApiUrl()}/api/submit-project`;

function getApiUrl() {
  const testMode = process.env.NODE_ENV === 'test';
  const prodMode = process.env.NODE_ENV === 'production';
  const vercelUrl = process.env.VERCEL_URL;
  if (apiMode === 'stub' || testMode) {
    return 'http://localhost:3001';
  } else if (prodMode) {
    return 'https://meaningfulcode.org';
  } else if (vercelUrl) {
    return `https://${vercelUrl}`;
  } else {
    return 'https://meaningfulcode.org';
  }
}

export async function getProjects(): Promise<Project[]> {
  if (apiMode === 'stub') {
    return getMockProjects();
  }

  const res = await fetch(projectsEndpoint, { next: { revalidate: 3600 } });
  if (!res.ok) {
    const error = `An error occured while getting projects from "${projectsEndpoint}": ${res.statusText}`;
    throw new Error(error);
  }

  return res.json();
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
