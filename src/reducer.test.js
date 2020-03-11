import {reducer} from "./reducer";
import {ActionType} from "./actions";
import offers from "./test-mocks/test-offers";

it(`Reducer without additional parameters should return initial state`, () => {
  expect(reducer(void 0, {})).toEqual({
    activeID: null,
    activeOffer: {},
    currentCity: offers[0].city,
    offers,
  });
});

it(`Reducer should increment current step by a given value`, () => {
  expect(reducer({
    activeID: null,
    activeOffer: {},
    currentCity: offers[0].city,
    offers,
  }, {
    type: ActionType.SELECT_CARD,
    payload: 23,
  })).toEqual({
    activeID: 23,
    activeOffer: {},
    currentCity: offers[0].city,
    offers,
  });

  expect(reducer({
    activeID: null,
    activeOffer: {},
    currentCity: offers[0].city,
    offers,
  }, {
    type: ActionType.SELECT_CARD,
    payload: null,
  })).toEqual({
    activeID: null,
    activeOffer: {},
    currentCity: offers[0].city,
    offers,
  });
});


it(`Reducer should change current city by a given new value`, () => {
  expect(reducer({
    activeID: null,
    activeOffer: {},
    currentCity: offers[0].city,
    offers,
  }, {
    type: ActionType.SELECT_CITY,
    payload: offers[1].city,
  })).toEqual({
    activeID: null,
    activeOffer: {},
    currentCity: offers[1].city,
    offers,
  });

  expect(reducer({
    activeID: null,
    activeOffer: {},
    currentCity: offers[0].city,
    offers,
  }, {
    type: ActionType.SELECT_CITY,
    payload: offers[0].city,
  })).toEqual({
    activeID: null,
    activeOffer: {},
    currentCity: offers[0].city,
    offers,
  });
});

it(`Reducer should change active offer by a given new value`, () => {
  expect(reducer({
    activeID: null,
    activeOffer: {},
    currentCity: offers[0].city,
    offers,
  }, {
    type: ActionType.SELECT_OFFER,
    payload: offers[1],
  })).toEqual({
    activeID: null,
    activeOffer: offers[1],
    currentCity: offers[0].city,
    offers,
  });

  expect(reducer({
    activeID: null,
    activeOffer: {},
    currentCity: offers[0].city,
    offers,
  }, {
    type: ActionType.SELECT_OFFER,
    payload: {},
  })).toEqual({
    activeID: null,
    activeOffer: {},
    currentCity: offers[0].city,
    offers,
  });
});
