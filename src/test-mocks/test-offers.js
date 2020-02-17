import {getRandomArrayItem, getRandomIntegerNumber} from "../common";

const MIN_BEDROOMS = 1;
const MAX_BEDROOMS = 6;
const CardTypes = [`apartment`, `room`, `house`, `hotel`];
const MIN_RAITING = 1;
const MAX_RAITING = 5;
const MAX_PHOTOS = 6;
const MAX_GUESTS = 10;

const generatePhotos = (desc) => {
  return desc
        .filter(() => Math.random() > 0.5)
        .slice(0, getRandomIntegerNumber(1, MAX_PHOTOS));
};

const generateOptions = (options) => {
  return options
        .filter(() => Math.random() > 0.5)
        .slice(0, getRandomIntegerNumber(0, Options.length));
};

const Options = [`Wifi`, `Washing machine`, `Towels`, `Heating`, `Coffee machine`, `Baby seat`, `Kitchen`, `Dishwasher`, `Cabel TV`, `Fridge`];

const Photos = [
  `img/apartment-01.jpg`,
  `img/apartment-02.jpg`,
  `img/apartment-03.jpg`,
  `img/apartment-01.jpg`,
  `img/apartment-02.jpg`,
  `img/apartment-03.jpg`,
];

export default [
  {
    id: 1,
    title: `Beautiful & luxurious apartment at great location`,
    price: 200,
    src: generatePhotos(Photos),
    premium: false,
    type: getRandomArrayItem(CardTypes),
    raiting: getRandomIntegerNumber(MIN_RAITING, MAX_RAITING),
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra.`,
    bedroomsCount: getRandomIntegerNumber(MIN_BEDROOMS, MAX_BEDROOMS),
    maxGuests: getRandomIntegerNumber(1, MAX_GUESTS),
    options: generateOptions(Options),
    host: {
      name: `John`,
      avatar: `img/avatar-max.jpg`,
      super: false,
    },
  },
  {
    id: 2,
    title: `Wood and stone place`,
    price: 300,
    src: generatePhotos(Photos),
    premium: true,
    type: getRandomArrayItem(CardTypes),
    raiting: getRandomIntegerNumber(MIN_RAITING, MAX_RAITING),
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra.`,
    bedroomsCount: getRandomIntegerNumber(MIN_BEDROOMS, MAX_BEDROOMS),
    maxGuests: getRandomIntegerNumber(1, MAX_GUESTS),
    options: generateOptions(Options),
    host: {
      name: `Max`,
      avatar: `img/avatar-angelina.jpg`,
      super: false,
    },
  },
  {
    id: 3,
    title: `Canal View Prinsengracht`,
    price: 450,
    src: generatePhotos(Photos),
    premium: false,
    type: getRandomArrayItem(CardTypes),
    raiting: getRandomIntegerNumber(MIN_RAITING, MAX_RAITING),
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra.`,
    bedroomsCount: getRandomIntegerNumber(MIN_BEDROOMS, MAX_BEDROOMS),
    maxGuests: getRandomIntegerNumber(1, MAX_GUESTS),
    options: generateOptions(Options),
    host: {
      name: `Bob`,
      avatar: `img/avatar-max.jpg`,
      super: true,
    },
  },
  {
    id: 4,
    title: `Nice, cozy, warm big bed apartment`,
    price: 150,
    src: generatePhotos(Photos),
    premium: false,
    type: getRandomArrayItem(CardTypes),
    raiting: getRandomIntegerNumber(MIN_RAITING, MAX_RAITING),
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra.`,
    bedroomsCount: getRandomIntegerNumber(MIN_BEDROOMS, MAX_BEDROOMS),
    maxGuests: getRandomIntegerNumber(1, MAX_GUESTS),
    options: generateOptions(Options),
    host: {
      name: `Angelina`,
      avatar: `img/avatar-angelina.jpg`,
      super: false,
    },
  },
];
