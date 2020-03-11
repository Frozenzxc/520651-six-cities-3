import React, {PureComponent} from "react";
import {Switch, Route, BrowserRouter} from "react-router-dom";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {ActionCreator} from "../../actions.js";
import Main from "../main/main.jsx";
import {offerShape} from "../../prop-types.jsx";
import Property from "../property/property.jsx";

class App extends PureComponent {
  _renderApp() {
    const {activeID, activeOffer, currentCity, offers, onCardTitleClick} = this.props;

    const availableOffers = offers.filter((offer) => offer.city === currentCity);

    if (activeID === null) {
      return (
        <Main
          currentCity={currentCity}
          offers={availableOffers}
          onCardTitleClick={onCardTitleClick}
        />
      );
    }

    return (
      <Property
        offer={activeOffer}
        offers={availableOffers}
        onCardTitleClick={onCardTitleClick}
      />
    );
  }

  render() {
    const {offers, onCardTitleClick} = this.props;
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {this._renderApp()}
          </Route>
          <Route exact path="/dev-offer">
            <Property
              offer={offers[0]}
              offers={offers}
              onCardTitleClick={onCardTitleClick}
            />
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
  currentCity: PropTypes.string.isRequired,
  offers: PropTypes.arrayOf(offerShape).isRequired,
  onCardTitleClick: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  activeID: state.activeID,
  currentCity: state.currentCity,
  offers: state.offers,
  activeOffer: state.activeOffer,
});

const mapDispatchToProps = (dispatch) => ({
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
