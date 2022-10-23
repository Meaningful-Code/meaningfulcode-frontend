export const categories = [
  'health',
  'education',
  'environment',
  'society',
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
  lastCommitTimestamp: number;
};
