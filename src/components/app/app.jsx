import React, {PureComponent} from "react";
import {Switch, Route, BrowserRouter} from "react-router-dom";
import PropTypes from "prop-types";
import Main from "../main/main.jsx";
import {offerShape} from "../../prop-types.jsx";
import Property from "../property/property.jsx";

class App extends PureComponent {
  constructor(props) {
    super(props);

    this._handleCardTitleClick = this._handleCardTitleClick.bind(this);

    this.state = {
      step: -1,
      activeCard: {},
    };
  }

  _handleCardTitleClick(offer) {
    this.setState((prevState) => ({
      step: prevState.step + 1,
      activeCard: offer,
    }));
  }

  _renderApp() {
    const {offersCount, offers} = this.props;
    const {step, activeCard} = this.state;

    if (step === -1) {
      return (
        <Main
          offersCount={offersCount}
          offers={offers}
          onCardTitleClick={this._handleCardTitleClick}
        />
      );
    }
    return (
      <Property offer={activeCard}/>
    );
  }

  render() {
    const {offers} = this.props;
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {this._renderApp()}
          </Route>
          <Route exact path="/dev-offer">
            <Property offer={offers[0]}/>
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}
App.propTypes = {
  offersCount: PropTypes.number.isRequired,
  offers: PropTypes.arrayOf(offerShape).isRequired,
};

export default App;
