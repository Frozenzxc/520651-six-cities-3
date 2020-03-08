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
    const {activeOffer, currentCity, offers, onCardTitleClick, step} = this.props;

    const availableOffers = offers.filter((offer) => offer.city === currentCity);


    if (step === -1) {
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
  activeOffer: PropTypes.object,
  currentCity: PropTypes.string.isRequired,
  offers: PropTypes.arrayOf(offerShape).isRequired,
  onCardTitleClick: PropTypes.func.isRequired,
  step: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  currentCity: state.currentCity,
  offers: state.offers,
  step: state.step,
  activeOffer: state.activeOffer,
});

const mapDispatchToProps = (dispatch) => ({
  onCardTitleClick(offer) {
    dispatch(ActionCreator.incrementStep());
    dispatch(ActionCreator.selectOffer(offer));
  },
  onCityClick(city) {
    dispatch(ActionCreator.selectCity(city));
  }

});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
