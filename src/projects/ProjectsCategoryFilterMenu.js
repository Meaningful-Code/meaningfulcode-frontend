import React, { useState } from 'react';
import { Container, Button } from 'semantic-ui-react'

import CategoryIcon from './CategoryIcon'

function ProjectsCategoryFilterMenu(props) {
  const isotopeRef = props.isotopeRef
  const categoryAll = 'all'
  const categories = [categoryAll].concat(props.categories)
  const [category, setCategory] = useState(categoryAll);

  return (
    <Container className="categories" textAlign="center">
      {categories.map(btnCategory => (
        <FilterButton key={btnCategory}
          label={btnCategory}
          active={category === btnCategory}
          onClick={() => {
            setCategory(btnCategory)
            if (isotopeRef.current) {
              const categoryFilter = (btnCategory !== categoryAll) ? btnCategory : null
              isotopeRef.current.filterByCategory(categoryFilter)
            }
          }}
        />
      ))}
    </Container>)
}

function FilterButton(props) {
  return (
    <Button as="h2" size="big" className={props.active ? "active" : null}
      onClick={props.onClick.bind(this)}>
      <CategoryIcon type={props.label} />{props.label}</Button>
  )
}

export default ProjectsCategoryFilterMenu