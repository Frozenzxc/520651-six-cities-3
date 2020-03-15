import NameSpace from "../name-space.js";

export const getActiveID = (state) => {
  return state[NameSpace.BOARD].activeID;
};

export const getCurrentCity = (state) => {
  return state[NameSpace.BOARD].currentCity;
};

export const getActiveOffer = (state) => {
  return state[NameSpace.BOARD].activeOffer;
};


