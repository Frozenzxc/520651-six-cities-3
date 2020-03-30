import React, {PureComponent} from "react";
import {Switch, Route, Router, Redirect} from "react-router-dom";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {ActionCreator} from "../../reducer/offers/actions.js";
import Main from "../main/main.jsx";
import {offerShape} from "../../prop-types.jsx";
import Property from "../property/property.jsx";
import {getActiveOffer, getCurrentCity, getAvailableOffers} from "../../reducer/offers/selectors";
import NameSpace from "../../reducer/name-space";
import LoginScreen from "../login-screen/login-screen.jsx";
import {ActionCreator as UserActionCreator} from "../../reducer/user/user";
import {AppRoute} from "../../const";
import Favorites from "../favorites/favorites.jsx";
import history from "../../history";
import PrivateRoute from "../private-route/private-route.jsx";

class App extends PureComponent {
  _renderApp() {
    const {activeOffer, availableOffers, authEmail, authorizationStatus, currentCity, isLoading, onCardHover, onCardTitleClick, onSignInClick} = this.props;


    if (isLoading && authorizationStatus === null) {
      return false;
    }
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
  }

  render() {
    const {activeOffer, authEmail, isSignedIn, onCardHover, onCardTitleClick} = this.props;

    return (
      <Router history={history}>
        <Switch>
          <Route exact path={AppRoute.ROOT}>
            {this._renderApp()}
          </Route>
          <Route exact path={AppRoute.LOGIN}>
            {isSignedIn ? <Redirect to={AppRoute.ROOT}/> : <LoginScreen />}
          </Route>
          <Route path={AppRoute.PROPERTY} render={(routeProps) =>
            <Property
              id={routeProps.match.params.id}
              authEmail={authEmail}
              offer={activeOffer}
              onCardHover={onCardHover}
              onCardTitleClick={onCardTitleClick}
            />
          }
          >
          </Route>
          <PrivateRoute
            exact
            path={AppRoute.FAVORITES}
            render={() => {
              return (
                <Favorites
                  onCardHover={onCardHover}
                  onCardTitleClick={onCardTitleClick}
                />
              );
            }}
          />
        </Switch>
      </Router>
    );
  }
}

App.propTypes = {
  activeOffer: PropTypes.object,
  availableOffers: PropTypes.arrayOf(offerShape).isRequired,
  authEmail: PropTypes.string,
  authorizationStatus: PropTypes.oneOfType([
    PropTypes.oneOf([null]),
    PropTypes.string.isRequired
  ]),
  currentCity: PropTypes.string,
  isLoading: PropTypes.bool.isRequired,
  isSignedIn: PropTypes.bool.isRequired,
  onCardHover: PropTypes.func.isRequired,
  onCardTitleClick: PropTypes.func.isRequired,
  onSignInClick: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  activeOffer: getActiveOffer(state),
  availableOffers: getAvailableOffers(state),
  authEmail: state[NameSpace.USER].authEmail,
  authorizationStatus: state[NameSpace.USER].authorizationStatus,
  currentCity: getCurrentCity(state),
  isLoading: state[NameSpace.OFFERS].isLoading,
  isSignedIn: state[NameSpace.USER].isSignedIn,
});

const mapDispatchToProps = (dispatch) => ({
  onSignInClick() {
    dispatch(UserActionCreator.signingIn());
  },
  onCardHover(offer) {
    dispatch(ActionCreator.selectOffer(offer));
  },
  onCardTitleClick(offer) {
    dispatch(ActionCreator.selectOffer(offer));
  },
  onCityClick(city) {
    dispatch(ActionCreator.selectCity(city));
  }
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
