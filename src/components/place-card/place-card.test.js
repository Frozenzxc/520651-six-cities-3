import React from 'react';
import renderer from 'react-test-renderer';
import PlaceCard from "./place-card";
import offers from "../../test-mocks/test-offers";
import {AuthorizationStatus, OfferType} from "../../const";

const offer = offers[0];

it(`PlaceCard is rendered correctly`, () => {

  const tree = renderer.create(
      <PlaceCard
        addToFavorite={() => {}}
        authorizationStatus={AuthorizationStatus.NO_AUTH}
        offer={offer}
        onCardTitleClick={() => {}}
        offersView={OfferType.ALL}
      />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
