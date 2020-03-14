import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {SortType} from "../../const";

class Sort extends PureComponent {
  render() {
    const {activeSortType, isOpened, onSortTypeClick, onSortTypeChange} = this.props;
    return (
      <form className="places__sorting" action="#" method="get">
        <span className="places__sorting-caption">Sort by</span>
        <span
          onClick={onSortTypeClick}
          className="places__sorting-type"
          tabIndex="0">
          {activeSortType}
          <svg className="places__sorting-arrow" width="7" height="4">
            <use xlinkHref="#icon-arrow-select"/>
          </svg>
        </span>
        <ul className={`places__options places__options--custom ${isOpened && `places__options--opened`}`}>
          <li
            onClick={onSortTypeChange}
            className={`places__option ${activeSortType === SortType.POPULAR && `places__option--active`}`}
            data-sort-type={SortType.POPULAR}
            tabIndex="0">Popular</li>
          <li
            onClick={onSortTypeChange}
            className={`places__option ${activeSortType === SortType.PRICE_TO_HIGH && `places__option--active`}`}
            data-sort-type={SortType.PRICE_TO_HIGH}
            tabIndex="0">Price: low to high</li>
          <li
            onClick={onSortTypeChange}
            className={`places__option ${activeSortType === SortType.PRICE_TO_LOW && `places__option--active`}`}
            data-sort-type={SortType.PRICE_TO_LOW}
            tabIndex="0">Price: high to low</li>
          <li
            onClick={onSortTypeChange}
            className={`places__option ${activeSortType === SortType.RATING && `places__option--active`}`}
            data-sort-type={SortType.RATING}
            tabIndex="0">Top rated first</li>
        </ul>
      </form>
    );
  }
}

Sort.propTypes = {
  activeSortType: PropTypes.string.isRequired,
  isOpened: PropTypes.bool.isRequired,
  onSortTypeClick: PropTypes.func.isRequired,
  onSortTypeChange: PropTypes.func.isRequired,
};

export default Sort;
