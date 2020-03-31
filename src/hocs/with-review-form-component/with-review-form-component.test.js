import React from "react";
import renderer from "react-test-renderer";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import NameSpace from "../../reducer/name-space";
import {ReviewPostingStatus} from "../../const";
import withReviewFormComponent from "./with-review-form-component";

const mockStore = configureStore([]);

const MockComponent = () => {

  return (
    <div>
    </div>
  );
};

const MockComponentWrapped = withReviewFormComponent(MockComponent);

it(`withReviewFormComponent is rendered correctly`, () => {

  const store = mockStore({
    [NameSpace.OFFERS]: {
      isFormBlocked: false,
      reviewPostingStatus: null,
    },
  });
  const tree = renderer.create((
    <Provider store={store}>
      <MockComponentWrapped
        blockForm={() => {}}
        id={4}
        isFormBlocked={false}
        postReview={() => {}}
        resetFormStatus={() => {}}
        reviewPostingStatus={ReviewPostingStatus.POSTED}
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
