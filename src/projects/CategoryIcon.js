import React from 'react';
import { Icon, List } from 'semantic-ui-react'

function CategoryIcon(props) {
  return (<Icon circular inverted color={getCategoryColor(props.type)} name={getCategoryIconName(props.type)} />)
}

function CategoryListIcon(props) {
  return (
    <List.Icon circular inverted color={getCategoryColor(props.type)} name={getCategoryIconName(props.type)} />)
}

function getCategoryIconName(type) {
  switch (type) {
    case "all": return "question"
    case "environment": return "leaf"
    case "humanitarian": return "food"
    case "accessibility": return "handicap"
    case "society": return "transgender alternate"
    case "health": return "dna"
    case "education": return "book"
    case "justice": return "balance scale"
    default: return "question"
  }
}

function getCategoryColor(type) {
  switch (type) {
    case "all": return "black"
    case "environment": return "green"
    case "humanitarian": return "orange"
    case "accessibility": return "blue"
    case "society": return "violet"
    case "health": return "teal"
    case "education": return "red"
    case "justice": return "yellow"
    default: return "black"
  }
}

export default CategoryIcon
export { CategoryListIcon }