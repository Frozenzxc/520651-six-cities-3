import * as React from "react";
import * as renderer from "react-test-renderer";
import ReviewsForm from "./reviews-form";
import {ReviewPostingStatus} from "../../const";
import {reviews} from "../../test-mocks/reviews";
import {noop} from "../../utils";

const MockComponent = () => {

  return (
    <div>
    </div>
  );
};

it(`ReviewForm is rendered correctly`, () => {

  const tree = renderer.create(
      <ReviewsForm
        blockForm={noop}
        id={4}
        isFormBlocked={false}
        onInputChange={noop}
        onTextAreaChange={noop}
        ratingValue={String(reviews[0].rating)}
        reviewValue={reviews[0].comment}
        postReview={noop}
        resetFormStatus={noop}
        reviewPostingStatus={ReviewPostingStatus.POSTED}
      >
        <MockComponent/>
      </ReviewsForm>
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
