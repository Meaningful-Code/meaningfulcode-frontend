import React from 'react';
import PropTypes from 'prop-types';
import { Button, Container, Dropdown, Input } from 'semantic-ui-react';

function SortButton(props) {
  const { onClick, label } = props;

  return (
    <Button size="large" className="button sort" onClick={onClick}>
      {label}
    </Button>
  );
}

SortButton.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};

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
      placeholder="language"
      clearable
      search
      selection
      options={mapLanguageOptions(languages)}
      onChange={onChange}
    />
  );
}

LanguageFilterButton.propTypes = {
  languages: PropTypes.arrayOf(PropTypes.string).isRequired,
  onChange: PropTypes.func.isRequired
};

function SearchFilterButton(props) {
  const { onChange } = props;
  return <Input placeholder="search" onChange={onChange} />;
}

SearchFilterButton.propTypes = {
  onChange: PropTypes.func.isRequired
};

export default function ProjectsSortingMenu(props) {
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

  function filterBySearch(searchbox, changeEvent) {
    if (isotopeRef.current) {
      isotopeRef.current.filterBySearch(changeEvent.value);
    }
  }

  return (
    <Container className="sorting" textAlign="center">
      <SortButton label="shuffle!" onClick={shuffle} />
      <SortButton label="most starred" onClick={sortByStars} />
      <SortButton label="last updated" onClick={sortByLastCommit} />
      <SortButton label="bookmarked" onClick={sortByBookmarked} />
      <LanguageFilterButton languages={languages} onChange={filterByLanguage} />
      <SearchFilterButton onChange={filterBySearch} />
    </Container>
  );
}

ProjectsSortingMenu.propTypes = {
  isotopeRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.any })
  ]).isRequired,
  languages: PropTypes.arrayOf(PropTypes.string).isRequired
};
