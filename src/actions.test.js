import {ActionType, ActionCreator} from "./actions";
import offers from "./test-mocks/test-offers";

describe(`Action creators work correctly`, () => {
  it(`Action creator for incrementing step returns correct action`, () => {
    expect(ActionCreator.incrementStep()).toEqual({
      type: ActionType.INCREMENT_STEP,
      payload: 1,
    });
  });

  it(`Action creator for selecting city returns city name`, () => {
    expect(ActionCreator.selectCity(`Amsterdam`)).toEqual({
      type: ActionType.SELECT_CITY,
      payload: `Amsterdam`,
    });
  });

  it(`Action creator for selecting offer returns offer`, () => {
    expect(ActionCreator.selectOffer(offers[0])).toEqual({
      type: ActionType.SELECT_OFFER,
      payload: {
        bedroomsCount: 4,
        city: `Amsterdam`,
        coordinates: [52.3909553943508, 4.85309666406198],
        description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra.`,
        host: {
          avatar: `img/avatar-max.jpg`,
          name: `John`,
          super: false,
        },
        id: 1,
        maxGuests: 6,
        options: [`Wifi`, `Washing machine`, `Towels`, `Heating`, `Kitchen`, `Dishwasher`, `Cabel TV`, `Fridge`],
        premium: false,
        price: 200,
        rating: 3,
        reviews: [
          {
            date: `2020-02-22T00:00:00.000Z`,
            reviewID: 140,
            name: `Max`,
            rating: 1,
            src: `img/avatar-max.jpg`,
            text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra.`,
          },
          {
            date: `2020-02-24T00:00:00.000Z`,
            reviewID: 151,
            name: `John`,
            rating: 4,
            src: `img/avatar-max.jpg`,
            text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra.`,
          },
          {
            date: `2020-02-26T00:00:00.000Z`,
            reviewID: 160,
            name: `Victoria`,
            rating: 3,
            src: `img/avatar-max.jpg`,
            text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra.`,
          },
          {
            date: `2020-03-02T00:00:00.000Z`,
            reviewID: 145,
            name: `Bob`,
            rating: 5,
            src: `img/avatar-max.jpg`,
            text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra.`,
          },
        ],
        src: [`img/apartment-01.jpg`, `img/apartment-02.jpg`, `img/apartment-03.jpg`],
        title: `Beautiful & luxurious apartment at great location`,
        type: `house`,
      },
    });
  });
});
