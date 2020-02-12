import React from "react";
import renderer from "react-test-renderer";
import Main from "./main";

const OFFERS_COUNT = 55;
const offerTitles = [`Good`, `Bad`, `Ugly`];
const cardTitleClickHandler = () => {};

it(`Should Main component render correctly`, () => {
  const tree = renderer
        .create(<Main
          offerTitles={offerTitles}
          offersCount={OFFERS_COUNT}
          onCardTitleClick={cardTitleClickHandler}
        />)
        .toJSON();

  expect(tree).toMatchSnapshot();
});
