import {board} from "./board";
import {ActionType} from "./actions";
import offers from "../../test-mocks/test-offers";

it(`Reducer without additional parameters should return initial state`, () => {
  expect(board(void 0, {})).toEqual({
    activeID: null,
    activeOffer: null,
    availableOffers: offers.filter((offer) => offer.city === offers[0].city),
    currentCity: offers[0].city,
    offers,
  });
});

it(`Reducer should increment current step by a given value`, () => {
  expect(board({
    activeID: null,
    activeOffer: null,
    availableOffers: offers.filter((offer) => offer.city === offers[0].city),
    currentCity: offers[0].city,
    offers,
  }, {
    type: ActionType.SELECT_CARD,
    payload: 23,
  })).toEqual({
    activeID: 23,
    activeOffer: null,
    availableOffers: offers.filter((offer) => offer.city === offers[0].city),
    currentCity: offers[0].city,
    offers,
  });

  expect(board({
    activeID: null,
    activeOffer: null,
    availableOffers: offers.filter((offer) => offer.city === offers[0].city),
    currentCity: offers[0].city,
    offers,
  }, {
    type: ActionType.SELECT_CARD,
    payload: null,
  })).toEqual({
    activeID: null,
    activeOffer: null,
    availableOffers: offers.filter((offer) => offer.city === offers[0].city),
    currentCity: offers[0].city,
    offers,
  });
});


it(`Reducer should change current city by a given new value`, () => {
  expect(board({
    activeID: null,
    activeOffer: null,
    availableOffers: offers.filter((offer) => offer.city === offers[0].city),
    currentCity: offers[0].city,
    offers,
  }, {
    type: ActionType.SELECT_CITY,
    payload: offers[1].city,
  })).toEqual({
    activeID: null,
    activeOffer: null,
    availableOffers: offers.filter((offer) => offer.city === offers[0].city),
    currentCity: offers[1].city,
    offers,
  });

  expect(board({
    activeID: null,
    activeOffer: null,
    availableOffers: offers.filter((offer) => offer.city === offers[0].city),
    currentCity: offers[0].city,
    offers,
  }, {
    type: ActionType.SELECT_CITY,
    payload: offers[0].city,
  })).toEqual({
    activeID: null,
    activeOffer: null,
    availableOffers: offers.filter((offer) => offer.city === offers[0].city),
    currentCity: offers[0].city,
    offers,
  });
});

it(`Reducer should change active offer by a given new value`, () => {
  expect(board({
    activeID: null,
    activeOffer: null,
    availableOffers: offers.filter((offer) => offer.city === offers[0].city),
    currentCity: offers[0].city,
    offers,
  }, {
    type: ActionType.SELECT_OFFER,
    payload: offers[1],
  })).toEqual({
    activeID: null,
    activeOffer: offers[1],
    availableOffers: offers.filter((offer) => offer.city === offers[0].city),
    currentCity: offers[0].city,
    offers,
  });

  expect(board({
    activeID: null,
    activeOffer: null,
    availableOffers: offers.filter((offer) => offer.city === offers[0].city),
    currentCity: offers[0].city,
    offers,
  }, {
    type: ActionType.SELECT_OFFER,
    payload: null,
  })).toEqual({
    activeID: null,
    activeOffer: null,
    availableOffers: offers.filter((offer) => offer.city === offers[0].city),
    currentCity: offers[0].city,
    offers,
  });
});
