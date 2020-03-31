import * as React from "react";
import * as renderer from "react-test-renderer";
import LoginScreen from "./login-screen";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import NameSpace from "../../reducer/name-space";
import {noop} from "../../utils";

const mockStore = configureStore([]);

it(`LoginScreen component render correctly`, () => {
  const store = mockStore({
    [NameSpace.USER]: {}
  });

  const tree = renderer.create(
      <Provider store={store}>
        <LoginScreen
          login={noop}
          onSignInClick={noop}
        />
      </Provider>
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
