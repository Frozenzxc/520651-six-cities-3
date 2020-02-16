import React from 'react';
import renderer from 'react-test-renderer';
import PlaceCard from "./place-card";

const offer = {
  id: 1,
  title: `Beautiful & luxurious apartment at great location`,
  price: 200,
};

it(`PlaceCard is rendered correctly`, () => {
  const tree = renderer.create(
      <PlaceCard
        offer={offer}
        onCardTitleClick={() => {}}
      />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
