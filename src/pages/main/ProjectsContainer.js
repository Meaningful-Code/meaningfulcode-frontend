import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Isotope from 'isotope-layout';

export default class ProjectsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { isotope: null };
    this.category = null;
    this.language = null;
  }

  // set up isotope
  componentDidMount() {
    const { node } = this;
    const { isotope } = this.state;

    if (!isotope) {
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
      isotope.reloadItems();
    }
  }

  // update isotope layout
  componentDidUpdate() {
    const { isotope } = this.state;

    if (isotope) {
      isotope.reloadItems();
      isotope.layout();
    }
  }

  sortByStars() {
    const { isotope } = this.state;

    isotope.arrange({
      sortBy: 'stars',
      sortAscending: false
    });
  }

  sortByLastCommit() {
    const { isotope } = this.state;

    isotope.arrange({
      sortBy: 'lastUpdate',
      sortAscending: true
    });
  }

  sortByBookmarked() {
    // Update everytime, as bookmarks are dynamic. To be improved.
    const { isotope } = this.state;

    isotope.updateSortData();
    isotope.arrange({
      sortBy: 'bookmarked',
      sortAscending: false
    });
  }

  updateFilter() {
    const { category, language, search } = this;
    const { isotope } = this.state;

    const categoryFilter = (itemElement) => {
      if (category) {
        return itemElement.getAttribute('data-category').split(' ').includes(category);
      }
      return true;
    };

    const languagesFilter = (itemElement) => {
      if (language) {
        return itemElement
          .querySelector('.languages')
          .innerText.split(', ')
          .includes(language);
      }
      return true;
    };

    const searchFilter = (itemElement) => {
      if (search) {
        return (
          itemElement.getAttribute('data-name').includes(search) ||
          itemElement.getAttribute('data-owner').includes(search) ||
          itemElement.getAttribute('data-desc').includes(search)
        );
      }
      return true;
    };

    isotope.arrange({
      filter: (itemElement) => {
        return (
          categoryFilter(itemElement) &&
          languagesFilter(itemElement) &&
          searchFilter(itemElement)
        );
      }
    });
  }

  filterByCategory(category) {
    this.category = category === '' ? null : category;
    this.updateFilter();
  }

  filterByLanguage(language) {
    this.language = language === '' ? null : language;
    this.updateFilter();
  }

  filterBySearch(search) {
    this.search = search === '' ? null : search.toLowerCase();
    this.updateFilter();
  }

  shuffle() {
    const { isotope } = this.state;
    isotope.shuffle();
  }

  render() {
    const { children } = this.props;

    return (
      // eslint-disable-next-line no-return-assign
      <div className="item-grid" ref={(node) => (this.node = node)}>
        {children}
      </div>
    );
  }
}

ProjectsContainer.propTypes = {
  children: PropTypes.arrayOf(PropTypes.object).isRequired
};
