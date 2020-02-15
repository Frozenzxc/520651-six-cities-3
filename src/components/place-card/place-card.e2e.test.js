import React from "react";
import {configure, shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import PlaceCard from "./place-card";

configure({adapter: new Adapter()});

const offer = {
  id: 1,
  title: `Beautiful & luxurious apartment at great location`,
  price: 200,
};

it(`should hover over the PlaceCard, information about the property appears in the handler`, function () {
  const handleMouseEnter = jest.fn();
  const handleCardTitleClick = jest.fn();

  const placeCard = shallow(<PlaceCard
    onMouseEnter={handleMouseEnter}
    onCardTitleClick={handleCardTitleClick}
    offer={offer}
  />);

  const title = placeCard.find(`h2.place-card__name`);

  placeCard.simulate(`mouseEnter`);

  expect(handleMouseEnter).toHaveBeenCalledTimes(1);

  expect(handleMouseEnter.mock.calls[0][0]).toMatchObject(offer);

  title.simulate(`click`);

  expect(handleCardTitleClick.mock.calls.length).toBe(1);
});
