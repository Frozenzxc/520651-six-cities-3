import React from 'react';
import renderer from 'react-test-renderer';
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import offers from "../../test-mocks/test-offers";
import Sort from "./sort.jsx";

const mockStore = configureStore([]);

it(`Sort component is rendered correctly`, () => {
  const store = mockStore({
    availableOffers: offers,
  });

  const tree = renderer.create(
      <Provider store={store}>
        <Sort />
      </Provider>
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
