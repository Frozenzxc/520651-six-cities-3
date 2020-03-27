import React from 'react';
import renderer from 'react-test-renderer';
import {Provider} from "react-redux";
import PlacesList from "./places-list.jsx";
import {AuthorizationStatus, OfferType} from "../../const";
import offers from "../../test-mocks/test-offers";
import configureStore from "redux-mock-store";
import NameSpace from "../../reducer/name-space";

const mockStore = configureStore([]);

it(`PlacesList is rendered correctly`, () => {
  const store = mockStore({
    [NameSpace.USER]: {
      authorizationStatus: AuthorizationStatus.AUTH,
    }
  });

  const tree = renderer.create(
      <Provider store={store}>
        <PlacesList
          addToFavorite={() => {}}
          authorizationStatus={AuthorizationStatus.AUTH}
          offers={offers}
          onCardHover={() => {}}
          onCardTitleClick={() => {}}
          offersView={OfferType.ALL}
        />
      </Provider>
  ).toJSON();

  expect(tree).toMatchSnapshot();
});

it(`PlacesList is rendered correctly without offers`, () => {
  const store = mockStore({
    [NameSpace.USER]: {
      authorizationStatus: AuthorizationStatus.AUTH,
    }
  });

  const tree = renderer.create(
      <Provider store={store}>
        <PlacesList
          addToFavorite={() => {}}
          authorizationStatus={AuthorizationStatus.AUTH}
          offers={[]}
          onCardHover={() => {}}
          onCardTitleClick={() => {}}
          offersView={OfferType.ALL}
        />
      </Provider>
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
