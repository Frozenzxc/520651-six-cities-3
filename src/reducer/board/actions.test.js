import {ActionType, ActionCreator} from "./actions";
import offers from "../../test-mocks/test-offers";

describe(`Action creators work correctly`, () => {
  it(`Action creator for selecting card returns correct action`, () => {
    expect(ActionCreator.selectCard(offers[0])).toEqual({
      type: ActionType.SELECT_CARD,
      payload: offers[0].id,
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
        bedrooms: 3,
        city: {
          name: `Cologne`,
          location: {
            latitude: 50.938361,
            longitude: 6.959974,
            zoom: 13
          }
        },
        description: `Design interior in most sympathetic area! Complitely renovated, well-equipped, cosy studio in idyllic, over 100 years old wooden house. Calm street, fast connection to center and airport.`,
        goods: [
          `Coffee machine`,
          `Laptop friendly workspace`,
          `Fridge`,
          `Breakfast`,
          `Air conditioning`,
          `Towels`,
          `Washer`,
          `Dishwasher`,
          `Baby seat`
        ],
        host: {
          id: 25,
          name: `Angelina`,
          avatar: `img/avatar-angelina.jpg`,
          isPro: true
        },
        id: 1,
        images: [
          `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/14.jpg`,
          `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/20.jpg`,
          `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/9.jpg`,
          `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/12.jpg`,
          `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/18.jpg`,
          `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/10.jpg`,
          `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/16.jpg`,
          `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/8.jpg`,
          `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/3.jpg`,
          `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/6.jpg`,
          `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/17.jpg`,
          `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/1.jpg`,
          `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/19.jpg`,
          `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/5.jpg`
        ],
        isFavorite: false,
        isPremium: false,
        location: {
          latitude: 50.932361,
          longitude: 6.937974,
          zoom: 16
        },
        maxAdults: 7,
        previewImage: `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/19.jpg`,
        price: 160,
        rating: 4.8,
        title: `The house among olive `,
        type: `apartment`
      },
    });
  });
});
