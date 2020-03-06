import React, {PureComponent} from "react";
import {offerShape} from "../../prop-types.jsx";
import PropTypes from "prop-types";

class Map extends PureComponent {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const {activeOffer, offers, leaflet} = this.props;
    const city = [52.38333, 4.9];
    const icon = leaflet.icon({
      iconUrl: `img/pin.svg`,
      iconSize: [30, 40],
    });
    const activeIcon = leaflet.icon({
      iconUrl: `img/pin-active.svg`,
      iconSize: [30, 40],
    });
    const zoom = 12;
    const map = leaflet.map(`map`, {
      center: city,
      zoom,
      zoomControl: false,
      marker: true,
      maxZoom: zoom,
      minZoom: zoom,
    });
    map.setView(city, zoom);
    leaflet
            .tileLayer(`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`, {
              attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`
            })
            .addTo(map);

    if (activeOffer) {
      leaflet
            .marker(activeOffer.coordinates, {icon: activeIcon})
            .addTo(map);
    }

    offers.forEach((offer) => {
      leaflet
            .marker(offer.coordinates, {icon})
            .addTo(map);
    });
  }

  render() {
    return (
      <div id="map" style={{height: `100%`}}/>
    );
  }
}

Map.propTypes = {
  activeOffer: offerShape,
  offers: PropTypes.arrayOf(offerShape),
  leaflet: PropTypes.object,
};

export default Map;
