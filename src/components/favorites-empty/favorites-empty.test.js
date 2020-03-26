import React from "react";
import renderer from "react-test-renderer";
import {BrowserRouter} from "react-router-dom";
import FavoritesEmpty from "./favorites-empty";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import NameSpace from "../../reducer/name-space";
import {AuthorizationStatus} from "../../const";

const mockStore = configureStore([]);

it(`Should FavoritesEmpty component render correctly`, () => {

  const store = mockStore({
    [NameSpace.USER]: {
      authorizationStatus: AuthorizationStatus.NO_AUTH,
      authEmail: `AAA@adfg.ru`,
    }
  });

  const tree = renderer
        .create(
            <Provider store={store}>
              <BrowserRouter>
                <FavoritesEmpty authorizationStatus={AuthorizationStatus.NO_AUTH} authEmail={`AAA@adfg.ru`}/>
              </BrowserRouter>
            </Provider>
        )
        .toJSON();

  expect(tree).toMatchSnapshot();
});
