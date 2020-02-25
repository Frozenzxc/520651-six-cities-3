import React from 'react';
import renderer from 'react-test-renderer';
import PlacesList from "./places-list";
import {OffersView} from "../../test-mocks/test-offersView";
import offers from "../../test-mocks/test-offers";

it(`PlacesList is rendered correctly`, () => {
  const tree = renderer.create(
      <PlacesList
        offers={offers}
        onCardTitleClick={() => {}}
        offersView={OffersView.ALL}
      />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
