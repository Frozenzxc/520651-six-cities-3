import React from 'react';
import renderer from 'react-test-renderer';
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import offers from "../../test-mocks/test-offers";
import {CitiesList} from "./cities-list.jsx";

const mockStore = configureStore([]);

it(`CitiesList is rendered correctly`, () => {
  const store = mockStore({
    currentCity: offers[1].city,
  });

  const tree = renderer.create(
      <Provider store={store}>
        <CitiesList
          currentCity={offers[0].city}
          offers={offers}
          onCityClick={() => {}}
          step={-1}
        />
      </Provider>
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
