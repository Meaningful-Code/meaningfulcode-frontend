export default function getHost() {
  if (typeof window !== 'undefined' && process.env.NODE_ENV !== 'test') {
    throw new Error('getHost() should only be called on the server side');
  }

  const productionHost = 'https://meaningfulcode.org';
  if (process.env.NEXT_PUBLIC_VERCEL_ENV) {
    if (process.env.NEXT_PUBLIC_VERCEL_ENV === 'production') {
      return productionHost;
    } else {
      return `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`;
    }
  } else if (process.env.MEANINGFUL_DEV) {
    return 'http://localhost:3000';
  } else {
    return productionHost;
  }
}
