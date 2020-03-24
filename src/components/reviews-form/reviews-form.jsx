import React, {PureComponent, createRef} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {ActionCreator, Operation as UserOperation} from "../../reducer/offers/offers";
import NameSpace from "../../reducer/name-space";
import {ReviewPostingStatus as PostingStatus} from "../../const";

const MIN_LENGTH = 50;
const MAX_LENGTH = 300;

const isReviewValid = (review) => {
  return review.trim().length > MIN_LENGTH && review.trim().length < MAX_LENGTH;
};

class ReviewsForm extends PureComponent {
  constructor(props) {
    super(props);

    this.form = createRef();

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleTextAreaChange = this.handleTextAreaChange.bind(this);
    this.state = {
      ratingValue: ``,
      reviewValue: ``,
    };
  }

  componentDidUpdate() {
    const {resetFormStatus, reviewPostingStatus} = this.props;
    if (reviewPostingStatus === PostingStatus.POSTED) {
      this.setState(() => ({
        ratingValue: ``,
        reviewValue: ``,
      }));

      resetFormStatus(null);
    }

    return false;
  }

  handleInputChange(evt) {
    const ratingValue = evt.target.value;

    this.setState(() => ({
      ratingValue,
    }));

    return false;
  }

  handleTextAreaChange(evt) {
    const reviewValue = evt.target.value;

    this.setState(() => ({
      reviewValue,
    }));

    return false;
  }

  handleSubmit(evt) {
    const {id, blockForm, postReview} = this.props;
    const data = new FormData(evt.target);

    evt.preventDefault();
    blockForm(true);

    const comment = data.get(`review`);
    const rating = data.get(`rating`);

    postReview(id, {
      comment,
      rating,
    });
  }

  render() {
    const {isFormBlocked, children, reviewPostingStatus} = this.props;
    const {ratingValue, reviewValue} = this.state;

    return (
      <form
        className="reviews__form form"
        name="reviews__form"
        action="#"
        method="post"
        onSubmit={this.handleSubmit}
        ref={this.form}
      >
        <label className="reviews__label form__label" htmlFor="review">Your review</label>
        <div className="reviews__rating-form form__rating">
          <input className="form__rating-input visually-hidden" name="rating" value="5" checked={ratingValue === `5`} id="5-stars"
            type="radio" required={true} disabled={isFormBlocked} onChange={this.handleInputChange}/>
          <label htmlFor="5-stars" className="reviews__rating-label form__rating-label" title="perfect">
            <svg className="form__star-image" width="37" height="33">
              <use xlinkHref="#icon-star"/>
            </svg>
          </label>

          <input className="form__rating-input visually-hidden" name="rating" value="4" checked={ratingValue === `4`} id="4-stars"
            type="radio" required={true} disabled={isFormBlocked} onChange={this.handleInputChange}/>
          <label htmlFor="4-stars" className="reviews__rating-label form__rating-label" title="good">
            <svg className="form__star-image" width="37" height="33">
              <use xlinkHref="#icon-star"/>
            </svg>
          </label>

          <input className="form__rating-input visually-hidden" name="rating" value="3" checked={ratingValue === `3`} id="3-stars"
            type="radio" required={true} disabled={isFormBlocked} onChange={this.handleInputChange}/>
          <label htmlFor="3-stars" className="reviews__rating-label form__rating-label"
            title="not bad">
            <svg className="form__star-image" width="37" height="33">
              <use xlinkHref="#icon-star"/>
            </svg>
          </label>

          <input className="form__rating-input visually-hidden" name="rating" value="2" checked={ratingValue === `2`}
            id="2-stars" type="radio" required={true} disabled={isFormBlocked} onChange={this.handleInputChange}/>
          <label htmlFor="2-stars" className="reviews__rating-label form__rating-label"
            title="badly">
            <svg className="form__star-image" width="37" height="33">
              <use xlinkHref="#icon-star"/>
            </svg>
          </label>

          <input className="form__rating-input visually-hidden" name="rating" value="1" checked={ratingValue === `1`}
            id="1-star" type="radio" required={true} disabled={isFormBlocked} onChange={this.handleInputChange}/>
          <label htmlFor="1-star" className="reviews__rating-label form__rating-label"
            title="terribly">
            <svg className="form__star-image" width="37" height="33">
              <use xlinkHref="#icon-star"/>
            </svg>
          </label>
        </div>
        <textarea className="reviews__textarea form__textarea" id="review" name="review" maxLength={MAX_LENGTH} minLength={MIN_LENGTH}
          placeholder="Tell how was your stay, what you like and what can be improved" required={true} readOnly={isFormBlocked} onChange={this.handleTextAreaChange} value={reviewValue}/>
        <div className="reviews__button-wrapper">
          <p className="reviews__help">
                        To submit review please make sure to set <span className="reviews__star">rating</span> and
                        describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
          </p>
          <button className="reviews__submit form__submit button" type="submit" disabled={!(ratingValue && isReviewValid(reviewValue))}>Submit</button>
        </div>
        {reviewPostingStatus === PostingStatus.ERROR && children}
      </form>
    );
  }
}

ReviewsForm.propTypes = {
  blockForm: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  id: PropTypes.number.isRequired,
  isFormBlocked: PropTypes.bool.isRequired,
  postReview: PropTypes.func.isRequired,
  resetFormStatus: PropTypes.func.isRequired,
  reviewPostingStatus: PropTypes.oneOfType([
    PropTypes.oneOf([null]),
    PropTypes.string]),
};

const mapStateToProps = (state) => ({
  isFormBlocked: state[NameSpace.OFFERS].isFormBlocked,
  reviewPostingStatus: state[NameSpace.OFFERS].reviewPostingStatus,
});

const mapDispatchToProps = (dispatch) => ({
  blockForm(isBlocked) {
    dispatch(ActionCreator.blockForm(isBlocked));
  },
  postReview(id, formData) {
    dispatch(UserOperation.postReview(id, formData));
  },
  resetFormStatus(status) {
    dispatch(ActionCreator.successfulPostReview(status));
  }
});

export {ReviewsForm};

export default connect(mapStateToProps, mapDispatchToProps)(ReviewsForm);
