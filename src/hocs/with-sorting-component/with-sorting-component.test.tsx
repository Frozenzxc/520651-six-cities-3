import * as React from "react";
import * as renderer from "react-test-renderer";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import {offers} from "../../test-mocks/test-offers";
import NameSpace from "../../reducer/name-space";
import {AuthorizationStatus} from "../../const";
import {noop} from "../../utils";
import withSortingComponent from "./with-sorting-component";

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
    },
    [NameSpace.USER]: {
      authorizationStatus: AuthorizationStatus.AUTH,
    }
  });
  const tree = renderer.create((
    <Provider store={store}>
      <MockComponentWrapped
        authorizationStatus={AuthorizationStatus.AUTH}
        render={noop}
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
