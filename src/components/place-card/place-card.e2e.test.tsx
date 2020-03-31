import * as React from "react";
import {configure, mount} from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import PlaceCard from "./place-card";
import {offers} from "../../test-mocks/test-offers";
import {BrowserRouter} from "react-router-dom";
import {OfferType} from "../../const";

configure({adapter: new Adapter()});
const offer = offers[0];

it(`should click over the PlaceCard appears in the handler`, function () {

  const handleMouseEnter = jest.fn();
  const handleCardTitleClick = jest.fn();
  const handleFavoriteClick = jest.fn();

  const placeCard = mount(
      <BrowserRouter>
        <PlaceCard
          isFavorite={true}
          onCardHover={handleMouseEnter}
          onFavoriteClick={handleFavoriteClick}
          onTitleClick={handleCardTitleClick}
          offer={offer}
          offersView={OfferType.ALL}
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
