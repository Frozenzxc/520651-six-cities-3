import React, {PureComponent} from "react";
import {Switch, Route, BrowserRouter} from "react-router-dom";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {ActionCreator} from "../../reducer/offers/actions.js";
import Main from "../main/main.jsx";
import {offerShape} from "../../prop-types.jsx";
import Property from "../property/property.jsx";
import {getActiveID, getActiveOffer, getCurrentCity, getAvailableOffers} from "../../reducer/offers/selectors";
import NameSpace from "../../reducer/name-space";
import LoginScreen from "../login-screen/login-screen.jsx";
import {ActionCreator as UserActionCreator} from "../../reducer/user/user";

class App extends PureComponent {
  _renderApp() {
    const {activeID, activeOffer, availableOffers, authEmail, authorizationStatus, currentCity, isLoading, isSignIn, onCardHover, onCardTitleClick, onSignInClick} = this.props;


    if (isLoading) {
      return false;
    } else if (activeID === null && !isSignIn) {
      return (
        <Main
          activeOffer={activeOffer}
          availableOffers={availableOffers}
          authEmail={authEmail}
          authorizationStatus={authorizationStatus}
          currentCity={currentCity}
          onCardHover={onCardHover}
          onCardTitleClick={onCardTitleClick}
          onSignInClick={onSignInClick}
        />
      );
    } else if (isSignIn) {
      return (<LoginScreen />);
    }

    return (
      <Property
        offer={activeOffer}
        offers={availableOffers}
        onCardHover={onCardHover}
        onCardTitleClick={onCardTitleClick}
      />
    );
  }

  render() {
    // eslint-disable-next-line spaced-comment
    //const {onCardHover, onCardTitleClick} = this.props;
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {this._renderApp()}
          </Route>
          <Route exact path="/dev-login">
            <LoginScreen />
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

App.propTypes = {
  activeID: PropTypes.oneOfType([
    PropTypes.oneOf([null]),
    PropTypes.number.isRequired]),
  activeOffer: PropTypes.object,
  availableOffers: PropTypes.arrayOf(offerShape).isRequired,
  authEmail: PropTypes.string,
  authorizationStatus: PropTypes.string.isRequired,
  currentCity: PropTypes.string,
  isLoading: PropTypes.bool.isRequired,
  isSignIn: PropTypes.bool.isRequired,
  onCardHover: PropTypes.func.isRequired,
  onCardTitleClick: PropTypes.func.isRequired,
  onSignInClick: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  activeID: getActiveID(state),
  activeOffer: getActiveOffer(state),
  availableOffers: getAvailableOffers(state),
  authEmail: state[NameSpace.USER].authEmail,
  authorizationStatus: state[NameSpace.USER].authorizationStatus,
  currentCity: getCurrentCity(state),
  isLoading: state[NameSpace.OFFERS].isLoading,
  isSignIn: state[NameSpace.USER].isSignIn,
});

const mapDispatchToProps = (dispatch) => ({
  onSignInClick() {
    dispatch(UserActionCreator.signingIn());
  },
  onCardHover(offer) {
    dispatch(ActionCreator.selectOffer(offer));
  },
  onCardTitleClick(offer) {
    dispatch(ActionCreator.selectCard(offer));
    dispatch(ActionCreator.selectOffer(offer));
  },
  onCityClick(city) {
    dispatch(ActionCreator.selectCity(city));
  }
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
