import React from "react";
import renderer from "react-test-renderer";
import Main from "./main";
import offers from "../../test-mocks/test-offers";

const OFFERS_COUNT = 55;

const cardTitleClickHandler = () => {};

it(`Should Main component render correctly`, () => {
  const tree = renderer
        .create(<Main
          offers={offers}
          offersCount={OFFERS_COUNT}
          onCardTitleClick={cardTitleClickHandler}
        />)
        .toJSON();

  expect(tree).toMatchSnapshot();
});
