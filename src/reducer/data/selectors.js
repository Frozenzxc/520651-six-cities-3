import {createSelector} from "reselect";
import NameSpace from "../name-space.js";
import {getCurrentCity} from "../../reducer/board/selectors";

export const getOffers = (state) => {
  return state[NameSpace.DATA].offers;
};

export const getAvailableOffers = createSelector(
    getOffers,
    getCurrentCity,
    (resultOne, resultTwo) => {
      return resultOne.filter((it) => it.city.name === resultTwo);
    }
);
