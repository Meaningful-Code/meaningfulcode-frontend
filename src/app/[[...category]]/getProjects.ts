import getMockProjects from './MockProjects';
import { Project } from '@/models/Project';

const projectsEndpoint = `${getApiUrl()}/api/projects`;

function getApiUrl() {
  if (process.env.NEXT_PUBLIC_VERCEL_ENV) {
    return `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`;
  } else if (process.env.NODE_ENV === 'test') {
    return 'http://localhost:3000';
  } else {
    return 'https://meaningfulcode.org';
  }
}

export default async function getProjects(): Promise<Project[]> {
  if (process.env.API_MODE === 'stub') {
    return getMockProjects();
  }

  console.log(`Fetching projects from "${projectsEndpoint}"`);
  // start a timer to measure the duration of the fetch
  const res = await fetch(projectsEndpoint, { next: { revalidate: 4 * 3600 } });
  if (!res.ok) {
    const error = `An error occured while getting projects from "${projectsEndpoint}": ${res.statusText}`;
    throw new Error(error);
  }
  const data = await res.json();

  // check that data is an array
  if (!Array.isArray(data)) {
    const error = `Project data received in invalid format  "${projectsEndpoint}": ${data}`;
    throw new Error(error);
  }
  return data;
}
