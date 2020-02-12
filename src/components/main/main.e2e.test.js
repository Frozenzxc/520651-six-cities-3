import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Main from "./main";

const OFFERS_COUNT = 55;
const offerTitles = [`Good`, `Bad`, `Ugly`];

Enzyme.configure({
  adapter: new Adapter(),
});

it(`Should card title be pressed`, () => {
  const cardTitleClickHandler = jest.fn();

  const main = shallow(
      <Main
        offerTitles={offerTitles}
        offersCount={OFFERS_COUNT}
        onCardTitleClick={cardTitleClickHandler}/>
  );

  const titles = main.find(`h2.place-card__name`);

  titles.forEach((title) => {
    title.props().onClick();
  });
  expect(cardTitleClickHandler.mock.calls.length).toBe(3);
});
