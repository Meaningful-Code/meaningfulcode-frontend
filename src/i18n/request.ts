import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async () => {
  // Right now the locale is hardcoded then
  // and both logic and criteria to retrieve it dynamically
  // must be designed and implemented
  const locale = 'en';
  //   const locale = 'it';

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});
