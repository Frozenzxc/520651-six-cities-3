import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {ActionCreator, Operation as UserOperation} from "../../reducer/offers/offers";
import NameSpace from "../../reducer/name-space";
import {ReviewPostingStatus as PostingStatus} from "../../const";

const MIN_LENGTH = 50;
const MAX_LENGTH = 300;

class ReviewsForm extends PureComponent {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleTextAreaChange = this.handleTextAreaChange.bind(this);
    this.state = {
      isRatingChecked: false,
      isReviewAdded: false,
    };
  }

  handleInputChange(evt) {
    if (evt.target.value) {
      this.setState(() => ({
        isRatingChecked: true,
      }));
    }
    return false;
  }

  handleTextAreaChange(evt) {
    if (evt.target.value.trim().length > MIN_LENGTH && evt.target.value.trim().length < MAX_LENGTH) {
      this.setState(() => ({
        isReviewAdded: true,
      }));
    }
    return false;
  }

  handleSubmit(evt) {
    const {id, blockForm, postReview, reviewPostingStatus} = this.props;
    const data = new FormData(evt.target);

    evt.preventDefault();
    blockForm(true);

    const comment = data.get(`review`);
    const rating = data.get(`rating`);

    postReview(id, {
      comment,
      rating,
    });

    if (reviewPostingStatus === PostingStatus.POSTED) {
      evt.target.reset();
    } else {
      const node = document.createElement(`div`);
      node.style = `z-index: 100; margin: 0 auto; text-align: center; background-color: red;`;
      node.style.position = `fixed`;
      node.style.left = `0`;
      node.style.right = `0`;
      node.style.fontSize = `30px`;

      node.textContent = `Попробуйте еще раз`;
      document.body.prepend(node);
    }
    this.setState(() => ({
      isRatingChecked: false,
      isReviewAdded: false,
    }));

  }

  render() {
    const {isFormBlocked} = this.props;
    const {isRatingChecked, isReviewAdded} = this.state;

    return (
      <form
        className="reviews__form form"
        action="#"
        method="post"
        onSubmit={this.handleSubmit}
      >
        <label className="reviews__label form__label" htmlFor="review">Your review</label>
        <div className="reviews__rating-form form__rating">
          <input className="form__rating-input visually-hidden" name="rating" value="5" id="5-stars"
            type="radio" required={true} disabled={isFormBlocked} onChange={this.handleInputChange}/>
          <label htmlFor="5-stars" className="reviews__rating-label form__rating-label" title="perfect">
            <svg className="form__star-image" width="37" height="33">
              <use xlinkHref="#icon-star"/>
            </svg>
          </label>

          <input className="form__rating-input visually-hidden" name="rating" value="4" id="4-stars"
            type="radio" required={true} disabled={isFormBlocked} onChange={this.handleInputChange}/>
          <label htmlFor="4-stars" className="reviews__rating-label form__rating-label" title="good">
            <svg className="form__star-image" width="37" height="33">
              <use xlinkHref="#icon-star"/>
            </svg>
          </label>

          <input className="form__rating-input visually-hidden" name="rating" value="3" id="3-stars"
            type="radio" required={true} disabled={isFormBlocked} onChange={this.handleInputChange}/>
          <label htmlFor="3-stars" className="reviews__rating-label form__rating-label"
            title="not bad">
            <svg className="form__star-image" width="37" height="33">
              <use xlinkHref="#icon-star"/>
            </svg>
          </label>

          <input className="form__rating-input visually-hidden" name="rating" value="2"
            id="2-stars" type="radio" required={true} disabled={isFormBlocked} onChange={this.handleInputChange}/>
          <label htmlFor="2-stars" className="reviews__rating-label form__rating-label"
            title="badly">
            <svg className="form__star-image" width="37" height="33">
              <use xlinkHref="#icon-star"/>
            </svg>
          </label>

          <input className="form__rating-input visually-hidden" name="rating" value="1"
            id="1-star" type="radio" required={true} disabled={isFormBlocked} onChange={this.handleInputChange}/>
          <label htmlFor="1-star" className="reviews__rating-label form__rating-label"
            title="terribly">
            <svg className="form__star-image" width="37" height="33">
              <use xlinkHref="#icon-star"/>
            </svg>
          </label>
        </div>
        <textarea className="reviews__textarea form__textarea" id="review" name="review" maxLength={MAX_LENGTH} minLength={MIN_LENGTH}
          placeholder="Tell how was your stay, what you like and what can be improved" required={true} readOnly={isFormBlocked} onChange={this.handleTextAreaChange}/>
        <div className="reviews__button-wrapper">
          <p className="reviews__help">
                        To submit review please make sure to set <span className="reviews__star">rating</span> and
                        describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
          </p>
          <button className="reviews__submit form__submit button" type="submit" disabled={!(isRatingChecked && isReviewAdded)}>Submit</button>
        </div>
      </form>
    );
  }
}

ReviewsForm.propTypes = {
  blockForm: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  isFormBlocked: PropTypes.bool.isRequired,
  postReview: PropTypes.func.isRequired,
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
});

export {ReviewsForm};
export default connect(mapStateToProps, mapDispatchToProps)(ReviewsForm);
