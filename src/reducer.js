import {extend} from "./utils.js";
import offers from "./mocks/offers";
import {ActionType} from "./actions";

const initialState = {
  activeOffer: {},
  currentCity: offers[0].city,
  offers,
  step: -1,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.INCREMENT_STEP:
      return extend(state, {
        step: state.step + action.payload,
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
