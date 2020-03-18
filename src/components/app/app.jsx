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
import {Operation as UserOperation} from "../../reducer/user/user";
import LoginScreen from "../login-screen/login-screen.jsx";
import {AuthorizationStatus} from "../../const";

class App extends PureComponent {
  _renderApp() {
    const {activeID, activeOffer, availableOffers, authEmail, authorizationStatus, currentCity, isLoading, login, onCardHover, onCardTitleClick} = this.props;

    if (authorizationStatus === AuthorizationStatus.NO_AUTH) {
      return (
        <LoginScreen
          onSubmit={login}
        />);
    }

    if (isLoading) {
      return false;
    } else if (activeID === null) {
      return (
        <Main
          activeOffer={activeOffer}
          availableOffers={availableOffers}
          authEmail={authEmail}
          authorizationStatus={authorizationStatus}
          currentCity={currentCity}
          onCardHover={onCardHover}
          onCardTitleClick={onCardTitleClick}
        />
      );
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
            <LoginScreen onSubmit={this.props.login}/>
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
  login: PropTypes.func.isRequired,
  onCardHover: PropTypes.func.isRequired,
  onCardTitleClick: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  activeID: getActiveID(state),
  activeOffer: getActiveOffer(state),
  availableOffers: getAvailableOffers(state),
  authEmail: state[NameSpace.USER].authEmail,
  authorizationStatus: state[NameSpace.USER].authorizationStatus,
  currentCity: getCurrentCity(state),
  isLoading: state[NameSpace.OFFERS].isLoading,
});

const mapDispatchToProps = (dispatch) => ({
  login(authData) {
    dispatch(UserOperation.login(authData));
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
