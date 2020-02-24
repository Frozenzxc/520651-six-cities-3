const getRandomArrayItem = (array) => {
  const randomIndex = getRandomIntegerNumber(0, array.length);

  return array[randomIndex];
};

const getRandomIntegerNumber = (min, max) => {
  return min + Math.floor(max * Math.random());
};

const getCardRating = (rating) => {
  return (`${rating * 20}%`);
};

export {getRandomArrayItem, getRandomIntegerNumber, getCardRating};
