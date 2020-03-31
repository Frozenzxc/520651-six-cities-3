import * as React from "react";
import * as renderer from "react-test-renderer";
import Sort from "./sort";
import {noop} from "../../utils";

it(`Sort component is rendered correctly`, () => {


  const tree = renderer.create(
      <Sort
        activeSortType={`Popular`}
        isOpened={false}
        onSortTypeClick={noop}
        onSortTypeChange={noop}/>
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
