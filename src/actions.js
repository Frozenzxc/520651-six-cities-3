const ActionType = {
  SELECT_CARD: `SELECT_CARD`,
  SELECT_CITY: `SELECT_CITY`,
  SELECT_OFFER: `SELECT_OFFER`,
  SORT_TYPE_CHANGE: `SORT_TYPE_CHANGE`,
};

const ActionCreator = {

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

  sortTypeChange: (offers) => ({
    type: ActionType.SORT_TYPE_CHANGE,
    payload: offers,
  })
};

export {ActionType, ActionCreator};
