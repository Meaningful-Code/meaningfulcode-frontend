export const categories = [
  'environment',
  'health',
  'society',
  'education',
  'humanitarian',
  'accessibility',
];

export type Project = {
  name: string;
  owner: string;
  categories: string[];
  languages: string[];
  stars: number;
  description?: string;
  url: string;
  websiteUrl: string;
  // In seconds since the epoch
  lastCommitTimestamp: number;
};
