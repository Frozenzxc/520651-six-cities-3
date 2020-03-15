import React from 'react';
import renderer from 'react-test-renderer';
import offers from "../../test-mocks/reviews";
import ReviewsList from "./reviews-list";

const reviews = offers[0].reviews;

it(`ReviewsList is rendered correctly`, () => {
  const tree = renderer.create(
      <ReviewsList
        reviews={reviews}
      />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
