import React from "react";
import renderer from "react-test-renderer";
import {Favorites} from "./favorites";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import NameSpace from "../../reducer/name-space";
import {AuthorizationStatus} from "../../const";
import favoriteOffers from "../../test-mocks/test-favorite-offers";

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
        <Favorites
          favoriteOffers={favoriteOffers}
          loadFavoriteOffers={() => {}}
          isFavoritesLoading={false}
          authorizationStatus={AuthorizationStatus.AUTH}
          authEmail={`AAA@adfg.ru`}
        />
      </Provider>
  )
        .toJSON();

  expect(tree).toMatchSnapshot();
});
