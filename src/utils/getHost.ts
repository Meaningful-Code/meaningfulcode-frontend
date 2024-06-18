import { PRODUCTION_HOST, LOCAL_DEV_HOST } from '@/constants/constants';

export default function getHost() {
  if (typeof window !== 'undefined' && process.env.NODE_ENV !== 'test') {
    throw new Error('getHost() should only be called on the server side');
  }

  if (process.env.NEXT_PUBLIC_VERCEL_ENV) {
    if (process.env.NEXT_PUBLIC_VERCEL_ENV === 'production') {
      return PRODUCTION_HOST;
    } else {
      return `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`;
    }
  } else if (process.env.MEANINGFUL_DEV) {
    return LOCAL_DEV_HOST;
  } else {
    return PRODUCTION_HOST;
  }
}
