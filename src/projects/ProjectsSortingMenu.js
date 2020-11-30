import React from 'react';
import { Button, Container, Dropdown } from 'semantic-ui-react';

function SortButton(props) {
  const { onClick, label } = props;

  return (
    <Button size="large" className="button sort" onClick={onClick}>
      {label}
    </Button>
  );
}

function LanguageFilterButton(props) {
  function mapLanguageOptions(languages) {
    if (!languages) {
      return [];
    }

    const opts = [];
    languages.forEach((language) => {
      opts.push({
        key: language,
        text: language,
        value: language
      });
    });
    return opts;
  }

  const { languages, onChange } = props;
  return (
    <Dropdown
      placeholder="Language"
      clearable
      search
      selection
      options={mapLanguageOptions(languages)}
      onChange={onChange}
    />
  );
}

function ProjectsSortingMenu(props) {
  const { isotopeRef, languages } = props;

  function sortByStars() {
    if (isotopeRef.current) {
      isotopeRef.current.sortByStars();
    }
  }

  function sortByLastCommit() {
    if (isotopeRef.current) {
      isotopeRef.current.sortByLastCommit();
    }
  }

  function sortByBookmarked() {
    if (isotopeRef.current) {
      isotopeRef.current.sortByBookmarked();
    }
  }

  function shuffle() {
    if (isotopeRef.current) {
      isotopeRef.current.shuffle();
    }
  }

  function filterByLanguage(dropdown, changeEvent) {
    if (isotopeRef.current) {
      isotopeRef.current.filterByLanguage(changeEvent.value);
    }
  }

  return (
    <Container className="sorting" textAlign="center">
      <SortButton label="shuffle!" onClick={shuffle} />
      <SortButton label="most starred" onClick={sortByStars} />
      <SortButton label="last updated" onClick={sortByLastCommit} />
      <SortButton label="bookmarked" onClick={sortByBookmarked} />
      <LanguageFilterButton languages={languages} onChange={filterByLanguage} />
    </Container>
  );
}

export default ProjectsSortingMenu;
