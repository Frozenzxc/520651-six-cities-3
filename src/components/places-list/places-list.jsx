import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import PlaceCard from "../place-card/place-card.jsx";
import {offerShape} from "../../prop-types.jsx";


class PlacesList extends PureComponent {
  constructor(props) {
    super(props);
    this.handleCardHover = this.handleCardHover.bind(this);

    this.state = {
      card: {},
    };

  }

  handleCardHover(offer) {
    this.setState({
      card: offer,
    });
  }

  render() {
    const {onCardTitleClick, offers} = this.props;

    return (
      <div className="cities__places-list places__list tabs__content">
        {offers.map((offer) =>
          <PlaceCard
            onMouseEnter={this.handleCardHover}
            onClick={onCardTitleClick}
            offer={offer}
            key={offer.id}
          />
        )
        }
      </div>
    );
  }
}

PlacesList.propTypes = {
  handleCardHover: PropTypes.func,
  onCardTitleClick: PropTypes.func.isRequired,
  offers: PropTypes.arrayOf(offerShape),
};

export default PlacesList;
