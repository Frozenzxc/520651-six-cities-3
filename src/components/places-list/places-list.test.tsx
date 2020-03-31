import * as React from "react";
import * as renderer from "react-test-renderer";
import {Provider} from "react-redux";
import PlacesList from "./places-list";
import {AuthorizationStatus, OfferType} from "../../const";
import {offers} from "../../test-mocks/test-offers";
import configureStore from "redux-mock-store";
import NameSpace from "../../reducer/name-space";
import {BrowserRouter} from "react-router-dom";
import {noop} from "../../utils";

const mockStore = configureStore([]);

it(`PlacesList is rendered correctly`, () => {
  const store = mockStore({
    [NameSpace.USER]: {
      authorizationStatus: AuthorizationStatus.AUTH,
    }
  });

  const tree = renderer.create(
      <Provider store={store}>
        <BrowserRouter>
          <PlacesList
            addToFavorite={noop}
            authorizationStatus={AuthorizationStatus.AUTH}
            offers={offers}
            onCardHover={noop}
            onCardTitleClick={noop}
            offersView={OfferType.ALL}
          />
        </BrowserRouter>
      </Provider>
  ).toJSON();

  expect(tree).toMatchSnapshot();
});

it(`PlacesList is rendered correctly without offers`, () => {
  const store = mockStore({
    [NameSpace.USER]: {
      authorizationStatus: AuthorizationStatus.AUTH,
    }
  });

  const tree = renderer.create(
      <Provider store={store}>
        <BrowserRouter>
          <PlacesList
            addToFavorite={noop}
            authorizationStatus={AuthorizationStatus.AUTH}
            offers={[]}
            onCardHover={noop}
            onCardTitleClick={noop}
            offersView={OfferType.ALL}
          />
        </BrowserRouter>
      </Provider>
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
