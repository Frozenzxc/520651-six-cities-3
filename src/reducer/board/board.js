import {extend} from "../../utils";
import {ActionType} from "./actions";

const initialState = {
  activeID: null,
  activeOffer: null,
  currentCity: `Amsterdam`,
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
