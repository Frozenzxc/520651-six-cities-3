import {extend} from "../../utils.js";
import {parseOffer} from "../../utils";
import {ActionCreator, ActionType} from "../offers/actions";

const getAvailableOffers = ((allOffers, currentCity) => allOffers.filter((offer) => offer.city.name === currentCity));

const initialState = {
  offers: [],
  availableOffers: [],
  activeID: null,
  activeOffer: null,
  currentCity: `Amsterdam`,
};

const Operation = {
  loadOffers: () => (dispatch, getState, api) => {
    return api.get(`/hotels`)
            .then((response) => {
              dispatch(ActionCreator.loadOffers(response.data));
            });
  },
};


const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.LOAD_OFFERS:
      let parsedOffers = action.payload.map((offer) => parseOffer(offer));
      return extend(state, {
        offers: parsedOffers,
        currentCity: parsedOffers[0].city.name,
      });

    case ActionType.SELECT_CARD:
      return extend(state, {
        activeID: action.payload,
      });

    case ActionType.SELECT_CITY:
      return extend(state, {
        currentCity: action.payload,
        availableOffers: getAvailableOffers(state.offers, action.payload),
      });

    case ActionType.SELECT_OFFER:
      return extend(state, {
        activeOffer: action.payload,
      });
  }

  return state;
};

export {reducer, Operation, ActionType, ActionCreator};
