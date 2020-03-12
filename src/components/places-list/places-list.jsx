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
    const {onCardTitleClick, offers, offersView} = this.props;

    return (
      <div className={`${offersView}-places__list places__list tabs__content`}>
        {offers.length ?
          offers.map((offer) =>
            <PlaceCard
              onMouseEnter={this.handleCardHover}
              onClick={onCardTitleClick}
              offer={offer}
              key={offer.id}
              offersView={offersView}
            />
          ) : `No places to stay available`
        }
      </div>
    );
  }
}

PlacesList.propTypes = {
  handleCardHover: PropTypes.func,
  onCardTitleClick: PropTypes.func.isRequired,
  offers: PropTypes.arrayOf(offerShape),
  offersView: PropTypes.string.isRequired,
};

export default PlacesList;
