import React from "react";
import PropTypes from "prop-types";
import PlacesList from "../places-list/places-list.jsx";
import {offerShape} from "../../prop-types.jsx";
import Map from "../map/map.jsx";
import leaflet from "leaflet";
import {OfferType} from "../../const";
import CitiesList from "../cities-list/cities-list.jsx";
import Sort from "../sort/sort.jsx";

const Main = ({activeOffer, availableOffers, currentCity, onCardHover, onCardTitleClick}) => {

  return (
    <div className="page page--gray page--main">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <a className="header__logo-link header__logo-link--active">
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41"/>
              </a>
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <a className="header__nav-link header__nav-link--profile" href="#">
                    <div className="header__avatar-wrapper user__avatar-wrapper">
                    </div>
                    <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <CitiesList />
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{availableOffers.length} places to stay in {currentCity}</b>
              <Sort
                offers={availableOffers}
              />
              <PlacesList
                onCardHover={onCardHover}
                onCardTitleClick={onCardTitleClick}
                offers={availableOffers}
                offersView={OfferType.ALL}
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
      </main>
    </div>
  );
};

Main.propTypes = {
  activeOffer: PropTypes.object,
  availableOffers: PropTypes.arrayOf(offerShape),
  currentCity: PropTypes.string.isRequired,
  onCardHover: PropTypes.func.isRequired,
  onCardTitleClick: PropTypes.func.isRequired,
  offers: PropTypes.arrayOf(offerShape),
};

export default Main;
