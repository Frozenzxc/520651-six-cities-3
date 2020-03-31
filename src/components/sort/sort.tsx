import * as React from "react";

interface Props {
  activeSortType: string;
  isOpened: boolean;
  onSortTypeClick: () => void;
  onSortTypeChange: () => void;
}

const SortType = {
  POPULAR: `Popular`,
  PRICE_TO_HIGH: `Price: low to high`,
  PRICE_TO_LOW: `Price: high to low`,
  RATING: `Top rated first`,
};


const Sort: React.FunctionComponent<Props> = (props: Props) => {
  const {activeSortType, isOpened, onSortTypeClick, onSortTypeChange} = props;

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span
        onClick={onSortTypeClick}
        className="places__sorting-type"
        tabIndex={0}>
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
          tabIndex={0}>Popular</li>
        <li
          onClick={onSortTypeChange}
          className={`places__option ${activeSortType === SortType.PRICE_TO_HIGH && `places__option--active`}`}
          data-sort-type={SortType.PRICE_TO_HIGH}
          tabIndex={0}>Price: low to high</li>
        <li
          onClick={onSortTypeChange}
          className={`places__option ${activeSortType === SortType.PRICE_TO_LOW && `places__option--active`}`}
          data-sort-type={SortType.PRICE_TO_LOW}
          tabIndex={0}>Price: high to low</li>
        <li
          onClick={onSortTypeChange}
          className={`places__option ${activeSortType === SortType.RATING && `places__option--active`}`}
          data-sort-type={SortType.RATING}
          tabIndex={0}>Top rated first</li>
      </ul>
    </form>
  );
};

export default Sort;
