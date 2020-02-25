import React, {PureComponent} from "react";
import {reviewShape} from "../../prop-types.jsx";
import {getRating} from "../../common";
import moment from "moment";

class ReviewsItem extends PureComponent {
  constructor(props) {
    super(props);
  }
  render() {
    const {
      date,
      name,
      rating,
      src,
      text,
    } = this.props.review;

    const reviewRating = getRating(rating);
    const dateTime = moment(date).format(`YYYY-MM-DD`);
    const reviewDate = moment(date).format(`MMMM YYYY`);

    return (
      <li className="reviews__item">
        <div className="reviews__user user">
          <div className="reviews__avatar-wrapper user__avatar-wrapper">
            <img className="reviews__avatar user__avatar" src={src} width="54"
              height="54" alt="Reviews avatar"/>
          </div>
          <span className="reviews__user-name">
            {name}
          </span>
        </div>
        <div className="reviews__info">
          <div className="reviews__rating rating">
            <div className="reviews__stars rating__stars">
              <span style={{width: reviewRating}} />
              <span className="visually-hidden">Rating</span>
            </div>
          </div>
          <p className="reviews__text">
            {text}
          </p>
          <time className="reviews__time" dateTime={dateTime}>{reviewDate}</time>
        </div>
      </li>
    );
  }
}

ReviewsItem.propTypes = {
  review: reviewShape,
};

export default ReviewsItem;
