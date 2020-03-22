import offers from "../../test-mocks/test-offers";
import reviews from "../../test-mocks/reviews";
import MockAdapter from "axios-mock-adapter";
import {createAPI} from "../../api.js";
import {reducer, ActionType, Operation} from "./offers.js";
import notParsedOffers from "../../test-mocks/not-parsed-offers";
import notParsedReviews from "../../test-mocks/not-parsed-reviews";
import {ReviewPostingStatus} from "../../const";

const api = createAPI(() => {});

it(`Reducer without additional parameters should return initial state`, () => {
  expect(reducer(void 0, {})).toEqual({
    availableOffers: [],
    activeID: null,
    activeOffer: null,
    currentCity: `Amsterdam`,
    isFormBlocked: false,
    isLoading: true,
    offers: [],
    isPropertyLoading: true,
    nearbyOffers: [],
    reviews: [],
    reviewPostingStatus: null,
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

it(`Reducer should update reviews by load reviews`, () => {
  expect(reducer({
    isPropertyLoading: true,
    reviews: [],
  }, {
    type: ActionType.LOAD_REVIEWS,
    payload: notParsedReviews,
  })).toEqual({
    isPropertyLoading: false,
    reviews,
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

  it(`Should make a correct API call to /comments/id`, function () {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const reviewsLoader = Operation.loadReviews(36);

    apiMock
            .onGet(`/comments/36`)
            .reply(200, [{fake: true}]);

    return reviewsLoader(dispatch, () => {}, api)
            .then(() => {
              expect(dispatch).toHaveBeenCalledTimes(1);
              expect(dispatch).toHaveBeenNthCalledWith(1, {
                type: ActionType.LOAD_REVIEWS,
                payload: [{fake: true}],
              });
            });
  });

  it(`Should make a correct API call to /hotels/:id/nearby`, function () {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const nearbyOffersLoader = Operation.loadNearbyOffers(4);

    apiMock
            .onGet(`/hotels/4/nearby`)
            .reply(200, [{fake: true}]);

    return nearbyOffersLoader(dispatch, () => {}, api)
            .then(() => {
              expect(dispatch).toHaveBeenCalledTimes(1);
              expect(dispatch).toHaveBeenNthCalledWith(1, {
                type: ActionType.LOAD_NEARBY_OFFERS,
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

it(`Reducer should load nearby offers by a given new value`, () => {
  expect(reducer({
    nearbyOffers: []
  }, {
    type: ActionType.LOAD_NEARBY_OFFERS,
    payload: notParsedOffers,
  })).toEqual({
    nearbyOffers: offers,
  });

  expect(reducer({
    nearbyOffers: [],
  }, {
    type: ActionType.LOAD_NEARBY_OFFERS,
    payload: [],
  })).toEqual({
    nearbyOffers: [],
  });
});

it(`Reducer should load reviews by a given new value`, () => {
  expect(reducer({
    isPropertyLoading: true,
    reviews: [],
  }, {
    type: ActionType.LOAD_REVIEWS,
    payload: notParsedReviews,
  })).toEqual({
    isPropertyLoading: false,
    reviews,
  });
});

it(`Reducer should block form on submit`, () => {
  expect(reducer({
    isFormBlocked: false,
  }, {
    type: ActionType.BLOCK_FORM,
    payload: true,
  })).toEqual({
    isFormBlocked: true,
  });

  expect(reducer({
    isFormBlocked: false,
  }, {
    type: ActionType.BLOCK_FORM,
    payload: false,
  })).toEqual({
    isFormBlocked: false,
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

it(`Reducer should change value by successful post review`, () => {
  expect(reducer({
    reviewPostingStatus: null,
  }, {
    type: ActionType.SUCCESSFUL_POST_REVIEW,
    payload: ReviewPostingStatus.POSTED,
  })).toEqual({
    reviewPostingStatus: ReviewPostingStatus.POSTED,
  });

  expect(reducer({
    reviewPostingStatus: null,
  }, {
    type: ActionType.SUCCESSFUL_POST_REVIEW,
    payload: ReviewPostingStatus.ERROR,
  })).toEqual({
    reviewPostingStatus: ReviewPostingStatus.ERROR,
  });
});

