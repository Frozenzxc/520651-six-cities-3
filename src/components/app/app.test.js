import React from "react";
import renderer from "react-test-renderer";
import {App} from "./app";
import {Provider} from "react-redux";
import offers from "../../test-mocks/test-offers";
import configureStore from "redux-mock-store";
import NameSpace from "../../reducer/name-space";

const mockStore = configureStore([]);

it(`Render App`, () => {

  const store = mockStore({
    [NameSpace.OFFERS]: {
      activeID: null,
      activeOffer: offers[1],
      currentCity: offers[0].city.name,
      availableOffers: offers.filter((offer) => offer.city.name === offers[0].city.name),
      offers,
    },
  });
  const tree = renderer
        .create(
            <Provider store={store}>
              <App
                activeID={null}
                activeOffer={offers[0]}
                availableOffers={offers.filter((offer) => offer.city.name === offers[0].city.name)}
                currentCity={offers[0].city.name}
                offers={offers}
                onCardHover={() => {}}
                onCardTitleClick={() => {}}
              />
            </Provider>)
        .toJSON();

  expect(tree).toMatchSnapshot();
});
