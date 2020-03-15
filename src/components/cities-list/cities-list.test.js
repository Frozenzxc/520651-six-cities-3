import React from 'react';
import renderer from 'react-test-renderer';
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import offers from "../../test-mocks/test-offers";
import {CitiesList} from "./cities-list.jsx";
import NameSpace from "../../reducer/name-space";

const mockStore = configureStore([]);

it(`CitiesList is rendered correctly`, () => {
  const store = mockStore({
    [NameSpace.BOARD]: {
      currentCity: offers[1].city.name,
    },
  });

  const tree = renderer.create(
      <Provider store={store}>
        <CitiesList
          currentCity={offers[0].city.name}
          offers={offers}
          onCityClick={() => {}}
          step={-1}
        />
      </Provider>
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
