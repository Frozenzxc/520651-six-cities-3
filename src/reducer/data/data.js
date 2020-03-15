import {extend} from "../../utils.js";
import {parseOffer} from "../../utils";

const getAvailableOffers = ((allOffers, currentCity) => allOffers.filter((offer) => offer.city.name === currentCity));

const initialState = {
  offers: [],
  availableOffers: [],
};

const ActionType = {
  LOAD_OFFERS: `LOAD_OFFERS`,
  SORT_TYPE_CHANGE: `SORT_TYPE_CHANGE`,
};

const ActionCreator = {
  loadOffers: (offers) => {
    return {
      type: ActionType.LOAD_OFFERS,
      payload: offers,
    };
  },

  sortTypeChange: (offers) => ({
    type: ActionType.SORT_TYPE_CHANGE,
    payload: offers,
  })
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
        availableOffers: getAvailableOffers(parsedOffers, parsedOffers[0].city.name),
      });

    case ActionType.SORT_TYPE_CHANGE:
      return extend(state, {
        availableOffers: action.payload,
      });
  }

  return state;
};

export {reducer, Operation, ActionType, ActionCreator};
