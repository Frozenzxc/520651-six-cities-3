import * as React from "react";
import {connect} from "react-redux";
import {ActionCreator} from "../../reducer/offers/actions";
import {getOffers, getCurrentCity} from "../../reducer/offers/selectors";
import {getCitiesList} from "../../utils";
import {Offer} from "../../types";

interface Props {
  currentCity: string;
  offers: Offer[];
  onCityClick: (city: string) => void;
}

class CitiesList extends React.PureComponent<Props, {}> {
  constructor(props) {
    super(props);

    this.handleCityClick = this.handleCityClick.bind(this);
  }


  handleCityClick(evt) {
    const {onCityClick} = this.props;
    onCityClick(evt.target.dataset.city);
  }

  render() {

    const {currentCity, offers} = this.props;
    const citiesList = getCitiesList(offers);
    return (
      <div className="tabs">
        <section className="locations container">
          <ul className="locations__list tabs__list">
            {citiesList.map((city) => {
              return (<li
                onClick={this.handleCityClick}
                key={city}
                className="locations__item">
                <a
                  data-city={city}
                  className={`locations__item-link tabs__item ${city === currentCity ? `tabs__item--active` : ``}`}>
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
