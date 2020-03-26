import React from "react";
import {BrowserRouter} from "react-router-dom";
import renderer from "react-test-renderer";
import Main from "./main.jsx";
import offers from "../../test-mocks/test-offers";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import NameSpace from "../../reducer/name-space";
import {AuthorizationStatus} from "../../const";

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
                  onCardHover={() => {}}
                  onCardTitleClick={() => {}}
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
                  onCardHover={() => {}}
                  onCardTitleClick={() => {}}
                  currentCity={offers[0].city.name}
                />
              </BrowserRouter>
            </Provider>
        )
        .toJSON();

  expect(tree).toMatchSnapshot();
});
