import {extend} from "./utils.js";
import offers from "./mocks/offers";
import {ActionType} from "./actions";

const getAvailableOffers = ((allOffers, currentCity) => allOffers.filter((offer) => offer.city === currentCity));

const isOffersExist = (offersData) => {
  if (!(offersData instanceof Array)) {
    return [];
  }
  return offersData;
};

const initialState = {
  activeID: null,
  activeOffer: null,
  availableOffers: getAvailableOffers(isOffersExist(offers), offers[0].city),
  currentCity: offers[0].city,
  offers: isOffersExist(offers),
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SELECT_CARD:
      return extend(state, {
        activeID: action.payload,
      });

    case ActionType.SELECT_CITY:
      return extend(state, {
        availableOffers: getAvailableOffers(offers, action.payload),
        currentCity: action.payload,
      });

    case ActionType.SELECT_OFFER:
      return extend(state, {
        activeOffer: action.payload,
      });

    case ActionType.SORT_TYPE_CHANGE:
      return extend(state, {
        availableOffers: action.payload,
      });
  }

  return state;
};

export {reducer};
