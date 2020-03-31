import React from "react";
import PropTypes from "prop-types";
import {offerShape} from "../../prop-types.jsx";
import {getRating} from "../../common";
import {OfferType} from "../../const";
import {Link} from "react-router-dom";

const getPropertyPath = (id) => {
  return `/offer/${id}`;
};

const PlaceCard = (props) => {
  const {isFavorite, offer, offersView, onCardHover, onFavoriteClick, onTitleClick} = props;
  const {
    id,
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
      onMouseEnter={onCardHover}
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
            className={`place-card__bookmark-button button ${isFavorite && `place-card__bookmark-button--active`}`}
            type="button"
            onClick={onFavoriteClick}
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
          onClick={onTitleClick}
          className="place-card__name">
          <Link to={getPropertyPath(id)}>{title}</Link>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
};


PlaceCard.propTypes = {
  isFavorite: PropTypes.bool.isRequired,
  onCardHover: PropTypes.func.isRequired,
  onFavoriteClick: PropTypes.func.isRequired,
  onTitleClick: PropTypes.func.isRequired,
  offer: offerShape.isRequired,
  offersView: PropTypes.string,
};

export default PlaceCard;
