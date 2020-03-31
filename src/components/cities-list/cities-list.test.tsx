import * as React from "react";
import * as renderer from "react-test-renderer";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import {offers} from "../../test-mocks/test-offers";
import {CitiesList} from "./cities-list";
import NameSpace from "../../reducer/name-space";
import {noop} from "../../utils";

const mockStore = configureStore([]);

it(`CitiesList is rendered correctly`, () => {
  const store = mockStore({
    [NameSpace.OFFERS]: {
      currentCity: offers[1].city.name,
    },
  });

  const tree = renderer.create(
      <Provider store={store}>
        <CitiesList
          currentCity={offers[0].city.name}
          offers={offers}
          onCityClick={noop}
        />
      </Provider>
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
