import * as React from "react";
import * as renderer from "react-test-renderer";
import {Favorites} from "./favorites";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import NameSpace from "../../reducer/name-space";
import {AuthorizationStatus} from "../../const";
import favoriteOffers from "../../test-mocks/test-favorite-offers";
import {BrowserRouter} from "react-router-dom";
import {noop} from "../../utils";

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
            addToFavorite={noop}
            favoriteOffers={favoriteOffers}
            loadFavoriteOffers={noop}
            isFavoritesLoading={false}
            authorizationStatus={AuthorizationStatus.AUTH}
            authEmail={`AAA@adfg.ru`}
            onCardHover={noop}
            onCardTitleClick={noop}
          />
        </BrowserRouter>
      </Provider>
  )
        .toJSON();

  expect(tree).toMatchSnapshot();
});
