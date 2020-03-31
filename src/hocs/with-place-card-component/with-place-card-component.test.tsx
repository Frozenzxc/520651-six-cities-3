import * as React from "react";
import * as renderer from "react-test-renderer";
import {AuthorizationStatus} from "../../const";
import withPlaceCardComponent from "./with-place-card-component";
import {offers} from "../../test-mocks/test-offers";
import {OfferType} from "../../types";
import {noop} from "../../utils";

const offer = offers[0];

const MockComponent = () => {

  return (
    <div>
    </div>
  );
};

const MockComponentWrapped = withPlaceCardComponent(MockComponent);

it(`withPlaceCardComponent is rendered correctly`, () => {

  const tree = renderer.create((
    <MockComponentWrapped
      addToFavorite={noop}
      authorizationStatus={AuthorizationStatus.NO_AUTH}
      isFavorite={true}
      offer={offer}
      onClick={noop}
      onMouseEnter={noop}
      onCardHover={noop}
      onFavoriteClick={noop}
      onTitleClick={noop}
      offersView={OfferType.ALL}
    >
    </MockComponentWrapped>
  ), {
    createNodeMock() {
      return {};
    }
  }).toJSON();

  expect(tree).toMatchSnapshot();
});
