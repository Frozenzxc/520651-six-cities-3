import * as React from "react";
import * as renderer from "react-test-renderer";
import Map from "./map";
import {offers} from "../../test-mocks/test-offers";
import * as leaflet from "../../__mocks__/leaflet";

it(`Map is rendered correctly`, () => {
  const tree = renderer.create(
      <Map
        activeOffer={offers[0]}
        offers={offers}
        leaflet={leaflet}
      />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
