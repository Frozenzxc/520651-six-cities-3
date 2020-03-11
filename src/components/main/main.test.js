import React from "react";
import renderer from "react-test-renderer";
import Main from "./main.jsx";
import offers from "../../test-mocks/test-offers";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";

const mockStore = configureStore([]);

const cardTitleClickHandler = () => {};

it(`Should Main component render correctly`, () => {

  const store = mockStore({
    currentCity: offers[0].city,
    offers,
  });

  const tree = renderer
        .create(
            <Provider store={store}>
              <Main
                currentCity={offers[0].city}
                offers={offers}
                onCardTitleClick={cardTitleClickHandler}
              />
            </Provider>
        )
        .toJSON();

  expect(tree).toMatchSnapshot();
});
