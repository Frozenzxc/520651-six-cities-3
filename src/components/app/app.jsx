import React, {PureComponent} from "react";
import {Switch, Route, BrowserRouter} from "react-router-dom";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {ActionCreator} from "../../reducer/offers/actions.js";
import Main from "../main/main.jsx";
import {offerShape} from "../../prop-types.jsx";
import Property from "../property/property.jsx";
import MainEmpty from "../main-empty/main-empty.jsx";
import {getActiveID, getActiveOffer, getCurrentCity, getOffers, getAvailableOffers} from "../../reducer/offers/selectors";

class App extends PureComponent {
  _renderApp() {
    const {activeID, activeOffer, availableOffers, currentCity, offers, onCardHover, onCardTitleClick} = this.props;

    if (!offers.length) {
      return (
        <MainEmpty/>
      );
    } else if (activeID === null) {
      return (
        <Main
          activeOffer={activeOffer}
          availableOffers={availableOffers}
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
  currentCity: PropTypes.string,
  offers: PropTypes.arrayOf(offerShape),
  onCardHover: PropTypes.func.isRequired,
  onCardTitleClick: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  activeID: getActiveID(state),
  availableOffers: getAvailableOffers(state),
  currentCity: getCurrentCity(state),
  offers: getOffers(state),
  activeOffer: getActiveOffer(state),
});

const mapDispatchToProps = (dispatch) => ({
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
