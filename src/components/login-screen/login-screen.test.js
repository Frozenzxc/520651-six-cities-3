import React from "react";
import renderer from "react-test-renderer";
import LoginScreen from "./login-screen";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import NameSpace from "../../reducer/name-space";

const mockStore = configureStore([]);

it(`LoginScreen component render correctly`, () => {
  const store = mockStore({
    [NameSpace.USER]: {}
  });

  const tree = renderer.create(
      <Provider store={store}>
        <LoginScreen
          login={() => {}}
          onSignInClick={() => {}}
        />
      </Provider>
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
