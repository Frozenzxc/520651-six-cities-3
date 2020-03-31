import * as React from "react";
import {connect} from "react-redux";
import {ActionCreator, Operation as UserOperation} from "../../reducer/offers/offers";
import NameSpace from "../../reducer/name-space";
import {ReviewPostingStatus as PostingStatus} from "../../const";
import {Subtract} from "utility-types";

interface State {
  ratingValue: string;
  reviewValue: string;
}

interface Props {
  blockForm: (isBlocked: boolean) => void;
  isFormBlocked: boolean;
  reviewPostingStatus: string | null;
  resetFormStatus: (status: null | boolean) => void;
}

interface InjectingProps {
  blockForm: () => void;
  onInputChange: () => void;
  onTextAreaChange: () => void;
}

const withReviewFormComponent = (Component) => {
  type P = React.ComponentProps<typeof Component>;
  type T = Props & Subtract<P, InjectingProps>;

  class WithReviewFormComponent extends React.PureComponent<T, State> {
    constructor(props) {
      super(props);

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

    render() {
      const {ratingValue, reviewValue} = this.state;
      const {blockForm, isFormBlocked} = this.props;

      return (
        <Component
          {...this.props}
          blockForm={blockForm}
          isFormBlocked={isFormBlocked}
          onInputChange={this.handleInputChange}
          onTextAreaChange={this.handleTextAreaChange}
          ratingValue={ratingValue}
          reviewValue={reviewValue}
        />
      );
    }
  }
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

  return connect(mapStateToProps, mapDispatchToProps)(WithReviewFormComponent);
};

export default withReviewFormComponent;


