import React from 'react';
import renderer from 'react-test-renderer';
import PlaceCard from "./place-card";
import offers from "../../test-mocks/test-offers";
import {AuthorizationStatus, OfferType} from "../../const";
import {BrowserRouter} from "react-router-dom";

const offer = offers[0];

it(`PlaceCard is rendered correctly`, () => {

  const tree = renderer.create(
      <BrowserRouter>
        <PlaceCard
          addToFavorite={() => {}}
          authorizationStatus={AuthorizationStatus.NO_AUTH}
          isFavorite={true}
          offer={offer}
          onCardHover={() => {}}
          onFavoriteClick={() => {}}
          onTitleClick={() => {}}
          offersView={OfferType.ALL}
        />
      </BrowserRouter>
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
