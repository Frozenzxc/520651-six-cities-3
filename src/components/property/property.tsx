import * as React from "react";
import {getRating} from "../../common";
import ReviewsList from "../reviews-list/reviews-list";
import PlacesList from "../places-list/places-list";
import {OfferType, AuthorizationStatus, AppRoute} from "../../const";
import Map from "../map/map";
import * as leaflet from "leaflet";
import ReviewsForm from "../reviews-form/reviews-form";
import {Operation as DataOperation} from "../../reducer/offers/offers";
import {getNearbyOffers, getOffers, getReviews} from "../../reducer/offers/selectors";
import NameSpace from "../../reducer/name-space";
import {connect} from "react-redux";
import ReviewPostError from "../review-post-error/review-post-error";
import {Link} from "react-router-dom";
import withReviewFormComponent from "../../hocs/with-review-form-component/with-review-form-component";
import {Offer, Review} from "../../types";

interface Props {
  authEmail: string;
  authorizationStatus: string | null;
  id: string;
  isLoading: boolean;
  isNearbyOffersLoading: boolean;
  isReviewsLoading: boolean;
  loadPropertyData: (id: string) => void;
  offers: Offer[];
  onCardHover: () => void;
  onCardTitleClick: () => void;
  nearbyOffers: Offer[];
  reviews: Review[];
}

const ReviewFormWrapped = withReviewFormComponent(ReviewsForm);

class Property extends React.PureComponent<Props, null> {
  private offer: Offer;

  componentDidMount() {
    const {loadPropertyData, id} = this.props;
    loadPropertyData(id);
  }

  render() {
    const {authEmail, authorizationStatus, isLoading, isNearbyOffersLoading, isReviewsLoading, nearbyOffers, offers, onCardTitleClick, onCardHover, reviews} = this.props;

    if (isLoading || isNearbyOffersLoading || isReviewsLoading) {
      return false;
    }

    this.offer = offers.find((offer) => offer.id === +this.props.id);

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
    } = this.offer;


    const cardRating = getRating(rating);
    return (
      <div className="page">
        <header className="header">
          <div className="container">
            <div className="header__wrapper">
              <div className="header__left">
                <Link to={AppRoute.ROOT} className="header__logo-link header__logo-link--active">
                  <img className="header__logo" src="../img/logo.svg" alt="6 cities logo" width="81" height="41"/>
                </Link>
              </div>
              <nav className="header__nav">
                <ul className="header__nav-list">
                  <li className="header__nav-item user">
                    {authorizationStatus === AuthorizationStatus.NO_AUTH ?
                      <Link
                        className="header__nav-link header__nav-link--profile"
                        to={AppRoute.FAVORITES}>
                        <span className="header__login">Sign in</span>
                      </Link> :
                      <Link
                        className="header__nav-link header__nav-link--profile"
                        to={AppRoute.FAVORITES}>
                        <div className="header__avatar-wrapper user__avatar-wrapper">
                        </div>
                        <span className="header__user-name user__name">{authEmail}</span>
                      </Link>
                    }
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </header>
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
                      <img className="property__avatar user__avatar" src={`../${host.avatar}`}
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
                {authorizationStatus === AuthorizationStatus.AUTH && <ReviewFormWrapped id={id}><ReviewPostError/></ReviewFormWrapped>}
              </div>
            </div>

            <section className="property__map map">
              <Map
                activeOffer={this.offer}
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
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  authorizationStatus: state[NameSpace.USER].authorizationStatus,
  isLoading: state[NameSpace.OFFERS].isLoading,
  isNearbyOffersLoading: state[NameSpace.OFFERS].isNearbyOffersLoading,
  isReviewsLoading: state[NameSpace.OFFERS].isReviewsLoading,
  nearbyOffers: getNearbyOffers(state),
  offers: getOffers(state),
  reviews: getReviews(state),
});

const mapDispatchToProps = (dispatch) => ({
  loadPropertyData(id) {
    dispatch(DataOperation.loadOffers());
    dispatch(DataOperation.loadReviews(id));
    dispatch(DataOperation.loadNearbyOffers(id));
  },

});

export {Property};
export default connect(mapStateToProps, mapDispatchToProps)(Property);
