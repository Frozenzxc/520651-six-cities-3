import React from "react";
import renderer from "react-test-renderer";
import App from "./app";
import offers from "../../test-mocks/test-offers";

const OFFERS_COUNT = 55;

it(`Render App`, () => {
  const tree = renderer
        .create(<App
          offers={offers}
          offersCount={OFFERS_COUNT}
        />)
        .toJSON();

  expect(tree).toMatchSnapshot();
});
