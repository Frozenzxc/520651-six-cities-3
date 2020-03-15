import React from "react";
import renderer from "react-test-renderer";
import Main from "./main.jsx";
import offers from "../../test-mocks/test-offers";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import NameSpace from "../../reducer/name-space";

const mockStore = configureStore([]);

it(`Should Main component render correctly`, () => {

  const store = mockStore({
    [NameSpace.DATA]: {
      availableOffers: offers.filter((offer) => offer.city.name === offers[0].city.name),
      offers,
    },
    [NameSpace.BOARD]: {
      currentCity: offers[0].city.name,
    },
  });

  const tree = renderer
        .create(
            <Provider store={store}>
              <Main
                activeOffer={offers[0]}
                availableOffers={offers.filter((offer) => offer.city.name === offers[0].city.name)}
                onCardHover={() => {}}
                onCardTitleClick={() => {}}
                currentCity={offers[0].city.name}

              />
            </Provider>
        )
        .toJSON();

  expect(tree).toMatchSnapshot();
});
