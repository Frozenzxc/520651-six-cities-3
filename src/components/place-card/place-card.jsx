import React, {PureComponent} from "react";
import history from "../../history";
import PropTypes from "prop-types";
import {offerShape} from "../../prop-types.jsx";
import {getRating} from "../../common";
import {AppRoute, AuthorizationStatus, OfferType} from "../../const";
import {Link} from "react-router-dom";

const getPropertyPath = (id) => {
  return `/offer/${id}`;
};

class PlaceCard extends PureComponent {
  constructor(props) {
    super(props);

    this._handleHover = this._handleHover.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
    this._handleTitleClick = this._handleTitleClick.bind(this);

    this.state = {
      isFavorite: this.props.offer.isFavorite,
    };
  }

  _handleHover() {
    const offer = this.props.offer;
    this.props.onMouseEnter(offer);
  }

  _handleFavoriteClick() {
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

  _handleTitleClick() {
    const {offer, onClick} = this.props;
    onClick(offer);
  }

  render() {
    const {offer, offersView} = this.props;
    const {
      isPremium,
      price,
      rating,
      previewImage,
      title,
      type,
    } = offer;

    const cardRating = getRating(rating);

    return (
      <article
        className={`${offersView}-places__card place-card`}
        onMouseEnter={this._handleHover}
      >
        {offersView === OfferType.FAVORITES ? `` : isPremium && <div className="place-card__mark">
          <span>Premium</span>
        </div>}
        <div className={`${offersView}-image-wrapper place-card__image-wrapper`}>
          <a href="#">
            <img className="place-card__image" src={previewImage} width={offersView === OfferType.FAVORITES ? `150` : `260`}
              height={offersView === OfferType.FAVORITES ? `110` : `200`} alt="Place image"/>
          </a>
        </div>
        <div className={`${offersView === OfferType.FAVORITES ? `favorites__card-info place-card__info` : `place-card__info`}`}>
          <div className="place-card__price-wrapper">
            <div className="place-card__price">
              <b className="place-card__price-value">&euro;{price}</b>
              <span className="place-card__price-text">&#47;&nbsp;night</span>
            </div>
            <button
              className={`place-card__bookmark-button button ${this.state.isFavorite && `place-card__bookmark-button--active`}`}
              type="button"
              onClick={this._handleFavoriteClick}
            >
              <svg className="place-card__bookmark-icon" width="18" height="19">
                <use xlinkHref="#icon-bookmark"/>
              </svg>
              <span className="visually-hidden">To bookmarks</span>
            </button>
          </div>
          <div className="place-card__rating rating">
            <div className="place-card__stars rating__stars">
              <span style={{width: cardRating}} />
              <span className="visually-hidden">Rating</span>
            </div>
          </div>
          <h2
            onClick={this._handleTitleClick}
            className="place-card__name">
            <Link to={getPropertyPath(this.props.offer.id)}>{title}</Link>
          </h2>
          <p className="place-card__type">{type}</p>
        </div>
      </article>
    );
  }
}

PlaceCard.propTypes = {
  addToFavorite: PropTypes.func.isRequired,
  authorizationStatus: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  onCardHover: PropTypes.func,
  onMouseEnter: PropTypes.func,
  offer: offerShape.isRequired,
  offersView: PropTypes.string,
};

export default PlaceCard;
