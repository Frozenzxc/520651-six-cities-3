import * as React from "react";
import * as renderer from "react-test-renderer";
import PlaceCard from "./place-card";
import {offers} from "../../test-mocks/test-offers";
import {BrowserRouter} from "react-router-dom";
import {OfferType} from "../../const";
import {noop} from "../../utils";

const offer = offers[0];

it(`PlaceCard is rendered correctly`, () => {

  const tree = renderer.create(
      <BrowserRouter>
        <PlaceCard
          isFavorite={true}
          offer={offer}
          onCardHover={noop}
          onFavoriteClick={noop}
          onTitleClick={noop}
          offersView={OfferType.ALL}
        />
      </BrowserRouter>
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
