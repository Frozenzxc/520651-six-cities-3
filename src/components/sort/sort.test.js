import React from 'react';
import renderer from 'react-test-renderer';
import Sort from "./sort.jsx";
import {SortType} from "../../const";

it(`Sort component is rendered correctly`, () => {


  const tree = renderer.create(
      <Sort
        activeSortType={SortType.POPULAR}
        isOpened={false}
        onSortTypeClick={() => {}}
        onSortTypeChange={() => {}}/>
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
