import {getRandomArrayItem, getRandomIntegerNumber} from "../common";

const MAX_BEDROOMS = 6;
const MIN_BEDROOMS = 1;
const MAX_GUESTS = 10;
const MAX_PHOTOS = 6;
const MAX_RATING = 5;
const MIN_RATING = 1;

const CardTypes = [`apartment`, `room`, `house`, `hotel`];
const Options = [`Wifi`, `Washing machine`, `Towels`, `Heating`, `Coffee machine`, `Baby seat`, `Kitchen`, `Dishwasher`, `Cabel TV`, `Fridge`];
const Photos = [
  `img/apartment-01.jpg`,
  `img/apartment-02.jpg`,
  `img/apartment-03.jpg`,
  `img/apartment-01.jpg`,
  `img/apartment-02.jpg`,
  `img/apartment-03.jpg`,
];

const generatePhotos = (photos) => {
  return photos
        .filter(() => Math.random() > 0.5)
        .slice(0, getRandomIntegerNumber(1, MAX_PHOTOS));
};

const generateOptions = (options) => {
  return options
        .filter(() => Math.random() > 0.5)
        .slice(0, getRandomIntegerNumber(0, Options.length));
};

export default [
  {
    bedroomsCount: 4,
    coordinates: [52.3909553943508, 4.85309666406198],
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra.`,
    host: {
      name: `John`,
      avatar: `img/avatar-max.jpg`,
      super: false,
    },
    id: 1,
    maxGuests: 6,
    options: [`Wifi`, `Washing machine`, `Towels`, `Heating`, `Kitchen`, `Dishwasher`, `Cabel TV`, `Fridge`],
    premium: false,
    price: 200,
    rating: 3,
    src: [`img/apartment-01.jpg`, `img/apartment-02.jpg`, `img/apartment-03.jpg`],
    title: `Beautiful & luxurious apartment at great location`,
    type: `house`,
  },
  {
    bedroomsCount: 2,
    coordinates: [52.369553943508, 4.85309666406198],
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra.`,
    host: {
      name: `Max`,
      avatar: `img/avatar-angelina.jpg`,
      super: false,
    },
    id: 2,
    maxGuests: 4,
    options: [`Wifi`, `Towels`, `Heating`, `Cabel TV`, `Fridge`],
    premium: true,
    price: 300,
    rating: 1,
    src: [`img/apartment-02.jpg`, `img/apartment-03.jpg`],
    title: `Wood and stone place`,
    type: `hotel`,
  },
  {
    bedroomsCount: 1,
    coordinates: [52.3909553943508, 4.929309666406198],
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra.`,
    host: {
      name: `Bob`,
      avatar: `img/avatar-max.jpg`,
      super: true,
    },
    id: 3,
    maxGuests: 2,
    options: [`Wifi`, `Towels`, `Cabel TV`],
    premium: false,
    price: 450,
    rating: 3,
    src: [`img/apartment-03.jpg`, `img/apartment-01.jpg`, `img/apartment-02.jpg`, `img/apartment-03.jpg`],
    title: `Canal View Prinsengracht`,
    type: `room`,
  },
  {
    bedroomsCount: 2,
    coordinates: [52.3809553943508, 4.939309666406198],
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra.`,
    host: {
      name: `Angelina`,
      avatar: `img/avatar-angelina.jpg`,
      super: false,
    },
    id: 4,
    maxGuests: 5,
    options: [`Wifi`, `Towels`, `Heating`, `Coffee machine`, `Baby seat`, `Cabel TV`],
    premium: false,
    price: 150,
    rating: 5,
    src: [`img/apartment-03.jpg`, `img/apartment-01.jpg`, `img/apartment-02.jpg`, `img/apartment-03.jpg`, `img/apartment-01.jpg`, `img/apartment-02.jpg`],
    title: `Nice, cozy, warm big bed apartment`,
    type: `apartment`,
  },
];
