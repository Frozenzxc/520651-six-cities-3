import * as React from "react";
import * as renderer from "react-test-renderer";
import {BrowserRouter} from "react-router-dom";
import Main from "./main";
import {offers} from "../../test-mocks/test-offers";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import NameSpace from "../../reducer/name-space";
import {AuthorizationStatus} from "../../const";
import {noop} from "../../utils";

const mockStore = configureStore([]);

it(`Should Main component render correctly with not authorized user`, () => {

  const store = mockStore({
    [NameSpace.OFFERS]: {
      availableOffers: offers.filter((offer) => offer.city.name === offers[0].city.name),
      offers,
      currentCity: offers[0].city.name,
    },
    [NameSpace.USER]: {
      authorizationStatus: AuthorizationStatus.NO_AUTH,
      authEmail: null,
    },
  });

  const tree = renderer
        .create(
            <Provider store={store}>
              <BrowserRouter>
                <Main
                  activeOffer={offers[0]}
                  availableOffers={offers.filter((offer) => offer.city.name === offers[0].city.name)}
                  authEmail={null}
                  authorizationStatus={AuthorizationStatus.NO_AUTH}
                  onCardHover={noop}
                  onCardTitleClick={noop}
                  currentCity={offers[0].city.name}
                />
              </BrowserRouter>
            </Provider>
        )
        .toJSON();

  expect(tree).toMatchSnapshot();
});

it(`Should Main component render correctly with authorized user`, () => {

  const store = mockStore({
    [NameSpace.OFFERS]: {
      availableOffers: offers.filter((offer) => offer.city.name === offers[0].city.name),
      offers,
      currentCity: offers[0].city.name,
    },
    [NameSpace.USER]: {
      authorizationStatus: AuthorizationStatus.AUTH,
      authEmail: `AAA@adfg.ru`,
    },
  });

  const tree = renderer
        .create(
            <Provider store={store}>
              <BrowserRouter>
                <Main
                  activeOffer={offers[0]}
                  availableOffers={offers.filter((offer) => offer.city.name === offers[0].city.name)}
                  authEmail={`AAA@adfg.ru`}
                  authorizationStatus={AuthorizationStatus.AUTH}
                  onCardHover={noop}
                  onCardTitleClick={noop}
                  currentCity={offers[0].city.name}
                />
              </BrowserRouter>
            </Provider>
        )
        .toJSON();

  expect(tree).toMatchSnapshot();
});
