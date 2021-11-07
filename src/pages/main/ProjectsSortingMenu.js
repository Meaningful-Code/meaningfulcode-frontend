import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Container, Input } from 'semantic-ui-react';

import LanguageDropdown from '../../components/LanguageDropdown';

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

function SearchFilterButton(props) {
  const { onChange } = props;
  return <Input placeholder="search" onChange={onChange} />;
}

SearchFilterButton.propTypes = {
  onChange: PropTypes.func.isRequired
};

export default class ProjectsSortingMenu extends Component {
  constructor(props) {
    super(props);
    this.isotopeRef = props.isotopeRef;

    this.sortByStars = this.sortByStars.bind(this);
    this.sortByLastCommit = this.sortByLastCommit.bind(this);
    this.sortByBookmarked = this.sortByBookmarked.bind(this);
    this.shuffle = this.shuffle.bind(this);
    this.filterByLanguage = this.filterByLanguage.bind(this);
    this.filterBySearch = this.filterBySearch.bind(this);
  }

  sortByStars() {
    if (this.isotopeRef.current) {
      this.isotopeRef.current.sortByStars();
    }
  }

  sortByLastCommit() {
    if (this.isotopeRef.current) {
      this.isotopeRef.current.sortByLastCommit();
    }
  }

  sortByBookmarked() {
    if (this.isotopeRef.current) {
      this.isotopeRef.current.sortByBookmarked();
    }
  }

  shuffle() {
    if (this.isotopeRef.current) {
      this.isotopeRef.current.shuffle();
    }
  }

  filterByLanguage(dropdown, changeEvent) {
    if (this.isotopeRef.current) {
      const { onLanguageChanged } = this.props;
      const language = changeEvent.value;

      onLanguageChanged(language);
      this.isotopeRef.current.filterByLanguage(language);
    }
  }

  filterBySearch(searchbox, changeEvent) {
    if (this.isotopeRef.current) {
      this.isotopeRef.current.filterBySearch(changeEvent.value);
    }
  }

  render() {
    const { languages, language } = this.props;
    return (
      <Container className="sorting" textAlign="center">
        <SortButton label="shuffle!" onClick={this.shuffle} />
        <SortButton label="most starred" onClick={this.sortByStars} />
        <SortButton label="last updated" onClick={this.sortByLastCommit} />
        <SortButton label="bookmarked" onClick={this.sortByBookmarked} />
        <LanguageDropdown
          languages={languages}
          language={language}
          onChange={this.filterByLanguage}
        />
        <SearchFilterButton onChange={this.filterBySearch} />
      </Container>
    );
  }
}

ProjectsSortingMenu.propTypes = {
  isotopeRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Component) })
  ]).isRequired,
  languages: PropTypes.arrayOf(PropTypes.string).isRequired,
  language: PropTypes.string,
  onLanguageChanged: PropTypes.func.isRequired
};

ProjectsSortingMenu.defaultProps = {
  language: null
};
