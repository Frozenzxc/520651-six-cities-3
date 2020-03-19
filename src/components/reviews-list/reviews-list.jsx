import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {reviewShape} from "../../prop-types.jsx";
import ReviewsItem from "../reviews-item/reviews-item.jsx";
import moment from "moment";

const MAX_REVIEWS = 10;

class ReviewsList extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {reviews} = this.props;

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
  }
}

ReviewsList.propTypes = {
  reviews: PropTypes.arrayOf(reviewShape).isRequired,
};

export default ReviewsList;
