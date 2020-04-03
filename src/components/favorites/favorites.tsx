import * as React from "react";
import {getCitiesList} from "../../utils";
import PlaceCard from "../place-card/place-card";
import {getFavoriteOffers} from "../../reducer/offers/selectors";
import {connect} from "react-redux";
import NameSpace from "../../reducer/name-space";
import {Operation} from "../../reducer/offers/offers";
import FavoritesEmpty from "../favorites-empty/favorites-empty";
import withPlaceCardComponent from "../../hocs/with-place-card-component/with-place-card-component";
import {Offer} from "../../types";
import {Link} from "react-router-dom";
import {AppRoute, AuthorizationStatus} from "../../const";

interface Props {
  addToFavorite: () => void;
  authEmail: string;
  authorizationStatus: string | null;
  isFavoritesLoading: boolean;
  loadFavoriteOffers: () => void;
  favoriteOffers: Offer[];
  onCardHover: () => void;
  onCardTitleClick: () => void;
}

const FavoriteOfferType = `favorites`;

const PlaceCardWrapped = withPlaceCardComponent(PlaceCard);

class Favorites extends React.PureComponent<Props, {}> {
  componentDidMount() {
    const {loadFavoriteOffers} = this.props;
    loadFavoriteOffers();
  }

  render() {
    const {authorizationStatus, addToFavorite, authEmail, isFavoritesLoading, favoriteOffers, onCardHover, onCardTitleClick} = this.props;


    if (isFavoritesLoading) {
      return false;
    }

    if (!favoriteOffers.length) {
      return <FavoritesEmpty authorizationStatus={authorizationStatus} authEmail={authEmail}/>;
    }

    const citiesList = getCitiesList(favoriteOffers);
    return (
      <div className="page">
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

        <main className="page__main page__main--favorites">
          <div className="page__favorites-container container">
            <section className="favorites">
              <h1 className="favorites__title">Saved listing</h1>
              <ul className="favorites__list">
                {citiesList.map((city) => {
                  return (
                    <li className="favorites__locations-items" key={city}>
                      <div className="favorites__locations locations locations--current">
                        <div className="locations__item">
                          <a className="locations__item-link" href="#">
                            <span>{city}</span>
                          </a>
                        </div>
                      </div>
                      <div className="favorites__places">
                        {favoriteOffers.filter((offer) => offer.city.name === city).map((card) => {
                          return (
                            <PlaceCardWrapped
                              authorizationStatus={authorizationStatus}
                              addToFavorite={addToFavorite}
                              onMouseEnter={onCardHover}
                              onClick={onCardTitleClick}
                              offer={card}
                              key={card.id}
                              offersView={FavoriteOfferType}
                            />);
                        })}
                      </div>
                    </li>);
                }
                )}
              </ul>
            </section>
          </div>
        </main>

        <footer className="footer">
          <Link to={AppRoute.ROOT} className="header__logo-link header__logo-link--active">
            <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33"/>
          </Link>
        </footer>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  authEmail: state[NameSpace.USER].authEmail,
  authorizationStatus: state[NameSpace.USER].authorizationStatus,
  isFavoritesLoading: state[NameSpace.OFFERS].isFavoritesLoading,
  favoriteOffers: getFavoriteOffers(state),
});

const mapDispatchToProps = (dispatch) => ({
  addToFavorite(offer) {
    dispatch(Operation.addToFavorite(offer));
  },
  loadFavoriteOffers() {
    dispatch(Operation.loadFavoriteOffers());
  },
});

export {Favorites};
export default connect(mapStateToProps, mapDispatchToProps)(Favorites);

