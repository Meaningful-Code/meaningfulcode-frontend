import { ReadonlyURLSearchParams } from 'next/navigation';

export function decodeSearchParams(searchParams: ReadonlyURLSearchParams) {
  // Schema: meaningfulcode.org/<category>?lang=<lang>&search=<search>&sort=<sort>
  const language = searchParams.get('lang');
  const search = searchParams.get('search');
  const sorting = searchParams.get('sort');
  return { language, search, sorting };
}

export function encodeSearchParams(
  language: string | null,
  search: string | null,
  sorting: string | null
): URLSearchParams {
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
  return params;
}

export function projectsUrlFromState(
  category: string | null,
  language: string | null,
  search: string | null,
  sorting: string | null
): string {
  const searchParams = encodeSearchParams(language, search, sorting).toString();
  return `/${category || ''}${searchParams && `?${searchParams}`}`;
}

type Params = {
  category: string[] | null;
};

export function categoryFromParams(params: Params): string | null {
  const category = params.category ? params.category[0] : null;
  const hasCategory = category && category !== 'all' && category !== 'index';
  return hasCategory ? category : null;
}
