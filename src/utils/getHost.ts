export default function getHost() {
  const productionHost = 'https://meaningfulcode.org';
  if (process.env.NEXT_PUBLIC_VERCEL_ENV) {
    if (process.env.NEXT_PUBLIC_VERCEL_ENV === 'production') {
      return productionHost;
    } else {
      return `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`;
    }
  } else {
    return productionHost;
  }
}
