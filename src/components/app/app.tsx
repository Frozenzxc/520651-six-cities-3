import * as React from "react";
import {Switch, Route, Router, Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {ActionCreator} from "../../reducer/offers/actions";
import Main from "../main/main";
import Property from "../property/property";
import {getActiveOffer, getCurrentCity, getAvailableOffers} from "../../reducer/offers/selectors";
import NameSpace from "../../reducer/name-space";
import LoginScreen from "../login-screen/login-screen";
import {AppRoute} from "../../const";
import Favorites from "../favorites/favorites";
import history from "../../history";
import PrivateRoute from "../private-route/private-route";
import {Offer} from "../../types";

interface Props {
  activeOffer: Offer | null;
  availableOffers: Offer[];
  authEmail: string;
  authorizationStatus: string | null;
  currentCity: string;
  isLoading: boolean;
  isSignedIn: boolean;
  onCardHover: () => void;
  onCardTitleClick: () => void;
}

class App extends React.PureComponent<Props, {}> {
  _renderApp() {
    const {activeOffer, availableOffers, authEmail, authorizationStatus, currentCity, isLoading, onCardHover, onCardTitleClick} = this.props;


    if (isLoading) {
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
