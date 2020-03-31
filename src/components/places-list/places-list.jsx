import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import PlaceCard from "../place-card/place-card.jsx";
import {offerShape} from "../../prop-types.jsx";
import NameSpace from "../../reducer/name-space";
import {Operation} from "../../reducer/offers/offers";
import {connect} from "react-redux";

class PlacesList extends PureComponent {
  render() {
    const {addToFavorite, authorizationStatus, onCardTitleClick, onCardHover, offers, offersView} = this.props;

    return (
      <div className={`${offersView}-places__list places__list tabs__content`}>
        {offers.length ?
          offers.map((offer) =>
            <PlaceCard
              addToFavorite={addToFavorite}
              authorizationStatus={authorizationStatus}
              onMouseEnter={onCardHover}
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
  addToFavorite: PropTypes.func.isRequired,
  authorizationStatus: PropTypes.string.isRequired,
  onCardHover: PropTypes.func.isRequired,
  onCardTitleClick: PropTypes.func.isRequired,
  offers: PropTypes.arrayOf(offerShape),
  offersView: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  authorizationStatus: state[NameSpace.USER].authorizationStatus,
});

const mapDispatchToProps = (dispatch) => ({
  addToFavorite(offer) {
    dispatch(Operation.addToFavorite(offer));
  },
});

export {PlacesList};

export default connect(mapStateToProps, mapDispatchToProps)(PlacesList);
