import {extend} from "../../utils.js";
import {parseOffer, parseReview} from "../../utils";
import {ActionCreator, ActionType} from "../offers/actions";

const getAvailableOffers = ((allOffers, currentCity) => allOffers.filter((offer) => offer.city.name === currentCity));

const initialState = {
  offers: [],
  availableOffers: [],
  activeID: null,
  activeOffer: null,
  currentCity: `Amsterdam`,
  isFormBlocked: false,
  isLoading: true,
  isPropertyLoading: true,
  nearbyOffers: [],
  reviews: [],
};

const Operation = {
  loadNearbyOffers: (id) => (dispatch, getState, api) => {
    return api.get(`/hotels/${id}/nearby`)
            .then((response) => {
              dispatch(ActionCreator.loadNearbyOffers(response.data));
            });
  },

  loadOffers: () => (dispatch, getState, api) => {
    return api.get(`/hotels`)
            .then((response) => {
              dispatch(ActionCreator.loadOffers(response.data));
            });
  },

  loadReviews: (id) => (dispatch, getState, api) => {
    return api.get(`/comments/${id}`)
            .then((response) => {
              dispatch(ActionCreator.loadReviews(response.data));
            });
  },

  postReview: (id, formData) => (dispatch, getState, api) => {
    return api.post(`/comments/${id}`, {
      comment: formData.comment,
      rating: formData.rating,
    })
          .then((response) => {
            dispatch(ActionCreator.loadReviews(response.data));
            dispatch(ActionCreator.blockForm(false));
          })
        .catch((err) => {
          throw err;
        });
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.BLOCK_FORM:
      return extend(state, {
        isFormBlocked: action.payload,
      });

    case ActionType.LOAD_NEARBY_OFFERS:
      let parsedNearbyOffers = action.payload.map((offer) => parseOffer(offer));
      return extend(state, {
        nearbyOffers: parsedNearbyOffers,
      });

    case ActionType.LOAD_OFFERS:
      let parsedOffers = action.payload.map((offer) => parseOffer(offer));
      return extend(state, {
        currentCity: parsedOffers[0].city.name,
        isLoading: false,
        offers: parsedOffers,
      });

    case ActionType.LOAD_REVIEWS:
      let parsedReviews = action.payload.map((review) => parseReview(review));
      return extend(state, {
        isPropertyLoading: false,
        reviews: parsedReviews,
      });

    case ActionType.SELECT_CARD:
      return extend(state, {
        activeID: action.payload,
      });

    case ActionType.SELECT_CITY:
      return extend(state, {
        currentCity: action.payload,
        availableOffers: getAvailableOffers(state.offers, action.payload),
      });

    case ActionType.SELECT_OFFER:
      return extend(state, {
        activeOffer: action.payload,
      });
  }

  return state;
};

export {reducer, Operation, ActionType, ActionCreator};
