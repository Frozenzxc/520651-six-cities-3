import * as React from "react";
import {Link} from "react-router-dom";
import Map from "../map/map";
import * as leaflet from "leaflet";
import {AppRoute, OfferType} from "../../const";
import CitiesList from "../cities-list/cities-list";
import Sort from "../sort/sort";
import withSortingComponent from "../../hocs/with-sorting-component/with-sorting-component";
import PlacesList from "../places-list/places-list";
import MainEmpty from "../main-empty/main-empty";
import {AuthorizationStatus} from "../../const";
import {Offer} from "../../types";

interface Props {
  activeOffer: Offer | null;
  availableOffers: Offer[];
  authEmail: string;
  authorizationStatus: string | null;
  currentCity: string;
  onCardHover: () => void;
  onCardTitleClick: () => void;
}

const SortWrapped = withSortingComponent(Sort);

const Main: React.FunctionComponent<Props> = (props: Props) => {
  const {activeOffer, availableOffers, authEmail, authorizationStatus, currentCity, onCardHover, onCardTitleClick} = props;

  return (
    <div className="page page--gray page--main">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link to={AppRoute.ROOT} className="header__logo-link header__logo-link--active">
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41"/>
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
      {availableOffers.length ?
        <main className="page__main page__main--index">
          <h1 className="visually-hidden">Cities</h1>
          <CitiesList />
          <div className="cities">
            <div className="cities__places-container container">
              <section className="cities__places places">
                <h2 className="visually-hidden">Places</h2>
                <b className="places__found">{availableOffers.length} places to stay in {currentCity}</b>
                <SortWrapped render={(offers) => (
                  <PlacesList
                    offers={offers}
                    onCardHover={onCardHover}
                    onCardTitleClick={onCardTitleClick}
                    offersView={OfferType.ALL}
                  />)}
                />
              </section>
              <div className="cities__right-section">
                <section className="cities__map map">
                  <Map
                    activeOffer={activeOffer}
                    offers={availableOffers}
                    leaflet={leaflet}
                  />
                </section>
              </div>
            </div>
          </div>
        </main> : <MainEmpty/>}
    </div>
  );
};

export default Main;
