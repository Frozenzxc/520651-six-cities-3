import React, {PureComponent} from "react";
import {offerShape} from "../../prop-types.jsx";
import {getRating} from "../../common";
// eslint-disable-next-line
import ReviewsList from "../reviews-list/reviews-list.jsx";
import PlacesList from "../places-list/places-list.jsx";
import {OfferType} from "../../const";
import PropTypes from "prop-types";
import Map from "../map/map.jsx";
import leaflet from "leaflet";

class Property extends PureComponent {
  constructor(props) {
    super(props);
    this._offers = null;
  }

  render() {
    const {offers, onCardTitleClick, onCardHover} = this.props;


    const {
      bedrooms,
      description,
      host,
      id,
      maxAdults,
      goods,
      isPremium,
      price,
      rating,
      images,
      title,
      type,
    } = this.props.offer;

    this._offers = offers.filter((it) => it.id !== id);

    const cardRating = getRating(rating);

    return (
      <main className="page__main page__main--property">
        <section className="property">
          <div className="property__gallery-container container">
            <div className="property__gallery">
              {images.map((photo, i) => {
                return (
                  <div className="property__image-wrapper" key={`photo-${i}`}>
                    <img className="property__image" src={photo} alt="Photo studio"/>
                  </div>
                );
              })
              }
            </div>
          </div>
          <div className="property__container container">
            <div className="property__wrapper">
              {isPremium && <div className="property__mark">
                <span>Premium</span>
              </div>}
              <div className="property__name-wrapper">
                <h1 className="property__name">{title}</h1>
                <button className="property__bookmark-button button" type="button">
                  <svg className="property__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark"/>
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="property__rating rating">
                <div className="property__stars rating__stars">
                  <span style={{width: cardRating}}/>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="property__rating-value rating__value">{rating}</span>
              </div>
              <ul className="property__features">
                <li className="property__feature property__feature--entire">
                  {type}
                </li>
                <li className="property__feature property__feature--bedrooms">
                  {bedrooms} Bedrooms
                </li>
                <li className="property__feature property__feature--adults">
                                  Max {maxAdults} adults
                </li>
              </ul>
              <div className="property__price">
                <b className="property__price-value">&euro;{price}</b>
                <span className="property__price-text">&nbsp;night</span>
              </div>
              <div className="property__inside">
                <h2 className="property__inside-title">What&apos;s inside</h2>
                <ul className="property__inside-list">
                  {goods.map((option) => {
                    return (
                      <li className="property__inside-item" key={`${option}`}>
                        {option}
                      </li>
                    );
                  })
                  }
                </ul>
              </div>
              <div className="property__host">
                <h2 className="property__host-title">Meet the host</h2>
                <div className="property__host-user user">
                  <div
                    className={`property__avatar-wrapper user__avatar-wrapper ${host.isPro && `property__avatar-wrapper--pro`}`}>
                    <img className="property__avatar user__avatar" src={host.avatar}
                      width="74" height="74" alt="Host avatar"/>
                  </div>
                  <span className="property__user-name">
                    {host.name}
                  </span>
                </div>
                <div className="property__description">
                  <p className="property__text">
                    {description}
                  </p>
                  <p className="property__text">
                    {description}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <section className="property__map map">
            <Map
              activeOffer={this.props.offer}
              offers={this._offers}
              leaflet={leaflet}
            />
          </section>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <PlacesList
              offers={this._offers}
              onCardHover={onCardHover}
              onCardTitleClick={onCardTitleClick}
              offersView={OfferType.NEARBY}
            />
          </section>
        </div>
      </main>
    );
  }
}

Property.propTypes = {
  offer: offerShape.isRequired,
  onCardHover: PropTypes.func.isRequired,
  onCardTitleClick: PropTypes.func.isRequired,
  offers: PropTypes.arrayOf(offerShape),
};

export default Property;
