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
    bedroomsCount: getRandomIntegerNumber(MIN_BEDROOMS, MAX_BEDROOMS),
    coordinates: [52.3909553943508, 4.85309666406198],
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra.`,
    host: {
      name: `John`,
      avatar: `img/avatar-max.jpg`,
      super: false,
    },
    id: 1,
    maxGuests: getRandomIntegerNumber(1, MAX_GUESTS),
    options: generateOptions(Options),
    premium: false,
    price: 200,
    rating: getRandomIntegerNumber(MIN_RATING, MAX_RATING),
    src: generatePhotos(Photos),
    title: `Beautiful & luxurious apartment at great location`,
    type: getRandomArrayItem(CardTypes),
  },
  {
    bedroomsCount: getRandomIntegerNumber(MIN_BEDROOMS, MAX_BEDROOMS),
    coordinates: [52.369553943508, 4.85309666406198],
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra.`,
    host: {
      name: `Max`,
      avatar: `img/avatar-angelina.jpg`,
      super: false,
    },
    id: 2,
    maxGuests: getRandomIntegerNumber(1, MAX_GUESTS),
    options: generateOptions(Options),
    premium: true,
    price: 300,
    rating: getRandomIntegerNumber(MIN_RATING, MAX_RATING),
    src: generatePhotos(Photos),
    title: `Wood and stone place`,
    type: getRandomArrayItem(CardTypes),
  },
  {
    bedroomsCount: getRandomIntegerNumber(MIN_BEDROOMS, MAX_BEDROOMS),
    coordinates: [52.3909553943508, 4.929309666406198],
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra.`,
    host: {
      name: `Bob`,
      avatar: `img/avatar-max.jpg`,
      super: true,
    },
    id: 3,
    maxGuests: getRandomIntegerNumber(1, MAX_GUESTS),
    options: generateOptions(Options),
    premium: false,
    price: 450,
    rating: getRandomIntegerNumber(MIN_RATING, MAX_RATING),
    src: generatePhotos(Photos),
    title: `Canal View Prinsengracht`,
    type: getRandomArrayItem(CardTypes),
  },
  {
    bedroomsCount: getRandomIntegerNumber(MIN_BEDROOMS, MAX_BEDROOMS),
    coordinates: [52.3809553943508, 4.939309666406198],
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra.`,
    host: {
      name: `Angelina`,
      avatar: `img/avatar-angelina.jpg`,
      super: false,
    },
    id: 4,
    maxGuests: getRandomIntegerNumber(1, MAX_GUESTS),
    options: generateOptions(Options),
    premium: false,
    price: 150,
    rating: getRandomIntegerNumber(MIN_RATING, MAX_RATING),
    src: generatePhotos(Photos),
    title: `Nice, cozy, warm big bed apartment`,
    type: getRandomArrayItem(CardTypes),
  },
];
