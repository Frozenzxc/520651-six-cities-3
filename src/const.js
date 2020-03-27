const OfferType = {
  ALL: `cities`,
  FAVORITES: `favorites`,
  NEARBY: `near`,
};

const SortType = {
  POPULAR: `Popular`,
  PRICE_TO_HIGH: `Price: low to high`,
  PRICE_TO_LOW: `Price: high to low`,
  RATING: `Top rated first`,
};

const MAX_NEARBY_OFFERS = 3;

const AuthorizationStatus = {
  AUTH: `AUTH`,
  NO_AUTH: `NO_AUTH`,
};

const ReviewPostingStatus = {
  POSTED: `POSTED`,
  ERROR: `ERROR`,
};

const AppRoute = {
  FAVORITES: `/favorites`,
  LOGIN: `/login`,
  PROPERTY: `/offer/`,
  ROOT: `/`,
};

export {OfferType, SortType, MAX_NEARBY_OFFERS, AuthorizationStatus, AppRoute, ReviewPostingStatus};
