import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {offerShape} from "../../prop-types.jsx";
import {ActionCreator} from "../../actions";
import {connect} from "react-redux";

const SortType = {
  POPULAR: `Popular`,
  PRICE_TO_HIGH: `Price: low to high`,
  PRICE_TO_LOW: `Price: high to low`,
  RATING: `Top rated first`,
};

class Sort extends PureComponent {
  constructor(props) {
    super(props);

    this._defaultOffers = this.props.availableOffers;
    this._handleSortTypeClick = this._handleSortTypeClick.bind(this);
    this.handleSortTypeChange = this.handleSortTypeChange.bind(this);
    this.state = {
      activeSortType: SortType.POPULAR,
      isOpened: false,
      sortedOffers: [],
    };
  }

  _handleSortTypeClick() {
    this.setState((prevState) => ({
      isOpened: !prevState.isOpened,
    }));
  }

  handleSortTypeChange(evt) {
    const {onSortTypeChange, availableOffers} = this.props;
    const sortType = evt.target.dataset.sortType;
    let sortedOffers = [];
    switch (sortType) {
      case SortType.POPULAR:
        sortedOffers = this._defaultOffers;
        break;
      case SortType.PRICE_TO_HIGH:
        sortedOffers = availableOffers.slice().sort((a, b) => a.price - b.price);
        break;
      case SortType.PRICE_TO_LOW:
        sortedOffers = availableOffers.slice().sort((a, b) => b.price - a.price);
        break;
      case SortType.RATING:
        sortedOffers = availableOffers.slice().sort((a, b) => b.rating - a.rating);
        break;
    }
    this.setState((prevState) => ({
      activeSortType: sortType,
      isOpened: !prevState.isOpened,
      sortedOffers,
    }));

    onSortTypeChange(sortedOffers);
  }


  render() {

    return (
      <form className="places__sorting" action="#" method="get">
        <span className="places__sorting-caption">Sort by</span>
        <span
          onClick={this._handleSortTypeClick}
          className="places__sorting-type"
          tabIndex="0">
          {this.state.activeSortType}
          <svg className="places__sorting-arrow" width="7" height="4">
            <use xlinkHref="#icon-arrow-select"/>
          </svg>
        </span>
        <ul className={`places__options places__options--custom ${this.state.isOpened && `places__options--opened`}`}>
          <li
            onClick={this.handleSortTypeChange}
            className={`places__option ${this.state.activeSortType === SortType.POPULAR && `places__option--active`}`}
            data-sort-type={SortType.POPULAR}
            tabIndex="0">Popular</li>
          <li
            onClick={this.handleSortTypeChange}
            className={`places__option ${this.state.activeSortType === SortType.PRICE_TO_HIGH && `places__option--active`}`}
            data-sort-type={SortType.PRICE_TO_HIGH}
            tabIndex="0">Price: low to high</li>
          <li
            onClick={this.handleSortTypeChange}
            className={`places__option ${this.state.activeSortType === SortType.PRICE_TO_LOW && `places__option--active`}`}
            data-sort-type={SortType.PRICE_TO_LOW}
            tabIndex="0">Price: high to low</li>
          <li
            onClick={this.handleSortTypeChange}
            className={`places__option ${this.state.activeSortType === SortType.RATING && `places__option--active`}`}
            data-sort-type={SortType.RATING}
            tabIndex="0">Top rated first</li>
        </ul>
      </form>
    );
  }
}

Sort.propTypes = {
  onSortTypeChange: PropTypes.func.isRequired,
  availableOffers: PropTypes.arrayOf(offerShape),
};

const mapStateToProps = (state) => ({
  availableOffers: state.availableOffers,
});

const mapDispatchToProps = (dispatch) => ({
  onSortTypeChange(offers) {
    dispatch(ActionCreator.sortTypeChange(offers));
  }

});

export {Sort};
export default connect(mapStateToProps, mapDispatchToProps)(Sort);
