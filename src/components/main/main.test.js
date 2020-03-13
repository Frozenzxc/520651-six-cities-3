import React from "react";
import renderer from "react-test-renderer";
import Main from "./main.jsx";
import offers from "../../test-mocks/test-offers";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";

const mockStore = configureStore([]);

it(`Should Main component render correctly`, () => {

  const store = mockStore({
    availableOffers: offers.filter((offer) => offer.city === offers[0].city),
    currentCity: offers[0].city,
    offers,
  });

  const tree = renderer
        .create(
            <Provider store={store}>
              <Main
                activeOffer={offers[0]}
                availableOffers={offers.filter((offer) => offer.city === offers[0].city)}
                onCardHover={() => {}}
                onCardTitleClick={() => {}}
                currentCity={offers[0].city}

              />
            </Provider>
        )
        .toJSON();

  expect(tree).toMatchSnapshot();
});
