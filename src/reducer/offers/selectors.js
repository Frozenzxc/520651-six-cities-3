import {createSelector} from "reselect";
import NameSpace from "../name-space.js";

const getActiveID = (state) => {
  return state[NameSpace.OFFERS].activeID;
};

const getCurrentCity = (state) => {
  return state[NameSpace.OFFERS].currentCity;
};

const getActiveOffer = (state) => {
  return state[NameSpace.OFFERS].activeOffer;
};

const getOffers = (state) => {
  return state[NameSpace.OFFERS].offers;
};

const getAvailableOffers = createSelector(
    getOffers,
    getCurrentCity,
    (offers, currentCity) => {
      return offers.filter((offer) => offer.city.name === currentCity);
    }
);

export {getActiveID, getCurrentCity, getActiveOffer, getOffers, getAvailableOffers};
