import {extend} from "./utils.js";
import offers from "./mocks/offers";
import {ActionType} from "./actions";

const isOffersExist = (offersData) => {
  if (!(offersData instanceof Array)) {
    return [];
  }
  return offersData;
};

const initialState = {
  activeID: null,
  activeOffer: {},
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
        currentCity: action.payload,
      });

    case ActionType.SELECT_OFFER:
      return extend(state, {
        activeOffer: action.payload,
      });
  }

  return state;
};

export {reducer};
