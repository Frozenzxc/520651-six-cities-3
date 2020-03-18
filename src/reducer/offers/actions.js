const ActionType = {
  LOAD_OFFERS: `LOAD_OFFERS`,
  SELECT_CARD: `SELECT_CARD`,
  SELECT_CITY: `SELECT_CITY`,
  SELECT_OFFER: `SELECT_OFFER`,
};

const ActionCreator = {

  loadOffers: (offers) => {
    return {
      type: ActionType.LOAD_OFFERS,
      payload: offers,
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
