import React from 'react';
import renderer from 'react-test-renderer';
import {Provider} from "react-redux";
import {Property} from "./property";
import offers from "../../test-mocks/test-offers";
import configureStore from "redux-mock-store";
import NameSpace from "../../reducer/name-space";
import {AuthorizationStatus} from "../../const";
import reviews from "../../test-mocks/reviews";
import {BrowserRouter} from "react-router-dom";

const mockStore = configureStore([]);

const offer = offers[0];

it(`Property is rendered correctly without authorized user`, () => {
  const store = mockStore({
    [NameSpace.OFFERS]: {
      isFormBlocked: false,
      isLoading: true,
      isNearbyOffersLoading: true,
      isReviewsLoading: true,
      nearbyOffers: offers,
      offers,
      reviews,
    },
    [NameSpace.USER]: {
      authorizationStatus: AuthorizationStatus.NO_AUTH,
      authEmail: null,
    }
  });


  const tree = renderer.create(
      <Provider store={store}>
        <BrowserRouter>
          <Property
            id={`3`}
            authEmail={null}
            authorizationStatus={AuthorizationStatus.NO_AUTH}
            isLoading={false}
            isNearbyOffersLoading={false}
            isReviewsLoading={false}
            loadPropertyData={() => {}}
            nearbyOffers={offers}
            offer={offer}
            offers={offers}
            onCardHover={() => {}}
            onCardTitleClick={() => {}}
            reviews={reviews}
          />
        </BrowserRouter>
      </Provider>
  ).toJSON();

  expect(tree).toMatchSnapshot();
});

it(`Property is rendered correctly with authorized user`, () => {
  const store = mockStore({
    [NameSpace.OFFERS]: {
      isFormBlocked: false,
      isLoading: true,
      isNearbyOffersLoading: true,
      isReviewsLoading: true,
      nearbyOffers: offers,
      reviews,
    },
    [NameSpace.USER]: {
      authorizationStatus: AuthorizationStatus.NO_AUTH,
      authEmail: `AAA@adfg.ru`,
    }
  });


  const tree = renderer.create(
      <Provider store={store}>
        <BrowserRouter>
          <Property
            authEmail={`AAA@adfg.ru`}
            authorizationStatus={AuthorizationStatus.AUTH}
            id={`3`}
            isLoading={false}
            isNearbyOffersLoading={false}
            isReviewsLoading={false}
            loadPropertyData={() => {}}
            nearbyOffers={offers}
            offer={offer}
            offers={offers}
            onCardHover={() => {}}
            onCardTitleClick={() => {}}
            reviews={reviews}
          />
        </BrowserRouter>
      </Provider>
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
