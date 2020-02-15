import React from "react";
import renderer from "react-test-renderer";
import Main from "./main";

const OFFERS_COUNT = 55;
const offers = [
  {
    id: 1,
    title: `Beautiful & luxurious apartment at great location`,
    price: 200,
  },
  {
    id: 2,
    title: `Wood and stone place`,
    price: 300,
  },
  {
    id: 3,
    title: `Canal View Prinsengracht`,
    price: 450,
  },
  {
    id: 4,
    title: `Nice, cozy, warm big bed apartment`,
    price: 150,
  },
];
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
