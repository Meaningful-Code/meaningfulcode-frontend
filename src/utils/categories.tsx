export function localizeCategories(categories: string[], t: (key: string) => string) {
  return categories.map((category) => t(category));
}
