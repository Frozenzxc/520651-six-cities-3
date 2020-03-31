import * as React from "react";
import * as renderer from "react-test-renderer";
import {App} from "./app";
import {Provider} from "react-redux";
import {offers} from "../../test-mocks/test-offers";
import configureStore from "redux-mock-store";
import NameSpace from "../../reducer/name-space";
import {AuthorizationStatus} from "../../const";
import {noop} from "../../utils";

const mockStore = configureStore([]);

it(`Render App without loading screen`, () => {

  const store = mockStore({
    [NameSpace.OFFERS]: {
      activeID: null,
      activeOffer: offers[1],
      currentCity: offers[0].city.name,
      availableOffers: offers.filter((offer) => offer.city.name === offers[0].city.name),
      offers,
    },
    [NameSpace.USER]: {
      authorizationStatus: AuthorizationStatus.NO_AUTH,
      authEmail: null,
    }
  });
  const tree = renderer
        .create(
            <Provider store={store}>
              <App
                activeOffer={offers[0]}
                availableOffers={offers.filter((offer) => offer.city.name === offers[0].city.name)}
                authorizationStatus={AuthorizationStatus.NO_AUTH}
                authEmail={null}
                currentCity={offers[0].city.name}
                isLoading={false}
                isSignedIn={false}
                onCardHover={noop}
                onCardTitleClick={noop}
              />
            </Provider>)
        .toJSON();

  expect(tree).toMatchSnapshot();
});

it(`Render App with loading screen`, () => {

  const store = mockStore({
    [NameSpace.OFFERS]: {
      activeOffer: offers[1],
      currentCity: offers[0].city.name,
      availableOffers: offers.filter((offer) => offer.city.name === offers[0].city.name),
      offers,
    },
    [NameSpace.USER]: {
      authorizationStatus: AuthorizationStatus.AUTH,
      authEmail: `AAA@adfg.ru`,
      isSignIn: false
    },
  });
  const tree = renderer
        .create(
            <Provider store={store}>
              <App
                activeOffer={offers[0]}
                availableOffers={offers.filter((offer) => offer.city.name === offers[0].city.name)}
                currentCity={offers[0].city.name}
                authorizationStatus={AuthorizationStatus.AUTH}
                authEmail={`AAA@adfg.ru`}
                isSignedIn={false}
                isLoading={false}
                onCardHover={noop}
                onCardTitleClick={noop}
              />
            </Provider>)
        .toJSON();

  expect(tree).toMatchSnapshot();
});

it(`Render App with SignIn screen`, () => {

  const store = mockStore({
    [NameSpace.OFFERS]: {
      activeOffer: offers[1],
      currentCity: offers[0].city.name,
      availableOffers: offers.filter((offer) => offer.city.name === offers[0].city.name),
      offers,
    },
    [NameSpace.USER]: {
      authorizationStatus: AuthorizationStatus.AUTH,
      authEmail: `AAA@adfg.ru`,
      isSignIn: false
    },
  });
  const tree = renderer
        .create(
            <Provider store={store}>
              <App
                activeOffer={offers[0]}
                availableOffers={offers.filter((offer) => offer.city.name === offers[0].city.name)}
                currentCity={offers[0].city.name}
                authorizationStatus={AuthorizationStatus.AUTH}
                authEmail={`AAA@adfg.ru`}
                isSignedIn={true}
                isLoading={false}
                onCardHover={noop}
                onCardTitleClick={noop}
              />
            </Provider>)
        .toJSON();

  expect(tree).toMatchSnapshot();
});
