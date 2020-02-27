import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {offerShape} from "../../prop-types.jsx";
import {getRating} from "../../common";
import {OfferType} from "../../const";

class PlaceCard extends PureComponent {
  constructor(props) {
    super(props);

    this._handleHover = this._handleHover.bind(this);
    this._handleTitleClick = this._handleTitleClick.bind(this);
  }

  _handleHover() {
    const offer = this.props.offer;
    this.props.onMouseEnter(offer);
  }

  _handleTitleClick() {
    const {offer, onClick} = this.props;
    onClick(offer);
  }

  render() {
    const {offer, offersView} = this.props;
    const {
      premium,
      price,
      rating,
      src,
      title,
      type,
    } = offer;

    const cardRating = getRating(rating);

    return (
      <article
        className={`${offersView}-places__card place-card`}
        onMouseEnter={this._handleHover}
      >
        {premium && <div className="place-card__mark">
          <span>Premium</span>
        </div>}
        <div className={`${offersView}-image-wrapper place-card__image-wrapper`}>
          <a href="#">
            <img className="place-card__image" src={src[0]} width="260"
              height="200" alt="Place image"/>
          </a>
        </div>
        <div className="place-card__info">
          <div className="place-card__price-wrapper">
            <div className="place-card__price">
              <b className="place-card__price-value">&euro;{price}</b>
              <span className="place-card__price-text">&#47;&nbsp;night</span>
            </div>
            <button className="place-card__bookmark-button button" type="button">
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
            <a href="#">{title}</a>
          </h2>
          <p className="place-card__type">{type}</p>
        </div>
      </article>
    );
  }
}

PlaceCard.propTypes = {
  onClick: PropTypes.func,
  onCardHover: PropTypes.func,
  onMouseEnter: PropTypes.func,
  offer: offerShape.isRequired,
  offersView: PropTypes.string,
};

export default PlaceCard;
