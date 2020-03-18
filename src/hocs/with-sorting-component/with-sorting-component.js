import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {SortType} from "../../const";
import {offerShape} from "../../prop-types.jsx";
import {connect} from "react-redux";
import {getAvailableOffers} from "../../reducer/offers/selectors";
import {compose} from "redux";

const withSortingComponent = (Component) => {
  class WithSortingComponent extends PureComponent {
    constructor(props) {
      super(props);

      this.handleSortTypeClick = this.handleSortTypeClick.bind(this);
      this.handleSortTypeChange = this.handleSortTypeChange.bind(this);
      this.state = {
        activeSortType: SortType.POPULAR,
        isOpened: false,
        sortedOffers: this.props.availableOffers,
      };
    }

    componentDidUpdate(prevProps) {
      if (prevProps.availableOffers !== this.props.availableOffers) {
        this.setState({
          activeSortType: SortType.POPULAR,
          sortedOffers: this.props.availableOffers,
        });
      }
    }

    handleSortTypeClick() {
      this.setState((prevState) => ({
        isOpened: !prevState.isOpened,
      }));
    }

    handleSortTypeChange(evt) {
      const {availableOffers} = this.props;
      const sortType = evt.target.dataset.sortType;
      let sortedOffers = [];
      switch (sortType) {
        case SortType.POPULAR:
          sortedOffers = availableOffers;
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
    }

    render() {
      const {activeSortType, isOpened, sortedOffers} = this.state;
      return (
        <React.Fragment>
          <Component
            {...this.props}
            activeSortType={activeSortType}
            isOpened={isOpened}
            onSortTypeClick={this.handleSortTypeClick}
            onSortTypeChange={this.handleSortTypeChange}
          >
          </Component>
          {this.props.render(sortedOffers)}
        </React.Fragment>
      );
    }
  }

  WithSortingComponent.propTypes = {
    availableOffers: PropTypes.arrayOf(offerShape),
    render: PropTypes.func.isRequired,
  };

  return WithSortingComponent;
};

const mapStateToProps = (state) => ({
  availableOffers: getAvailableOffers(state),
});

const composedWithSortingComponent = compose(
    connect(mapStateToProps, null),
    withSortingComponent
);


export default composedWithSortingComponent;
