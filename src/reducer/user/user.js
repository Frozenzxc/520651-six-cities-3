import {AuthorizationStatus} from "../../const";
import {extend} from "../../utils";

const initialState = {
  authorizationStatus: AuthorizationStatus.NO_AUTH,
  authEmail: null,
  isSignedIn: false,
};

const ActionType = {
  REQUIRED_AUTHORIZATION: `REQUIRED_AUTHORIZATION`,
  SUCCESSFUL_AUTHORIZATION: `SUCCESSFUL_AUTHORIZATION`,
  SIGNING_IN: `SIGNING_IN`,
};

const ActionCreator = {
  requireAuthorization: (status) => {
    return {
      type: ActionType.REQUIRED_AUTHORIZATION,
      payload: status,
    };
  },
  successfulAuthorization: (response) => {
    return {
      type: ActionType.SUCCESSFUL_AUTHORIZATION,
      payload: response,
    };
  },
  signingIn: () => {
    return {
      type: ActionType.SIGNING_IN,
      payload: null,
    };
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.REQUIRED_AUTHORIZATION:
      return Object.assign({}, state, {
        authorizationStatus: action.payload,
      });
    case ActionType.SUCCESSFUL_AUTHORIZATION:
      return Object.assign({}, state, {
        authEmail: action.payload.data.email,
      });
    case ActionType.SIGNING_IN:
      return extend(state, {
        isSignedIn: !state.isSignedIn,
      });
  }

  return state;
};

const Operation = {
  checkAuth: () => (dispatch, getState, api) => {
    return api.get(`/login`)
            .then((response) => {
              dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.AUTH));
              dispatch(ActionCreator.successfulAuthorization(response));
            })
            .catch((err) => {
              throw err;
            });
  },

  login: (authData) => (dispatch, getState, api) => {
    return api.post(`/login`, {
      email: authData.login,
      password: authData.password,
    })
            .then((response) => {
              dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.AUTH));
              dispatch(ActionCreator.successfulAuthorization(response));
              dispatch(ActionCreator.signingIn());
            });
  },
};


export {
  ActionCreator,
  ActionType,
  AuthorizationStatus,
  Operation,
  reducer,
};
