import * as React from "react";
import * as renderer from "react-test-renderer";
import ReviewsList from "./reviews-list";
import {reviews} from "../../test-mocks/reviews";

it(`ReviewsList is rendered correctly`, () => {
  const tree = renderer.create(
      <ReviewsList
        reviews={reviews}
      />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
