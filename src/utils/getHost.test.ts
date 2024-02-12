import getHost from './getHost';
describe('getHost', () => {
  const ENV_BACKUP = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...ENV_BACKUP };
    process.env.NEXT_PUBLIC_VERCEL_URL = 'preview-12345.vercel.app';
  });
  afterAll(() => {
    process.env = ENV_BACKUP;
  });

  test('returns production host when NEXT_PUBLIC_VERCEL_ENV is not set', () => {
    process.env.NEXT_PUBLIC_VERCEL_ENV = undefined;
    expect(getHost()).toBe('https://meaningfulcode.org');
  });

  test('returns production host when NEXT_PUBLIC_VERCEL_ENV is production', () => {
    process.env.NEXT_PUBLIC_VERCEL_ENV = 'production';
    expect(getHost()).toBe('https://meaningfulcode.org');
  });

  test('returns preview host when NEXT_PUBLIC_VERCEL_ENV is not production', () => {
    process.env.NEXT_PUBLIC_VERCEL_ENV = 'development';
    expect(getHost()).toBe('https://preview-12345.vercel.app');
  });
});
