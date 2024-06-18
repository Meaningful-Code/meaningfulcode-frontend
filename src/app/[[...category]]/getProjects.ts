import getMockProjects from './MockProjects';
import { Project } from '@/models/Project';
import getHost from '@/utils/getHost';

const projectsEndpoint = `${getHost()}/api/projects`;

export default async function getProjects(): Promise<Project[]> {
  if (process.env.API_MODE === 'stub') {
    return getMockProjects();
  }

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
