import { ReadonlyURLSearchParams } from 'next/navigation';

export function projectsStateFromUrl(
  category: string | null,
  searchParams: ReadonlyURLSearchParams
) {
  // Schema: meaningfulcode.org/<category>?lang=<lang>&search=<search>&sort=<sort>
  const language = searchParams.get('lang');
  const search = searchParams.get('search');
  const sorting = searchParams.get('sort');
  return { category, language, search, sorting };
}

export function projectsUrlFromState(
  category: string | null,
  language: string | null,
  search: string | null,
  sorting: string | null
): string {
  const params = new URLSearchParams();
  if (language) {
    params.append('lang', language);
  }
  if (search) {
    params.append('search', search);
  }
  if (sorting) {
    params.append('sort', sorting);
  }
  const queryString = params.toString();
  return `/${category || ''}${queryString ? `?${queryString}` : ''}`;
}
