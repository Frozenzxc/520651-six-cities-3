import React from 'react';
import renderer from 'react-test-renderer';
import ReviewsForm from "./reviews-form";
import {ReviewPostingStatus} from "../../const";
import reviews from "../../test-mocks/reviews";

const MockComponent = () => {

  return (
    <div>
    </div>
  );
};

it(`ReviewForm is rendered correctly`, () => {

  const tree = renderer.create(
      <ReviewsForm
        blockForm={() => {}}
        id={4}
        isFormBlocked={false}
        onInputChange={() => {}}
        onTextAreaChange={() => {}}
        ratingValue={String(reviews[0].rating)}
        reviewValue={reviews[0].comment}
        postReview={() => {}}
        resetFormStatus={() => {}}
        reviewPostingStatus={ReviewPostingStatus.POSTED}
      >
        <MockComponent/>
      </ReviewsForm>
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
