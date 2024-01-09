export function formatLastUpdateAge(lastCommitAgeInDays: number | null) {
  if (lastCommitAgeInDays == null) {
    return 'never';
  }

  const monthDuration = 30;
  const yearDuration = 365;
  if (lastCommitAgeInDays < 1) {
    return 'today';
  }

  let lastUpdateText = '';
  if (lastCommitAgeInDays < monthDuration) {
    lastUpdateText = `${lastCommitAgeInDays} ${
      lastCommitAgeInDays === 1 ? 'day' : 'days'
    }`;
  } else if (lastCommitAgeInDays < yearDuration) {
    const lastCommitAgeInMonths = Math.floor(lastCommitAgeInDays / monthDuration);
    lastUpdateText = `${lastCommitAgeInMonths} ${
      lastCommitAgeInMonths === 1 ? 'month' : 'months'
    }`;
  } else {
    const lastCommitAgeInYears = Math.floor(lastCommitAgeInDays / yearDuration);
    lastUpdateText = `${lastCommitAgeInYears} ${
      lastCommitAgeInYears === 1 ? 'year' : 'years'
    }`;
  }

  return lastUpdateText + ' ago';
}
