import React, {PureComponent} from "react";
import {offerShape} from "../../prop-types.jsx";
import PropTypes from "prop-types";

class Map extends PureComponent {
  constructor(props) {
    super(props);

    this.map = {};
    this.leaflet = this.props.leaflet;
    this.activeIcon = this.leaflet.icon({
      iconUrl: `img/pin-active.svg`,
      iconSize: [30, 40],
    });
    this.standartIcon = this.leaflet.icon({
      iconUrl: `img/pin.svg`,
      iconSize: [30, 40],
    });
    this.markers = [];
  }

  addMarkers(activeOffer, offers) {
    if (activeOffer) {
      this.markers.push(this.leaflet
              .marker(activeOffer.coordinates, {icon: this.activeIcon})
              .addTo(this.map));
    }

    offers.forEach((offer) => {
      this.markers.push(this.leaflet
              .marker(offer.coordinates, {icon: this.standartIcon})
              .addTo(this.map));
    });
  }

  componentDidMount() {
    const {activeOffer, offers} = this.props;
    const city = [52.38333, 4.9];
    const zoom = 12;
    this.map = this.leaflet.map(`map`, {
      center: city,
      zoom,
      zoomControl: false,
      marker: true,
      maxZoom: zoom,
      minZoom: zoom,
    });
    this.map.setView(city, zoom);
    this.leaflet
            .tileLayer(`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`, {
              attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`
            })
            .addTo(this.map);

    this.addMarkers(activeOffer, offers);
  }

  componentDidUpdate() {
    const {activeOffer, offers} = this.props;
    this.markers.map((marker) => marker.remove());
    this.addMarkers(activeOffer, offers);
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
