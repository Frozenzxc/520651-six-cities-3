import React from "react";
import renderer from "react-test-renderer";
import ReviewPostError from "./review-post-error";


it(`Should Review Post Error component render correctly`, () => {
  const tree = renderer
        .create(
            <ReviewPostError/>
        )
        .toJSON();

  expect(tree).toMatchSnapshot();
});
