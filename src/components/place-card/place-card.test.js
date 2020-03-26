import React from 'react';
import renderer from 'react-test-renderer';
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import PlaceCard from "./place-card";
import offers from "../../test-mocks/test-offers";
import {AuthorizationStatus, OfferType} from "../../const";
import NameSpace from "../../reducer/name-space";

const offer = offers[0];
const mockStore = configureStore([]);

it(`PlaceCard is rendered correctly`, () => {

  const store = mockStore({
    [NameSpace.USER]: {
      authorizationStatus: AuthorizationStatus.NO_AUTH,
    },
  });

  const tree = renderer.create(
      <Provider store={store}>
        <PlaceCard
          addToFavorite={() => {}}
          authorizationStatus={AuthorizationStatus.NO_AUTH}
          offer={offer}
          onCardTitleClick={() => {}}
          offersView={OfferType.ALL}
        />
      </Provider>
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
