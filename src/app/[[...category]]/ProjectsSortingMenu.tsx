'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';

import LanguageDropdown from '@/components/LanguageDropdown';
import { projectsUrlFromState } from './projectUrl';

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

type SearchFilterButtonProps = {
  onChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  search: string | null;
};

function SearchFilterButton(props: SearchFilterButtonProps) {
  const { onChange, search } = props;
  return (
    <Grid item>
      <TextField
        label="search"
        variant="outlined"
        size="small"
        onChange={onChange}
        value={search ? search : ''}
      />
    </Grid>
  );
}

export interface SortingAndFilteringHandlers {
  sortByStars: () => void;
  sortByLastCommit: () => void;
  sortByBookmarked: () => void;
  filterByLanguage: (language: string) => void;
  filterBySearch: (searchTerm: string) => void;
}

interface ProjectsSortingMenuProps {
  category: string | null;
  language: string | null;
  languages: string[];
  search: string | null;
  sorting: string | null;
  handlers?: SortingAndFilteringHandlers;
}

const ProjectsSortingMenu = ({
  category,
  language,
  languages,
  search,
  sorting,
  handlers,
}: ProjectsSortingMenuProps) => {
  const router = useRouter();
  const actionHandlers = handlers || {
    sortByStars: () => {
      router.push(projectsUrlFromState(category, language, search, 'stars'));
    },
    sortByLastCommit: () => {
      router.push(projectsUrlFromState(category, language, search, 'lastCommit'));
    },
    sortByBookmarked: () => {
      router.push(projectsUrlFromState(category, language, search, 'bookmarked'));
    },
    filterByLanguage: (language) => {
      router.push(projectsUrlFromState(category, language, search, sorting));
    },
    filterBySearch: (search) => {
      router.push(projectsUrlFromState(category, language, search, sorting));
    },
  };

  const handleFilterByLanguage = (changeEvent: React.SyntheticEvent<Element, Event>) => {
    // @ts-ignore
    const selectedLanguage = changeEvent.target.innerText;
    actionHandlers.filterByLanguage(selectedLanguage);
  };

  const handleFilterBySearch = (changeEvent: React.ChangeEvent<HTMLInputElement>) => {
    actionHandlers.filterBySearch(changeEvent.target.value);
  };

  return (
    <Grid container justifyContent="center" spacing={0.5} className="sorting">
      <SortButton label="most starred" onClick={actionHandlers.sortByStars} />
      <SortButton label="last updated" onClick={actionHandlers.sortByLastCommit} />
      <SortButton label="bookmarked" onClick={actionHandlers.sortByBookmarked} />
      <LanguageDropdown
        languages={languages || []}
        language={language}
        onChange={handleFilterByLanguage}
      />
      <SearchFilterButton onChange={handleFilterBySearch} search={search} />
    </Grid>
  );
};

export default ProjectsSortingMenu;
