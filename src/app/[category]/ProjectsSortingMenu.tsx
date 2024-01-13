import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';

import LanguageDropdown from '../../components/LanguageDropdown';

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

export interface SortingAndFilteringHandlers {
  sortByStars: () => void;
  sortByLastCommit: () => void;
  sortByBookmarked: () => void;
  filterByLanguage: (language: string) => void;
  filterBySearch: (searchTerm: string) => void;
}

interface ProjectsSortingMenuProps {
  language: string | null;
  languages: string[];
  handlers: SortingAndFilteringHandlers;
}

const ProjectsSortingMenu = ({
  language,
  languages,
  handlers,
}: ProjectsSortingMenuProps) => {
  const handleFilterByLanguage = (changeEvent: React.SyntheticEvent<Element, Event>) => {
    // @ts-ignore
    const selectedLanguage = changeEvent.target.innerText;
    handlers.filterByLanguage(selectedLanguage);
  };

  const handleFilterBySearch = (changeEvent: React.ChangeEvent<HTMLInputElement>) => {
    handlers.filterBySearch(changeEvent.target.value);
  };

  return (
    <Grid container justifyContent="center" spacing={0.5} className="sorting">
      <SortButton label="most starred" onClick={handlers.sortByStars} />
      <SortButton label="last updated" onClick={handlers.sortByLastCommit} />
      <SortButton label="bookmarked" onClick={handlers.sortByBookmarked} />
      <LanguageDropdown
        languages={languages || []}
        language={language}
        onChange={handleFilterByLanguage}
      />
      <SearchFilterButton onChange={handleFilterBySearch} />
    </Grid>
  );
};

export default ProjectsSortingMenu;
