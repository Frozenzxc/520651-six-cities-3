import React from "react";
import {AppRoute, AuthorizationStatus} from "../../const";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";

const FavoritesEmpty = ({authEmail, authorizationStatus}) => {
  return (
    <div className="page page--favorites-empty">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <a className="header__logo-link" href="main.html">
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81"
                  height="41"/>
              </a>
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  {authorizationStatus === AuthorizationStatus.NO_AUTH ?
                    <Link
                      className="header__nav-link header__nav-link--profile"
                      to={AppRoute.LOGIN}>
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

      <main className="page__main page__main--favorites page__main--favorites-empty">
        <div className="page__favorites-container container">
          <section className="favorites favorites--empty">
            <h1 className="visually-hidden">Favorites (empty)</h1>
            <div className="favorites__status-wrapper">
              <b className="favorites__status">Nothing yet saved.</b>
              <p className="favorites__status-description">Save properties to narrow down search or plan
                                yor future trips.</p>
            </div>
          </section>
        </div>
      </main>
      <footer className="footer">
        <a className="footer__logo-link" href="main.html">
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33"/>
        </a>
      </footer>
    </div>
  );
};

FavoritesEmpty.propTypes = {
  authEmail: PropTypes.string,
  authorizationStatus: PropTypes.string.isRequired,
};

export default FavoritesEmpty;
