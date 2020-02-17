import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app/app.jsx";
import offers from "./mocks/offers";

const Settings = {
  OFFERS_COUNT: 86
};

ReactDOM.render(
    <App
      offersCount={Settings.OFFERS_COUNT}
      offers={offers}
    />,
    document.querySelector(`#root`)
);
