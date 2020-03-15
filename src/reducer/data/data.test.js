import offers from "../../test-mocks/test-offers";
import MockAdapter from "axios-mock-adapter";
import {createAPI} from "../../api.js";
import {reducer, ActionType, Operation} from "./data.js";

const api = createAPI(() => {});

it(`Reducer without additional parameters should return initial state`, () => {
  expect(reducer(void 0, {})).toEqual({
    availableOffers: [],
    offers: [],
  });
});

it(`Reducer should update offers by load offers`, () => {
  expect(reducer({
      availableOffers: [],
    offers: [],
  }, {
    type: ActionType.LOAD_OFFERS,
    payload: offers,
  })).toEqual({
      availableOffers: offers,
    offers,
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
