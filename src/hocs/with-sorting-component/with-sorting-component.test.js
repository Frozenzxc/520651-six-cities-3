import React from "react";
import renderer from "react-test-renderer";
import PropTypes from "prop-types";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import withSortingComponent from "./with-sorting-component";
import offers from "../../mocks/offers";
import NameSpace from "../../reducer/name-space";

const mockStore = configureStore([]);

const MockComponent = (props) => {
  const {children} = props;

  return (
    <div>
      {children}
    </div>
  );
};

MockComponent.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
};

const MockComponentWrapped = withSortingComponent(MockComponent);

it(`withSortingComponent is rendered correctly`, () => {

  const store = mockStore({
    [NameSpace.DATA]: {
      availableOffers: offers,
      offers,
    },
    [NameSpace.BOARD]: {
      currentCity: offers[0].city.name,
    }
  });
  const tree = renderer.create((
    <Provider store={store}>
      <MockComponentWrapped
        offers={offers}
      />
    </Provider>
  ), {
    createNodeMock() {
      return {};
    }
  }).toJSON();

  expect(tree).toMatchSnapshot();
});