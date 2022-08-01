import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';

import ProjectsContainer from './ProjectsContainer';
import LanguageDropdown from '../../components/LanguageDropdown';
import { ProjectPageContext } from './Context';

type SortButtonProps = {
  label: string;
  onClick: React.MouseEventHandler<HTMLAnchorElement>;
};

function SortButton(props: SortButtonProps) {
  const { onClick, label } = props;

  return (
    <Grid item>
      <Button
        variant="outlined"
        /* @ts-ignore: Color not recognized */
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
  onClick: PropTypes.func.isRequired,
};

type SearchFilterButtonProps = {
  onChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
};

function SearchFilterButton(props: SearchFilterButtonProps) {
  const { onChange } = props;

  return (
    <Grid item>
      <TextField label="search" variant="outlined" onChange={onChange} size="small" />
    </Grid>
  );
}

SearchFilterButton.propTypes = {
  onChange: PropTypes.func.isRequired,
};

type ProjectsSortingMenuProps = {
  onLanguageChanged: (language: string) => void;
};

export default class ProjectsSortingMenu extends Component<ProjectsSortingMenuProps> {
  projectsViewRef: React.RefObject<ProjectsContainer> | null = null;
  languageChanged: (language: string) => void;

  static contextType = ProjectPageContext;
  context!: React.ContextType<typeof ProjectPageContext>;

  constructor(props: ProjectsSortingMenuProps) {
    super(props);
    this.languageChanged = props.onLanguageChanged;

    this.sortByStars = this.sortByStars.bind(this);
    this.sortByLastCommit = this.sortByLastCommit.bind(this);
    this.sortByBookmarked = this.sortByBookmarked.bind(this);
    this.shuffle = this.shuffle.bind(this);
    this.filterByLanguage = this.filterByLanguage.bind(this);
    this.filterBySearch = this.filterBySearch.bind(this);
  }

  componentDidMount() {
    this.projectsViewRef = this.context.projectsViewRef;
  }

  sortByStars() {
    if (this.projectsViewRef?.current) {
      this.projectsViewRef.current.sortByStars();
    }
  }

  sortByLastCommit() {
    if (this.projectsViewRef?.current) {
      this.projectsViewRef.current.sortByLastCommit();
    }
  }

  sortByBookmarked() {
    if (this.projectsViewRef?.current) {
      this.projectsViewRef.current.sortByBookmarked();
    }
  }

  shuffle() {
    if (this.projectsViewRef?.current) {
      this.projectsViewRef.current.shuffle();
    }
  }

  filterByLanguage(changeEvent: React.SyntheticEvent<Element, Event>) {
    if (this.projectsViewRef?.current) {
      const { onLanguageChanged } = this.props as ProjectsSortingMenuProps;
      // @ts-ignore
      const language = changeEvent.target.innerText;

      onLanguageChanged(language);
      this.projectsViewRef.current.filterByLanguage(language);
    }
  }

  filterBySearch(changeEvent: React.ChangeEvent<HTMLInputElement>) {
    if (this.projectsViewRef?.current) {
      this.projectsViewRef.current.filterBySearch(changeEvent.target.value);
    }
  }

  render() {
    return (
      <Grid container justifyContent="center" spacing={0.5} className="sorting">
        <SortButton label="shusffle!" onClick={this.shuffle} />
        <SortButton label="most starred" onClick={this.sortByStars} />

        <SortButton label="last updated" onClick={this.sortByLastCommit} />
        <SortButton label="bookmarked" onClick={this.sortByBookmarked} />
        <LanguageDropdown
          languages={this.context.languages || []}
          language={this.context.language}
          onChange={this.filterByLanguage}
        />
        <SearchFilterButton onChange={this.filterBySearch} />
      </Grid>
    );
  }
}
