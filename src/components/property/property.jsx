import React, {PureComponent} from "react";
import {offerShape} from "../../prop-types.jsx";
import {getRating} from "../../common";
import ReviewsList from "../reviews-list/reviews-list.jsx";
import PlacesList from "../places-list/places-list.jsx";
import {OfferType, AuthorizationStatus} from "../../const";
import PropTypes from "prop-types";
import Map from "../map/map.jsx";
import leaflet from "leaflet";
import ReviewsForm from "../reviews-form/reviews-form.jsx";
import {Operation as DataOperation} from "../../reducer/offers/offers";
import {getNearbyOffers, getReviews} from "../../reducer/offers/selectors";
import NameSpace from "../../reducer/name-space";
import {connect} from "react-redux";
import {reviewShape} from "../../prop-types.jsx";
import ReviewPostError from "../review-post-error/review-post-error.jsx";

class Property extends PureComponent {
  componentDidMount() {
    const {loadPropertyData} = this.props;
    loadPropertyData(this.props.offer.id);
  }

  render() {
    const {authorizationStatus, isPropertyLoading, nearbyOffers, onCardTitleClick, onCardHover, reviews} = this.props;

    if (isPropertyLoading) {
      return false;
    }

    const {
      bedrooms,
      description,
      id,
      host,
      maxAdults,
      goods,
      isPremium,
      price,
      rating,
      images,
      title,
      type,
    } = this.props.offer;


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
                </div>
              </div>
              <ReviewsList reviews={reviews}/>
              {authorizationStatus === AuthorizationStatus.AUTH && <ReviewsForm id={id}><ReviewPostError/></ReviewsForm>}
            </div>
          </div>

          <section className="property__map map">
            <Map
              activeOffer={this.props.offer}
              offers={nearbyOffers}
              leaflet={leaflet}
            />
          </section>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <PlacesList
              offers={nearbyOffers}
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
  authorizationStatus: PropTypes.string.isRequired,
  isPropertyLoading: PropTypes.bool.isRequired,
  loadPropertyData: PropTypes.func.isRequired,
  offer: offerShape.isRequired,
  onCardHover: PropTypes.func.isRequired,
  onCardTitleClick: PropTypes.func.isRequired,
  nearbyOffers: PropTypes.arrayOf(offerShape),
  reviews: PropTypes.arrayOf(reviewShape).isRequired,
};

const mapStateToProps = (state) => ({
  authorizationStatus: state[NameSpace.USER].authorizationStatus,
  isPropertyLoading: state[NameSpace.OFFERS].isPropertyLoading,
  nearbyOffers: getNearbyOffers(state),
  reviews: getReviews(state),
});

const mapDispatchToProps = (dispatch) => ({
  loadPropertyData(id) {
    dispatch(DataOperation.loadNearbyOffers(id));
    dispatch(DataOperation.loadReviews(id));
  },

});

export {Property};
export default connect(mapStateToProps, mapDispatchToProps)(Property);
