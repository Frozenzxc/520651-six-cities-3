import React, {PureComponent} from "react";
import {offerShape} from "../../prop-types.jsx";
import PropTypes from "prop-types";

class Map extends PureComponent {
  constructor(props) {
    super(props);

    this.city = [this.props.offers[0].city.location.latitude, this.props.offers[0].city.location.longitude];
    this.zoom = this.props.offers[0].city.location.zoom;
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
              .marker([activeOffer.location.latitude, activeOffer.location.longitude], {icon: this.activeIcon})
              .addTo(this.map));
    }

    offers.forEach((offer) => {
      this.markers.push(this.leaflet
              .marker([offer.location.latitude, offer.location.longitude], {icon: this.standartIcon})
              .addTo(this.map));
    });
  }

  componentDidMount() {
    const {activeOffer, offers} = this.props;

    this.map = this.leaflet.map(`map`, {
      center: this.city,
      zoom: this.zoom,
      zoomControl: false,
      marker: true,
      maxZoom: this.zoom,
      minZoom: this.zoom,
    });
    this.map.setView(this.city, this.zoom);
    this.leaflet
            .tileLayer(`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`, {
              attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`
            })
            .addTo(this.map);

    this.addMarkers(activeOffer, offers);
  }

  componentDidUpdate(prevProps) {
    const {activeOffer, offers} = this.props;
    this.markers.map((marker) => marker.remove());
    this.addMarkers(activeOffer, offers);
    this.city = [this.props.offers[0].city.location.latitude, this.props.offers[0].city.location.longitude];
    this.zoom = this.props.offers[0].city.location.zoom;
    this.map.setView(this.city, this.zoom);

    if (prevProps.activeOffer !== this.props.activeOffer) {
      if (prevProps.activeOffer !== null) {
        this.leaflet
                .marker([prevProps.activeOffer.location.latitude, prevProps.activeOffer.location.longitude], {icon: this.standartIcon})
                .addTo(this.map);
      }
      this.leaflet
            .marker([this.props.activeOffer.location.latitude, this.props.activeOffer.location.longitude], {icon: this.activeIcon})
            .addTo(this.map);
    }

  }

  render() {
    return (
      <div id="map" style={{height: `100%`}}/>
    );
  }
}

Map.propTypes = {
  activeOffer: PropTypes.oneOfType([
    PropTypes.oneOf([null]),
    offerShape,
  ]),
  offers: PropTypes.arrayOf(offerShape),
  leaflet: PropTypes.object,
};

export default Map;
