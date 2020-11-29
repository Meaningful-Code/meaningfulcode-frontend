import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Isotope from 'isotope-layout';


export default class ProjectsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { isotope: null };
    this.category = null
    this.language = null
  }

  render() {
    return (
      <div className="item-grid">
        {this.props.children}
      </div>
    )
  }

  // set up isotope
  componentDidMount() {
    const node = ReactDOM.findDOMNode(this);
    if (!this.state.isotope) {
      this.setState({
        isotope: new Isotope(node, {
          itemSelector: '.project-item',
          getSortData: {
            stars: '.stars parseInt',
            lastUpdate: '[data-last-update] parseInt',
            bookmarked: '[data-bookmarked]'
          },
          masonry: {
            isFitWidth: true,
            gutter: 20
          }
        })
      });
    } else {
      this.state.isotope.reloadItems();
    }
  }

  // update isotope layout
  componentDidUpdate() {
    if (this.state.isotope) {
      this.state.isotope.reloadItems();
      this.state.isotope.layout();
    }
  }

  sortByStars() {
    this.state.isotope.arrange({
      sortBy: 'stars',
      sortAscending: false
    });
  }

  sortByLastCommit() {
    this.state.isotope.arrange({
      sortBy: 'lastUpdate',
      sortAscending: true
    });
  }

  sortByBookmarked() {
    // Update everytime, as bookmarks are dynamic. To be improved.
    this.state.isotope.updateSortData()
    this.state.isotope.arrange({
      sortBy: 'bookmarked',
      sortAscending: false
    });
  }

  updateFilter() {
    const category = this.category
    const languages = this.language
    var categoryFilter = function (itemElement) {
      if (category)
        return itemElement.getAttribute("data-category").split(" ").includes(category)
      else
        return true
    }
    var languagesFilter = function (itemElement) {
      if (languages)
        return itemElement.querySelector(".languages").innerText.split(", ").includes(languages);
      else
        return true
    }

    this.state.isotope.arrange({
      filter: function (itemElement) {
        return categoryFilter(itemElement) && languagesFilter(itemElement)
      }
    });
  }

  filterByCategory(category) {
    if (category === "")
      category = null

    this.category = category
    this.updateFilter()
  }

  filterByLanguage(language) {
    if (language === "")
      language = null

    this.language = language
    this.updateFilter()
  }

  shuffle() {
    this.state.isotope.shuffle();
  }
}