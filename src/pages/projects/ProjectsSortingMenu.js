import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';

import ProjectsContainer from './ProjectsContainer';
import LanguageDropdown from '../../components/LanguageDropdown';

function SortButton(props) {
  const { onClick, label } = props;

  return (
    <Grid item>
      <Button
        variant="outlined"
        color="neutral"
        size="large"
        className="button sort"
        onClick={onClick}
      >
        {label}
      </Button>
    </Grid>
  );
}

SortButton.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};

function SearchFilterButton(props) {
  const { onChange } = props;

  return (
    <Grid item>
      <TextField label="search" variant="outlined" onChange={onChange} size="small" />
    </Grid>
  );
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

  filterByLanguage(changeEvent) {
    if (this.isotopeRef.current) {
      const { onLanguageChanged } = this.props;
      const language = changeEvent.target.innerText;

      onLanguageChanged(language);
      this.isotopeRef.current.filterByLanguage(language);
    }
  }

  filterBySearch(changeEvent) {
    if (this.isotopeRef.current) {
      this.isotopeRef.current.filterBySearch(changeEvent.target.value);
    }
  }

  render() {
    const { languages, language } = this.props;
    return (
      <Grid container justifyContent="center" spacing={0.5} className="sorting">
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
      </Grid>
    );
  }
}

ProjectsSortingMenu.propTypes = {
  isotopeRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(ProjectsContainer) })
  ]).isRequired,
  languages: PropTypes.arrayOf(PropTypes.string).isRequired,
  language: PropTypes.string,
  onLanguageChanged: PropTypes.func.isRequired
};

ProjectsSortingMenu.defaultProps = {
  language: null
};
