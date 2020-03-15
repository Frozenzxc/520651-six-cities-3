import React from 'react';
import renderer from 'react-test-renderer';
import offers from "../../test-mocks/reviews";
import ReviewsItem from "./reviews-item";

const review = offers[0].reviews[0];

it(`ReviewsItem is rendered correctly`, () => {
  const tree = renderer.create(
      <ReviewsItem
        review={review}
      />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
