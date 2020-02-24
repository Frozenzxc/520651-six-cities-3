import React from 'react';
import renderer from 'react-test-renderer';
import Map from "./map";
import offers from "../../test-mocks/test-offers";
import leaflet from "../../__mocks__/leaflet";

it(`Map is rendered correctly`, () => {
  const tree = renderer.create(
      <Map
        offers={offers}
        leaflet={leaflet}
      />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
