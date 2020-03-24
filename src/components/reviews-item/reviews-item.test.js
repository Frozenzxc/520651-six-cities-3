import React from 'react';
import renderer from 'react-test-renderer';
import reviews from "../../test-mocks/reviews";
import ReviewsItem from "./reviews-item";


it(`ReviewsItem is rendered correctly`, () => {
  const tree = renderer.create(
      <ReviewsItem
        review={reviews[0]}
      />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
