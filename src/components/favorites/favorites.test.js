import React from "react";
import renderer from "react-test-renderer";
import {Favorites} from "./favorites";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import NameSpace from "../../reducer/name-space";
import {AuthorizationStatus} from "../../const";
import favoriteOffers from "../../test-mocks/test-favorite-offers";
import {BrowserRouter} from "react-router-dom";

const mockStore = configureStore([]);

it(`Should Favorites component render correctly`, () => {

  const store = mockStore({
    [NameSpace.USER]: {
      authorizationStatus: AuthorizationStatus.AUTH,
      authEmail: `AAA@adfg.ru`,
    },
    [NameSpace.OFFERS]: {
      favoriteOffers,
      isFavoritesLoading: true,
    }
  });

  const tree = renderer.create(
      <Provider store={store}>
        <BrowserRouter>
          <Favorites
            addToFavorite={() => {}}
            favoriteOffers={favoriteOffers}
            loadFavoriteOffers={() => {}}
            isFavoritesLoading={false}
            authorizationStatus={AuthorizationStatus.AUTH}
            authEmail={`AAA@adfg.ru`}
            onCardHover={() => {}}
            onCardTitleClick={() => {}}
          />
        </BrowserRouter>
      </Provider>
  )
        .toJSON();

  expect(tree).toMatchSnapshot();
});
