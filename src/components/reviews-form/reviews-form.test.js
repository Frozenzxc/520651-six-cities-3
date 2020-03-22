import React from 'react';
import renderer from 'react-test-renderer';
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import NameSpace from "../../reducer/name-space";
import {ReviewsForm} from "./reviews-form";

const mockStore = configureStore([]);

it(`ReviewForm is rendered correctly`, () => {
  const store = mockStore({
    [NameSpace.OFFERS]: {
      isFormBlocked: false,
    },
  });

  const tree = renderer.create(
      <Provider store={store}>
        <ReviewsForm
          blockForm={() => {}}
          id={4}
          isFormBlocked={false}
          postReview={() => {}}
        />
      </Provider>
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
