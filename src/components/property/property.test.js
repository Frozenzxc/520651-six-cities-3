import React from 'react';
import renderer from 'react-test-renderer';
import Property from "./property";
import offers from "../../test-mocks/test-offers";

const offer = offers[0];

it(`Property is rendered correctly`, () => {
  const tree = renderer.create(
      <Property
        offer={offer}/>
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
