import React from "react";
import PropTypes from "prop-types";
import Main from "../main/main.jsx";
import Offers from "../../mocks/offers";

const App = ({offersCount}) => {

  const handleCardTitleClick = () => {};

  return (
    <Main
      offersCount={offersCount}
      offers={Offers}
      onCardTitleClick={handleCardTitleClick}
    />
  );
};

App.propTypes = {
  offersCount: PropTypes.number.isRequired,
  offers: PropTypes.array.isRequired
};

export default App;
