const ActionType = {
  ADD_TO_FAVORITE: `ADD_TO_FAVORITE`,
  BLOCK_FORM: `BLOCK_FORM`,
  LOAD_FAVORITE_OFFERS: `LOAD_FAVORITE_OFFERS`,
  LOAD_NEARBY_OFFERS: `LOAD_NEARBY_OFFERS`,
  LOAD_OFFERS: `LOAD_OFFERS`,
  LOAD_REVIEWS: `LOAD_REVIEWS`,
  SELECT_CARD: `SELECT_CARD`,
  SELECT_CITY: `SELECT_CITY`,
  SELECT_OFFER: `SELECT_OFFER`,
  SUCCESSFUL_POST_REVIEW: `SUCCESSFUL_POST_REVIEW`,
};

const ActionCreator = {

  addToFavorite: (offer) => {
    return {
      type: ActionType.ADD_TO_FAVORITE,
      payload: offer,
    };
  },

  blockForm: (isBlocked) => {
    return {
      type: ActionType.BLOCK_FORM,
      payload: isBlocked,
    };
  },

  loadFavoriteOffers: (offers) => {
    return {
      type: ActionType.LOAD_FAVORITE_OFFERS,
      payload: offers,
    };
  },

  loadNearbyOffers: (offers) => {
    return {
      type: ActionType.LOAD_NEARBY_OFFERS,
      payload: offers,
    };
  },

  loadOffers: (offers) => {
    return {
      type: ActionType.LOAD_OFFERS,
      payload: offers,
    };
  },

  loadReviews: (reviews) => {
    return {
      type: ActionType.LOAD_REVIEWS,
      payload: reviews,
    };
  },

  selectCity: (city) => ({
    type: ActionType.SELECT_CITY,
    payload: city,
  }),

  selectOffer: (offer) => ({
    type: ActionType.SELECT_OFFER,
    payload: offer,
  }),

  successfulPostReview: (isSuccess) => ({
    type: ActionType.SUCCESSFUL_POST_REVIEW,
    payload: isSuccess,
  })

};

export {ActionType, ActionCreator};
