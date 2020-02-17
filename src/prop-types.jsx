import PropTypes from "prop-types";

const offerShape = PropTypes.shape({
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  src: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  premium: PropTypes.bool.isRequired,
  type: PropTypes.string.isRequired,
  raiting: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
  bedroomsCount: PropTypes.number.isRequired,
  maxGuests: PropTypes.number.isRequired,
  options: PropTypes.arrayOf(PropTypes.string),
  host: PropTypes.shape({
    name: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
    super: PropTypes.bool.isRequired,
  })
}).isRequired;

export {offerShape};
