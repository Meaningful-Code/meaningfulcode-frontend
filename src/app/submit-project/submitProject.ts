'use client';

import getHost from '@/utils/getHost';

export type ProjectSubmission = {
  name: string;
  website: string;
  repository: string;
  category: string;
  description: string;
};

export default async function submitProject(
  project: ProjectSubmission,
  recaptcha: string
) {
  try {
    const submitProjectEndpoint = `${getHost()}/api/submit-project`;
    const data = { project, recaptcha };
    const res = await fetch(submitProjectEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const errData = await res.json();
      const { reason } = errData;
      throw new Error(`Failed to submit project: ${reason}`);
    }

    const { url } = await res.json();
    return url;
  } catch (err: any) {
    // eslint-disable-next-line no-console
    console.log(`Error submitting project: ${err}`);
    throw new Error(`Failed to submit project`);
  }
}
