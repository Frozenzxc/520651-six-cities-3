import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {ActionCreator} from "../../reducer/board/actions.js";
import {offerShape} from "../../prop-types.jsx";
import {getOffers} from "../../reducer/data/selectors";
import {getCurrentCity} from "../../reducer/board/selectors";

class CitiesList extends PureComponent {
  constructor(props) {
    super(props);

    this._handleCityClick = this._handleCityClick.bind(this);
  }


  _handleCityClick(evt) {
    const {onCityClick} = this.props;
    onCityClick(evt.target.dataset.city);
  }

  render() {

    const {currentCity, offers} = this.props;
    const citiesList = [...new Set(offers.map((offer) => offer.city.name))];
    return (
      <div className="tabs">
        <section className="locations container">
          <ul className="locations__list tabs__list">
            {citiesList.map((city) => {
              return (<li
                onClick={this._handleCityClick}
                key={city}
                className="locations__item">
                <a
                  data-city={city}
                  className={`locations__item-link tabs__item ${city === currentCity ? `tabs__item--active` : ``}`}
                  href="#">
                  <span data-city={city}>{city}</span>
                </a>
              </li>);
            })}
          </ul>
        </section>
      </div>
    );
  }
}

CitiesList.propTypes = {
  currentCity: PropTypes.string.isRequired,
  offers: PropTypes.arrayOf(offerShape).isRequired,
  onCityClick: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  currentCity: getCurrentCity(state),
  offers: getOffers(state),
});

const mapDispatchToProps = (dispatch) => ({
  onCityClick(city) {
    dispatch(ActionCreator.selectCity(city));
  }
});

export {CitiesList};
export default connect(mapStateToProps, mapDispatchToProps)(CitiesList);
