import React, { PureComponent } from 'react';
import { number, func } from 'prop-types';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

class Pages extends PureComponent {
  static propTypes = {
    pageCount: number,
    fetchPeople: func.isRequired,
    resetState: func.isRequired,
    resetFilters: func.isRequired,
  };

  state = {
    activePage: 1,
    currentPage: 1,
    startPage: 1,
    endPage: 3,
  };

  changePage(page) {
    let startPage = this.state.startPage;
    let endPage = this.state.endPage;

    if (page !== 1 && page !== Math.ceil(this.props.pageCount / 10)) {
      if (page === this.state.endPage) {
        startPage = startPage + 1;
        endPage = endPage + 1;
      } else if (page === this.state.startPage) {
        endPage = endPage - 1;
        startPage = startPage - 1;
      }
    }
    if (this.state.activePage !== page) {
      this.props.fetchPeople(page);
      this.props.resetState();
      this.setState({
        startPage: startPage,
        endPage: endPage,
        activePage: page,
      });
      this.props.resetFilters();
    }
  }

  range = (start, end) => {
    return Array(end - start + 1)
      .fill()
      .map((_, idx) => start + idx);
  };

  renderPages() {
    return this.range(this.state.startPage, this.state.endPage).map((page, index) => {
      return (
        <PaginationItem className={this.state.activePage === page ? 'active' : null} key={index}>
          <PaginationLink onClick={() => this.changePage(page)}>{page}</PaginationLink>
        </PaginationItem>
      );
    });
  }
  render() {
    return <Pagination aria-label="Page navigation">{this.renderPages()}</Pagination>;
  }
}

export default Pages;
