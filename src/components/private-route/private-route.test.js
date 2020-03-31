import React from "react";
import PrivateRoute from "./private-route";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import NameSpace from "../../reducer/name-space";
import {AppRoute, AuthorizationStatus} from "../../const";
import {configure, mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {MemoryRouter} from "react-router-dom";

configure({adapter: new Adapter()});

const mockStore = configureStore([]);

const MockComponent = () => {

  return (
    <div>
    </div>
  );
};

describe(`PrivateRoute`, () => {
  it(`should render component if user has been authorized`, () => {

    const store = mockStore({
      [NameSpace.USER]: {
        authorizationStatus: AuthorizationStatus.AUTH,
      }
    });

    const enzymeWrapper = mount(
        <Provider store={store}>
          <MemoryRouter initialEntries={[AppRoute.FAVORITES]}>
            <PrivateRoute authorizationStatus={AuthorizationStatus.AUTH} render={() => <MockComponent/>} path={AppRoute.FAVORITES} exact={true}/>
          </MemoryRouter>
        </Provider>
    );

    expect(enzymeWrapper.exists(MockComponent)).toBe(true);
  });

  it(`should redirect if user is not authorized`, () => {

    const store = mockStore({
      [NameSpace.USER]: {
        authorizationStatus: AuthorizationStatus.NO_AUTH,
      }
    });

    const enzymeWrapper = mount(
        <Provider store={store}>
          <MemoryRouter initialEntries={[AppRoute.FAVORITES]}>
            <PrivateRoute authorizationStatus={AuthorizationStatus.NO_AUTH} render={() => MockComponent} path={AppRoute.FAVORITES} exact={true}/>
          </MemoryRouter>
        </Provider>
    );
    const history = enzymeWrapper.find(`Router`).prop(`history`);
    expect(history.location.pathname).toBe(AppRoute.LOGIN);
  });
});
