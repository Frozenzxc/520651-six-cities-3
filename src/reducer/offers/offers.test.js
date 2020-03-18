import offers from "../../test-mocks/test-offers";
import MockAdapter from "axios-mock-adapter";
import {createAPI} from "../../api.js";
import {reducer, ActionType, Operation} from "./offers.js";
import notParsedOffers from "../../test-mocks/not-parsed-offers";

const api = createAPI(() => {});

it(`Reducer without additional parameters should return initial state`, () => {
  expect(reducer(void 0, {})).toEqual({
    availableOffers: [],
    activeID: null,
    activeOffer: null,
    currentCity: `Amsterdam`,
    isLoading: true,
    offers: [],
  });
});

it(`Reducer should update offers by load offers`, () => {
  expect(reducer({
    offers: [],
    isLoading: true,
  }, {
    type: ActionType.LOAD_OFFERS,
    payload: notParsedOffers,
  })).toEqual({
    offers,
    currentCity: offers[0].city.name,
    isLoading: false,
  });
});

describe(`Operation work correctly`, () => {
  it(`Should make a correct API call to /hotels`, function () {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const offersLoader = Operation.loadOffers();

    apiMock
            .onGet(`/hotels`)
            .reply(200, [{fake: true}]);

    return offersLoader(dispatch, () => {}, api)
            .then(() => {
              expect(dispatch).toHaveBeenCalledTimes(1);
              expect(dispatch).toHaveBeenNthCalledWith(1, {
                type: ActionType.LOAD_OFFERS,
                payload: [{fake: true}],
              });
            });
  });
});

it(`Reducer should select offer by a given value`, () => {
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
