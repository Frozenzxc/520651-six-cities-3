import {reducer} from "./reducer";
import {ActionType} from "./actions";
import offers from "./test-mocks/test-offers";

it(`Reducer without additional parameters should return initial state`, () => {
  expect(reducer(void 0, {})).toEqual({
    activeOffer: {},
    currentCity: offers[0].city,
    offers,
    step: -1,
  });
});

it(`Reducer should increment current step by a given value`, () => {
  expect(reducer({
    activeOffer: {},
    currentCity: offers[0].city,
    offers,
    step: -1,
  }, {
    type: ActionType.INCREMENT_STEP,
    payload: 1,
  })).toEqual({
    activeOffer: {},
    currentCity: offers[0].city,
    offers,
    step: 0,
  });

  expect(reducer({
    activeOffer: {},
    currentCity: offers[0].city,
    offers,
    step: -1,
  }, {
    type: ActionType.INCREMENT_STEP,
    payload: 0,
  })).toEqual({
    activeOffer: {},
    currentCity: offers[0].city,
    offers,
    step: -1,
  });
});


it(`Reducer should change current city by a given new value`, () => {
  expect(reducer({
    activeOffer: {},
    currentCity: offers[0].city,
    offers,
    step: -1,
  }, {
    type: ActionType.SELECT_CITY,
    payload: offers[1].city,
  })).toEqual({
    activeOffer: {},
    currentCity: offers[1].city,
    offers,
    step: -1,
  });

  expect(reducer({
    activeOffer: {},
    currentCity: offers[0].city,
    offers,
    step: -1,
  }, {
    type: ActionType.SELECT_CITY,
    payload: offers[0].city,
  })).toEqual({
    activeOffer: {},
    currentCity: offers[0].city,
    offers,
    step: -1,
  });
});

it(`Reducer should change active offer by a given new value`, () => {
  expect(reducer({
    activeOffer: {},
    currentCity: offers[0].city,
    offers,
    step: -1,
  }, {
    type: ActionType.SELECT_OFFER,
    payload: offers[1],
  })).toEqual({
    activeOffer: offers[1],
    currentCity: offers[0].city,
    offers,
    step: -1,
  });

  expect(reducer({
    activeOffer: {},
    currentCity: offers[0].city,
    offers,
    step: -1,
  }, {
    type: ActionType.SELECT_OFFER,
    payload: {},
  })).toEqual({
    activeOffer: {},
    currentCity: offers[0].city,
    offers,
    step: -1,
  });
});
