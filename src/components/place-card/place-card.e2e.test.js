import React from "react";
import {configure, mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import PlaceCard from "./place-card";
import offers from "../../test-mocks/test-offers";
import {AuthorizationStatus} from "../../const";
import {BrowserRouter} from "react-router-dom";

configure({adapter: new Adapter()});
const offer = offers[0];

it(`should click over the PlaceCard appears in the handler`, function () {

  const handleMouseEnter = jest.fn();
  const handleCardTitleClick = jest.fn();
  const handleFavoriteClick = jest.fn();

  const placeCard = mount(
      <BrowserRouter>
        <PlaceCard
          addToFavorite={() => {}}
          authorizationStatus={AuthorizationStatus.AUTH}
          isFavorite={true}
          onCardHover={handleMouseEnter}
          onFavoriteClick={handleFavoriteClick}
          onTitleClick={handleCardTitleClick}
          offer={offer}
        />
      </BrowserRouter>
  );

  const title = placeCard.find(`h2.place-card__name`);
  const favoriteButton = placeCard.find(`button.place-card__bookmark-button`);

  placeCard.simulate(`mouseEnter`);

  expect(handleMouseEnter).toHaveBeenCalledTimes(1);

  expect(handleMouseEnter.mock.calls.length).toBe(1);

  title.simulate(`click`);

  expect(handleCardTitleClick.mock.calls.length).toBe(1);

  favoriteButton.simulate(`click`);
  expect(handleFavoriteClick.mock.calls.length).toBe(1);
});
