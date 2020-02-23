import PropTypes from "prop-types";

const offerShape = PropTypes.shape({
  bedroomsCount: PropTypes.number.isRequired,
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
  src: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
}).isRequired;

export {offerShape};
