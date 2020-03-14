import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {SortType} from "../../const";
import {offerShape} from "../../prop-types.jsx";
import {ActionCreator} from "../../actions";
import {connect} from "react-redux";

const withSortingComponent = (Component) => {
  class WithSortingComponent extends PureComponent {
    constructor(props) {
      super(props);

      this._defaultOffers = this.props.availableOffers;
      this.handleSortTypeClick = this.handleSortTypeClick.bind(this);
      this.handleSortTypeChange = this.handleSortTypeChange.bind(this);
      this.state = {
        activeSortType: SortType.POPULAR,
        isOpened: false,
        sortedOffers: [],
      };
    }

    handleSortTypeClick() {
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
      const {activeSortType, isOpened} = this.state;
      return (
        <Component
          {...this.props}
          activeSortType={activeSortType}
          isOpened={isOpened}
          onSortTypeClick={this.handleSortTypeClick}
          onSortTypeChange={this.handleSortTypeChange}
        />
      );
    }
  }


  WithSortingComponent.propTypes = {
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

  return connect(mapStateToProps, mapDispatchToProps)(WithSortingComponent);
};


export default withSortingComponent;
