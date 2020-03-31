import * as React from "react";
import PlaceCard from "../place-card/place-card";
import NameSpace from "../../reducer/name-space";
import {Operation} from "../../reducer/offers/offers";
import {connect} from "react-redux";
import withPlaceCardComponent from "../../hocs/with-place-card-component/with-place-card-component";
import {Offer} from "../../types";

interface Props {
  addToFavorite: (offer: Offer) => void;
  authorizationStatus: string | null;
  onCardHover: () => void;
  onCardTitleClick: () => void;
  offers: Offer[];
  offersView: string;
}

const PlaceCardWrapped = withPlaceCardComponent(PlaceCard);

const PlacesList: React.FunctionComponent<Props> = (props: Props) => {
  const {addToFavorite, authorizationStatus, onCardTitleClick, onCardHover, offers, offersView} = props;

  return (
    <div className={`${offersView}-places__list places__list tabs__content`}>
      {offers.length ?
        offers.map((offer) =>
          <PlaceCardWrapped
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
