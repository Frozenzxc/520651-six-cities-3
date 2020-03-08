import React from "react";
import renderer from "react-test-renderer";
import Main from "./main.jsx";
import offers from "../../test-mocks/test-offers";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";

const mockStore = configureStore([]);

const OFFERS_COUNT = 55;

const cardTitleClickHandler = () => {};

it(`Should Main component render correctly`, () => {

  const store = mockStore({
    currentCity: offers[0].city,
    offers,
    step: -1,
  });

  const tree = renderer
        .create(
            <Provider store={store}>
              <Main
                currentCity={offers[0].city}
                offers={offers}
                offersCount={OFFERS_COUNT}
                onCardTitleClick={cardTitleClickHandler}
              />
            </Provider>
        )
        .toJSON();

  expect(tree).toMatchSnapshot();
});
