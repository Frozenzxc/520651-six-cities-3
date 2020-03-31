import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {AppRoute, AuthorizationStatus} from "../../const";
import history from "../../history";
import {offerShape} from "../../prop-types.jsx";

const withPlaceCardComponent = (Component) => {
  class WithPlaceCardComponent extends PureComponent {
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

  WithPlaceCardComponent.propTypes = {
    addToFavorite: PropTypes.func.isRequired,
    authorizationStatus: PropTypes.oneOfType([
      PropTypes.oneOf([null]),
      PropTypes.string.isRequired
    ]),
    onClick: PropTypes.func,
    onCardHover: PropTypes.func,
    onMouseEnter: PropTypes.func,
    offer: offerShape.isRequired,
    offersView: PropTypes.string,
  };

  return WithPlaceCardComponent;
};

export default withPlaceCardComponent;


