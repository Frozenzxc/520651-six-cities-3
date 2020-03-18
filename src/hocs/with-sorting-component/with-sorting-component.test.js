import React from "react";
import renderer from "react-test-renderer";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import withSortingComponent from "./with-sorting-component";
import offers from "../../test-mocks/test-offers";
import NameSpace from "../../reducer/name-space";

const mockStore = configureStore([]);

const MockComponent = () => {

  return (
    <div>
    </div>
  );
};

const MockComponentWrapped = withSortingComponent(MockComponent);

it(`withSortingComponent is rendered correctly`, () => {

  const store = mockStore({
    [NameSpace.OFFERS]: {
      availableOffers: offers,
      offers,
      currentCity: offers[0].city.name,
    }
  });
  const tree = renderer.create((
    <Provider store={store}>
      <MockComponentWrapped
        render={() => {}}
        availableOffers={offers}
        offers={offers}
      >
      </MockComponentWrapped>
    </Provider>
  ), {
    createNodeMock() {
      return {};
    }
  }).toJSON();

  expect(tree).toMatchSnapshot();
});
