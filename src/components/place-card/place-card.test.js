import React from 'react';
import renderer from 'react-test-renderer';
import PlaceCard from "./place-card";
import offers from "../../test-mocks/test-offers";

const offer = offers[0];

it(`PlaceCard is rendered correctly`, () => {
  const tree = renderer.create(
      <PlaceCard
        offer={offer}
        onCardTitleClick={() => {}}
      />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
