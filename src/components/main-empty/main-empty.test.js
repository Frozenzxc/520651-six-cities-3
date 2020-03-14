import React from "react";
import renderer from "react-test-renderer";
import MainEmpty from "./main-empty.jsx";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";

const mockStore = configureStore([]);

it(`Should MainEmpty component render correctly`, () => {

  const store = mockStore({});

  const tree = renderer
        .create(
            <Provider store={store}>
              <MainEmpty/>
            </Provider>
        )
        .toJSON();

  expect(tree).toMatchSnapshot();
});
