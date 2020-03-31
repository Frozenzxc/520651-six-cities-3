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

