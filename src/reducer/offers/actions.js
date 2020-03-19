const ActionType = {
  LOAD_NEARBY_OFFERS: `LOAD_NEARBY_OFFERS`,
  LOAD_OFFERS: `LOAD_OFFERS`,
  LOAD_REVIEWS: `LOAD_REVIEWS`,
  SELECT_CARD: `SELECT_CARD`,
  SELECT_CITY: `SELECT_CITY`,
  SELECT_OFFER: `SELECT_OFFER`,
};

const ActionCreator = {

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

  selectCard: (offer) => ({
    type: ActionType.SELECT_CARD,
    payload: offer.id,
  }),

  selectCity: (city) => ({
    type: ActionType.SELECT_CITY,
    payload: city,
  }),

  selectOffer: (offer) => ({
    type: ActionType.SELECT_OFFER,
    payload: offer,
  }),
};

export {ActionType, ActionCreator};
