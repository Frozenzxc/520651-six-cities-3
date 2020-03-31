const OfferType = {
  ALL: `cities`,
  FAVORITES: `favorites`,
  NEARBY: `near`,
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
  PROPERTY: `/offer/:id`,
  ROOT: `/`,
};

export {MAX_NEARBY_OFFERS, AuthorizationStatus, AppRoute, ReviewPostingStatus, OfferType};
