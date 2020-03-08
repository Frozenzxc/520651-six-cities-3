import React from "react";
import renderer from "react-test-renderer";
import {App} from "./app";
import {Provider} from "react-redux";
import offers from "../../test-mocks/test-offers";
import configureStore from "redux-mock-store";

const mockStore = configureStore([]);

it(`Render App`, () => {

  const store = mockStore({
    activeOffer: offers[1],
    currentCity: offers[0].city,
    offers,
    step: -1,
  });
  const tree = renderer
        .create(
            <Provider store={store}>
              <App
                currentCity={offers[0].city}
                offers={offers}
                onCardTitleClick={() => {}}
                step={-1}
              />
            </Provider>)
        .toJSON();

  expect(tree).toMatchSnapshot();
});
