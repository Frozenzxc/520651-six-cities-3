import React from "react";
import {configure, mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import PlaceCard from "./place-card";
import offers from "../../test-mocks/test-offers";
import {AuthorizationStatus} from "../../const";
import {BrowserRouter} from "react-router-dom";

configure({adapter: new Adapter()});
const offer = offers[0];

it(`should hover over the PlaceCard, information about the property appears in the handler`, function () {

  const handleMouseEnter = jest.fn();
  const handleCardTitleClick = jest.fn();

  const placeCard = mount(
      <BrowserRouter>
        <PlaceCard
          addToFavorite={() => {}}
          authorizationStatus={AuthorizationStatus.AUTH}
          onMouseEnter={handleMouseEnter}
          onClick={handleCardTitleClick}
          offer={offer}
        />
      </BrowserRouter>
  );

  const title = placeCard.find(`h2.place-card__name`);

  placeCard.simulate(`mouseEnter`);

  expect(handleMouseEnter).toHaveBeenCalledTimes(1);

  expect(handleMouseEnter.mock.calls[0][0]).toMatchObject(offer);

  title.simulate(`click`);

  expect(handleCardTitleClick.mock.calls.length).toBe(1);
});
