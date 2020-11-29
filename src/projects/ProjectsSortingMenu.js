import React from 'react';
import { Button, Container, Dropdown } from 'semantic-ui-react'

function SortButton(props) {
  return (
    <Button size="large" className="button sort"
      onClick={props.onClick}> {props.label}</Button>
  )
}

function LanguageFilterButton(props) {
  function mapLanguageOptions(languages) {
    if (!languages) {
      return []
    }

    let opts = []
    languages.forEach((language) => {
      opts.push({
        key: language,
        text: language,
        value: language
      })
    })
    return opts
  }

  return (
    <Dropdown placeholder='Language' clearable search selection
      options={mapLanguageOptions(props.languages)}
      onChange={props.onChange} />
  )
}

function ProjectsSortingMenu(props) {
  function sortByStars() {
    if (props.isotopeRef.current)
      props.isotopeRef.current.sortByStars()
  }

  function sortByLastCommit() {
    if (props.isotopeRef.current)
      props.isotopeRef.current.sortByLastCommit()
  }

  function sortByBookmarked() {
    if (props.isotopeRef.current)
      props.isotopeRef.current.sortByBookmarked()
  }

  function shuffle() {
    if (props.isotopeRef.current)
      props.isotopeRef.current.shuffle()
  }

  function filterByLanguage(dropdown, changeEvent) {
    if (props.isotopeRef.current)
      props.isotopeRef.current.filterByLanguage(changeEvent.value)
  }

  return (
    <Container className="sorting" textAlign="center">
      <SortButton label="shuffle!" onClick={shuffle} />
      <SortButton label="most starred" onClick={sortByStars} />
      <SortButton label="last updated" onClick={sortByLastCommit} />
      <SortButton label="bookmarked" onClick={sortByBookmarked} />
      <LanguageFilterButton languages={props.languages}
        onChange={filterByLanguage} />
    </Container>)
}

export default ProjectsSortingMenu