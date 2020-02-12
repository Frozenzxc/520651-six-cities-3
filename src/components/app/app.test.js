import React from "react";
import renderer from "react-test-renderer";
import App from "./app";

const OFFERS_COUNT = 55;
const offerTitles = [`Good`, `Bad`, `Ugly`];

it(`Render App`, () => {
  const tree = renderer
        .create(<App
          offerTitles={offerTitles}
          offersCount={OFFERS_COUNT}
        />)
        .toJSON();

  expect(tree).toMatchSnapshot();
});
