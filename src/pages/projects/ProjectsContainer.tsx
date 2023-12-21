import React, { Component, ReactNode } from 'react';
import Isotope from 'isotope-layout';

type ProjectsContainerProps = {
  children: ReactNode;
  category: string | null;
  language: string | null;
};

type ProjectsContainerState = {
  isotope: Isotope | null;
};

export default class ProjectsContainer extends Component<
  ProjectsContainerProps,
  ProjectsContainerState
> {
  category: string | null = null;
  language: string | null = null;
  search: string | null = null;
  itemGrid: React.RefObject<HTMLDivElement>;
  currentFilterFunc: ((element: HTMLElement) => boolean) | undefined;

  constructor(props: ProjectsContainerProps) {
    super(props);
    const { category = null, language = null } = props;
    this.state = { isotope: null };
    this.itemGrid = React.createRef();
    this.filterByCategory(category);
    this.filterByLanguage(language);
    this.filterBySearch(null);
  }

  componentDidMount() {
    const { isotope } = this.state;

    if (!isotope) {
      this.setState({
        isotope: new Isotope(this.itemGrid.current!, {
          itemSelector: '.project-item',
          getSortData: {
            stars: '[data-stars] parseInt',
            lastUpdate: '[data-last-update] parseInt',
            bookmarked: '[data-bookmarked]',
          },
          masonry: {
            fitWidth: true,
            gutter: 20,
          },
          filter: this.currentFilterFunc,
        }),
      });
    } else {
      isotope.reloadItems();
    }
  }

  componentDidUpdate(prevProps: ProjectsContainerProps) {
    const { category } = this.props;
    if (category !== prevProps.category) {
      this.filterByCategory(category);
    }
  }

  sortByStars() {
    const { isotope } = this.state;
    isotope?.arrange({
      sortBy: 'stars',
      sortAscending: false,
    });
  }

  sortByLastCommit() {
    const { isotope } = this.state;

    isotope?.arrange({
      sortBy: 'lastUpdate',
      sortAscending: true,
    });
  }

  sortByBookmarked() {
    // Update everytime, as bookmarks are dynamic. To be improved.
    const { isotope } = this.state;

    // @ts-ignore
    isotope?.updateSortData();
    isotope?.arrange({
      sortBy: 'bookmarked',
      sortAscending: false,
    });
  }

  filterFunction(): (element: HTMLElement) => boolean {
    const category = this.category;
    const language = this.language;
    const search = this.search;

    const categoryFilter = (itemElement: HTMLElement): boolean => {
      if (category) {
        return itemElement.getAttribute('data-category')!.split(' ').includes(category);
      }
      return true;
    };

    const languagesFilter = (itemElement: HTMLElement): boolean => {
      if (language) {
        return (
          itemElement
            .querySelector('.languages')!
            // @ts-ignore: innerText present for <p>
            .innerText.toLowerCase()
            .split(', ')
            .includes(language.toLowerCase())
        );
      }
      return true;
    };

    const searchFilter = (itemElement: HTMLElement): boolean => {
      if (search) {
        return (
          itemElement.getAttribute('data-name')!.includes(search) ||
          itemElement.getAttribute('data-owner')!.includes(search) ||
          itemElement.getAttribute('data-desc')!.includes(search) || false
        );
      }
      return true;
    };

    return (itemElement: HTMLElement) =>
      categoryFilter(itemElement) &&
      languagesFilter(itemElement) &&
      searchFilter(itemElement);
  }

  updateFilter() {
    const { isotope } = this.state;
    this.currentFilterFunc = this.filterFunction();

    if (isotope) {
      isotope.arrange({ filter: this.currentFilterFunc });
    }
  }

  filterByCategory(category: string | null) {
    this.category = category !== 'all' ? category || null : null;
    this.updateFilter();
  }

  filterByLanguage(language: string | null) {
    this.language = language || null;
    this.updateFilter();
  }

  filterBySearch(search: string | null) {
    this.search = search ? search.toLowerCase() : null;
    this.updateFilter();
  }

  shuffle() {
    const { isotope } = this.state;
    if (isotope) {
      isotope.shuffle();
    }
  }

  render() {
    const { children } = this.props;

    return (
      // eslint-disable-next-line no-return-assign
      <div className="item-grid" ref={this.itemGrid}>
        {children}
      </div>
    );
  }
}
