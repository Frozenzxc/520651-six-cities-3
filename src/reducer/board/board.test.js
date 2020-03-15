import {ActionType} from "./actions";
import offers from "../../test-mocks/test-offers";
import {reducer} from "./board";

it(`Reducer without additional parameters should return initial state`, () => {
  expect(reducer(void 0, {})).toEqual({
    activeID: null,
    activeOffer: null,
    availableOffers: offers.filter((offer) => offer.city.name === `Amsterdam`),
    currentCity: `Amsterdam`,
    offers,
  });
});

it(`Reducer should increment current step by a given value`, () => {
  expect(reducer({
    activeID: null,
    activeOffer: null,
    availableOffers: offers.filter((offer) => offer.city.name === offers[0].city.name),
    currentCity: offers[0].city.name,
    offers,
  }, {
    type: ActionType.SELECT_CARD,
    payload: 23,
  })).toEqual({
    activeID: 23,
    activeOffer: null,
    availableOffers: offers.filter((offer) => offer.city.name === offers[0].city.name),
    currentCity: offers[0].city.name,
    offers,
  });

  expect(reducer({
    activeID: null,
    activeOffer: null,
    availableOffers: offers.filter((offer) => offer.city.name === offers[0].city.name),
    currentCity: offers[0].city.name,
    offers,
  }, {
    type: ActionType.SELECT_CARD,
    payload: null,
  })).toEqual({
    activeID: null,
    activeOffer: null,
    availableOffers: offers.filter((offer) => offer.city.name === offers[0].city.name),
    currentCity: offers[0].city.name,
    offers,
  });
});


it(`Reducer should change current city by a given new value`, () => {
  expect(reducer({
    activeID: null,
    activeOffer: null,
    availableOffers: offers.filter((offer) => offer.city.name === offers[0].city.name),
    currentCity: offers[0].city.name,
    offers,
  }, {
    type: ActionType.SELECT_CITY,
    payload: offers[1].city.name,
  })).toEqual({
    activeID: null,
    activeOffer: null,
    availableOffers: offers.filter((offer) => offer.city.name === offers[0].city.name),
    currentCity: offers[1].city.name,
    offers,
  });

  expect(reducer({
    activeID: null,
    activeOffer: null,
    availableOffers: offers.filter((offer) => offer.city.name === offers[0].city.name),
    currentCity: offers[0].city.name,
    offers,
  }, {
    type: ActionType.SELECT_CITY,
    payload: offers[0].city.name,
  })).toEqual({
    activeID: null,
    activeOffer: null,
    availableOffers: offers.filter((offer) => offer.city.name === offers[0].city.name),
    currentCity: offers[0].city.name,
    offers,
  });
});

it(`Reducer should change active offer by a given new value`, () => {
  expect(reducer({
    activeID: null,
    activeOffer: null,
    availableOffers: offers.filter((offer) => offer.city.name === offers[0].city.name),
    currentCity: offers[0].city.name,
    offers,
  }, {
    type: ActionType.SELECT_OFFER,
    payload: offers[1],
  })).toEqual({
    activeID: null,
    activeOffer: offers[1],
    availableOffers: offers.filter((offer) => offer.city.name === offers[0].city.name),
    currentCity: offers[0].city.name,
    offers,
  });

  expect(reducer({
    activeID: null,
    activeOffer: null,
    availableOffers: offers.filter((offer) => offer.city.name === offers[0].city.name),
    currentCity: offers[0].city.name,
    offers,
  }, {
    type: ActionType.SELECT_OFFER,
    payload: null,
  })).toEqual({
    activeID: null,
    activeOffer: null,
    availableOffers: offers.filter((offer) => offer.city.name === offers[0].city.name),
    currentCity: offers[0].city.name,
    offers,
  });
});
