import {createSelector} from "reselect";
import NameSpace from "../name-space.js";
import {MAX_NEARBY_OFFERS} from "../../const";

const getActiveID = (state) => {
  return state[NameSpace.OFFERS].activeID;
};

const getCurrentCity = (state) => {
  return state[NameSpace.OFFERS].currentCity;
};

const getActiveOffer = (state) => {
  return state[NameSpace.OFFERS].activeOffer;
};

const getNearbyOffers = (state) => {
  return state[NameSpace.OFFERS].nearbyOffers.slice(0, MAX_NEARBY_OFFERS);
};

const getOffers = (state) => {
  return state[NameSpace.OFFERS].offers;
};

const getReviews = (state) => {
  return state[NameSpace.OFFERS].reviews;
};

const getAvailableOffers = createSelector(
    getOffers,
    getCurrentCity,
    (offers, currentCity) => {
      return offers.filter((offer) => offer.city.name === currentCity);
    }
);

export {getActiveID, getCurrentCity, getActiveOffer, getNearbyOffers, getOffers, getReviews, getAvailableOffers};
