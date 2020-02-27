import React from 'react';
import renderer from 'react-test-renderer';
import PlacesList from "./places-list";
import {OfferType} from "../../const";
import offers from "../../test-mocks/test-offers";

it(`PlacesList is rendered correctly`, () => {
  const tree = renderer.create(
      <PlacesList
        offers={offers}
        onCardTitleClick={() => {}}
        offersView={OfferType.ALL}
      />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
