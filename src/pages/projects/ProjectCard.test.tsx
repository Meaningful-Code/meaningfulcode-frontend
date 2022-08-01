import { formatLastUpdateAge } from './ProjectCard';

describe('Component: ProjectCard', () => {
  test.each([
    [null, 'never'],
    [0, 'today'],
    [1, '1 day ago'],
    [6, '6 days ago'],
    [33, '1 month ago'],
    [67, '2 months ago'],
    [400, '1 year ago'],
    [800, '2 years ago']
  ])('converts %i days readable output %s', (days, expected) => {
    expect(formatLastUpdateAge(days)).toBe(expected);
  });
});
