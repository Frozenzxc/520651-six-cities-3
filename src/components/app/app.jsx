import React from "react";
import PropTypes from "prop-types";
import Main from "../main/main.jsx";

const cardTitleClickHandler = () => {};

const App = ({offersCount, offerTitles}) => {

  return (
    <Main
      offersCount={offersCount}
      offerTitles={offerTitles}
      onCardTitleClick={cardTitleClickHandler}
    />
  );
};

App.propTypes = {
  offersCount: PropTypes.number.isRequired,
  offerTitles: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default App;
