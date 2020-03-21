import {reducer, ActionCreator, ActionType} from "./user.js";
import {AuthorizationStatus} from "../../const";

const response = {
  data: {
    email: `AAA@adfg.ru`,
  }
};


it(`Reducer without additional parameters should return initial state`, () => {
  expect(reducer(void 0, {})).toEqual({
    authorizationStatus: AuthorizationStatus.NO_AUTH,
    authEmail: null,
    isSignIn: false,
  });
});

it(`Reducer should change authorizationStatus by a given value`, () => {
  expect(reducer({
    authorizationStatus: AuthorizationStatus.NO_AUTH,
  }, {
    type: ActionType.REQUIRED_AUTHORIZATION,
    payload: AuthorizationStatus.AUTH,
  })).toEqual({
    authorizationStatus: AuthorizationStatus.AUTH,
  });

  expect(reducer({
    authorizationStatus: AuthorizationStatus.AUTH,
  }, {
    type: ActionType.REQUIRED_AUTHORIZATION,
    payload: AuthorizationStatus.NO_AUTH,
  })).toEqual({
    authorizationStatus: AuthorizationStatus.NO_AUTH,
  });

  expect(reducer({
    authorizationStatus: AuthorizationStatus.AUTH,
  }, {
    type: ActionType.REQUIRED_AUTHORIZATION,
    payload: AuthorizationStatus.AUTH,
  })).toEqual({
    authorizationStatus: AuthorizationStatus.AUTH,
  });

  expect(reducer({
    authorizationStatus: AuthorizationStatus.NO_AUTH,
  }, {
    type: ActionType.REQUIRED_AUTHORIZATION,
    payload: AuthorizationStatus.NO_AUTH,
  })).toEqual({
    authorizationStatus: AuthorizationStatus.NO_AUTH,
  });

  expect(reducer({
    authEmail: null,
  }, {
    type: ActionType.SUCCESSFUL_AUTHORIZATION,
    payload: response,
  })).toEqual({
    authEmail: `AAA@adfg.ru`,
  });

  expect(reducer({
    isSignIn: false,
  }, {
    type: ActionType.SIGNING_IN,
    payload: null,
  })).toEqual({
    isSignIn: true,
  });

  expect(reducer({
    isSignIn: true,
  }, {
    type: ActionType.SIGNING_IN,
    payload: null,
  })).toEqual({
    isSignIn: false,
  });
});

describe(`Action creators work correctly`, () => {
  it(`Action creator for require authorization returns correct action`, () => {
    expect(ActionCreator.requireAuthorization(AuthorizationStatus.NO_AUTH)).toEqual({
      type: ActionType.REQUIRED_AUTHORIZATION,
      payload: AuthorizationStatus.NO_AUTH,
    });

    expect(ActionCreator.requireAuthorization(AuthorizationStatus.AUTH)).toEqual({
      type: ActionType.REQUIRED_AUTHORIZATION,
      payload: AuthorizationStatus.AUTH,
    });
  });

  it(`Action creator for successful authorization returns correct action`, () => {
    expect(ActionCreator.successfulAuthorization({})).toEqual({
      type: ActionType.SUCCESSFUL_AUTHORIZATION,
      payload: {},
    });

    expect(ActionCreator.successfulAuthorization(response)).toEqual({
      type: ActionType.SUCCESSFUL_AUTHORIZATION,
      payload: response,
    });
  });

  it(`Action creator for SignIn screen returns correct action`, () => {
    expect(ActionCreator.signingIn()).toEqual({
      type: ActionType.SIGNING_IN,
      payload: null,
    });
  });
});
