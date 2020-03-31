import * as React from "react";
import {connect} from "react-redux";
import {getAvailableOffers} from "../../reducer/offers/selectors";
import {Subtract} from "utility-types";
import {Offer, SortType} from "../../types";

interface State {
  activeSortType: SortType;
  isOpened: boolean;
  sortedOffers: Offer[];
}

interface Props {
  availableOffers: Offer[];
  render: (sortedOffers: Offer[]) => void;
}

interface InjectingProps {
  onSortTypeClick: () => void;
  onSortTypeChange: () => void;
}

const withSortingComponent = (Component) => {
  type P = React.ComponentProps<typeof Component>;
  type T = Props & Subtract<P, InjectingProps>;

  class WithSortingComponent extends React.PureComponent<T, State> {
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

  const mapStateToProps = (state) => ({
    availableOffers: getAvailableOffers(state),
  });

  return connect(mapStateToProps, null)(WithSortingComponent);
};

export default withSortingComponent;
