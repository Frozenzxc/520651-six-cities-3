import * as React from "react";
import {AppRoute, AuthorizationStatus} from "../../const";
import {Subtract} from "utility-types";
import history from "../../history";
import {Offer} from "../../types";

interface State {
  isFavorite: boolean;
}

interface Props {
  addToFavorite: (offer: Offer) => void;
  authorizationStatus: string | null;
  onClick: (offer: Offer) => void;
  onMouseEnter: (offer: Offer) => void;
  offer: Offer;
  offersView: string;
}

interface InjectingProps {
  onCardHover: () => void;
  onTitleClick: () => void;
  onFavoriteClick: () => void;
}

const withPlaceCardComponent = (Component) => {
  type P = React.ComponentProps<typeof Component>;
  type T = Props & Subtract<P, InjectingProps>;

  class WithPlaceCardComponent extends React.PureComponent<T, State> {
    constructor(props) {
      super(props);

      this.handleHover = this.handleHover.bind(this);
      this.handleFavoriteClick = this.handleFavoriteClick.bind(this);
      this.handleTitleClick = this.handleTitleClick.bind(this);

      this.state = {
        isFavorite: this.props.offer.isFavorite,
      };
    }

    handleHover() {
      const offer = this.props.offer;
      this.props.onMouseEnter(offer);
    }

    handleFavoriteClick() {
      const {addToFavorite, authorizationStatus, offer} = this.props;

      if (authorizationStatus === AuthorizationStatus.NO_AUTH) {
        return history.push(AppRoute.LOGIN);
      }

      addToFavorite(offer);

      this.setState((prevState) => ({
        isFavorite: !prevState.isFavorite,
      }));

      return false;
    }

    handleTitleClick() {
      const {offer, onClick} = this.props;
      onClick(offer);
    }

    render() {

      return (
        <Component
          {...this.props}
          isFavorite={this.state.isFavorite}
          onCardHover={this.handleHover}
          onTitleClick={this.handleTitleClick}
          onFavoriteClick={this.handleFavoriteClick}
        />
      );
    }
  }

  return WithPlaceCardComponent;
};

export default withPlaceCardComponent;


