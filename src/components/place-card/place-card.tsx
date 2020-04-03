import * as React from "react";
import {getRating} from "../../common";
import {Link} from "react-router-dom";
import {Offer} from "../../types";

interface Props {
  isFavorite: boolean;
  onCardHover: () => void;
  onFavoriteClick: () => void;
  onTitleClick: () => void;
  offer: Offer;
  offersView: string;
}

const OfferType = {
  ALL: `cities`,
  FAVORITES: `favorites`,
  NEARBY: `near`,
};

const getPropertyPath = (id) => {
  return `/offer/${id}`;
};

const PlaceCard: React.FunctionComponent<Props> = (props: Props) => {
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
        <a href="#" onClick={(evt) => evt.preventDefault()}>
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

export default PlaceCard;
