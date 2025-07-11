export function formatLastUpdateAge(
  lastCommitAgeInDays: number | null,
  t: (key: string) => string
) {
  if (lastCommitAgeInDays == null) {
    return t('never');
  }

  const monthDuration = 30;
  const yearDuration = 365;
  if (lastCommitAgeInDays < 1) {
    return t('today');
  }

  //TODO check if next-intl can handle plurals
  let lastUpdateText = '';
  if (lastCommitAgeInDays < monthDuration) {
    lastUpdateText = `${lastCommitAgeInDays} ${
      lastCommitAgeInDays === 1 ? t('day') : t('days')
    }`;
  } else if (lastCommitAgeInDays < yearDuration) {
    const lastCommitAgeInMonths = Math.floor(lastCommitAgeInDays / monthDuration);
    lastUpdateText = `${lastCommitAgeInMonths} ${
      lastCommitAgeInMonths === 1 ? t('month') : t('months')
    }`;
  } else {
    const lastCommitAgeInYears = Math.floor(lastCommitAgeInDays / yearDuration);
    lastUpdateText = `${lastCommitAgeInYears} ${
      lastCommitAgeInYears === 1 ? t('year') : t('years')
    }`;
  }

  return lastUpdateText + ' ' + t('ago');
}
