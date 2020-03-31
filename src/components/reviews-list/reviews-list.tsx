import * as React from "react";
import ReviewsItem from "../reviews-item/reviews-item";
import * as moment from "moment";
import {Review} from "../../types";

interface Props {
  reviews: Review[];
}

const MAX_REVIEWS = 10;

const ReviewsList: React.FunctionComponent<Props> = (props: Props) => {
  const {reviews} = props;

  return (
    <section className="property__reviews reviews">
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviews.length}</span></h2>
      <ul className="reviews__list">
        {reviews
              .sort((a, b) => moment(b.date).valueOf() - moment(a.date).valueOf())
              .slice(0, MAX_REVIEWS)
              .map((review) =>
                <ReviewsItem
                  review={review}
                  key={review.id}
                />
              )}
      </ul>
    </section>
  );
};

export default ReviewsList;
