'use client';

export default async function invokeAgent(
  host: string,
  prompt: string,
  recaptcha: string
) {
  try {
    const endpoint = `${host}/api/invoke-agent`;
    const data = { prompt, recaptcha };
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const errData = await res.json();
      const { reason } = errData;
      throw new Error(`Failed to invoke agent: ${reason}`);
    }

    const { answer } = await res.json();
    return answer;
  } catch (err: any) {
    // eslint-disable-next-line no-console
    console.log(`Error invoking agent: ${err}`);
    throw new Error(`Failed to invoke agent`);
  }
}
