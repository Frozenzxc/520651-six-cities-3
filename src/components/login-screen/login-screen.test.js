import React from "react";
import renderer from "react-test-renderer";
import LoginScreen from "./login-screen";

it(`LoginScreen component render correctly`, () => {
  const tree = renderer.create(
      <LoginScreen
        onSubmit={() => {}}
      />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
