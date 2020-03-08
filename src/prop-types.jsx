import PropTypes from "prop-types";

const reviewShape = PropTypes.shape({
  date: PropTypes.string.isRequired,
  reviewID: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
});

const offerShape = PropTypes.shape({
  bedroomsCount: PropTypes.number.isRequired,
  city: PropTypes.string.isRequired,
  coordinates: PropTypes.arrayOf(PropTypes.number).isRequired,
  description: PropTypes.string.isRequired,
  host: PropTypes.shape({
    name: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
    super: PropTypes.bool.isRequired,
  }),
  id: PropTypes.number.isRequired,
  maxGuests: PropTypes.number.isRequired,
  options: PropTypes.arrayOf(PropTypes.string),
  premium: PropTypes.bool.isRequired,
  price: PropTypes.number.isRequired,
  rating: PropTypes.number.isRequired,
  reviews: PropTypes.arrayOf(reviewShape).isRequired,
  src: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
});

export {offerShape, reviewShape};
