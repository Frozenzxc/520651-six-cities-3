import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {offerShape} from "../../prop-types.jsx";

class PlaceCard extends PureComponent {
  constructor(props) {
    super(props);

    this.handleHover = this.handleHover.bind(this);
    this.hanldeTitleClick = this.hanldeTitleClick.bind(this);
  }

  handleHover() {
    const offer = this.props.offer;
    this.props.onMouseEnter(offer);
  }

  hanldeTitleClick() {
    const offer = this.props.offer;
    this.props.onClick(offer);
  }

  render() {
    const {offer} = this.props;
    const {
      title,
      price,
      src,
      type,
      raiting,
      premium,
    } = offer;

    const cardRaiting = raiting * 20 + `%`;

    return (
      <article
        className="cities__place-card place-card"
        onMouseEnter={this.handleHover}
      >
        {premium ? <div className="place-card__mark">
          <span>Premium</span>
        </div> : ``}
        <div className="cities__image-wrapper place-card__image-wrapper">
          <a href="#">
            <img className="place-card__image" src={src[0]} width="260"
              height="200" alt="Place image"/>
          </a>
        </div>
        <div className="place-card__info">
          <div className="place-card__price-wrapper">
            <div className="place-card__price">
              <b className="place-card__price-value">&euro;{price}</b>
              <span className="place-card__price-text">&#47;&nbsp;night</span>
            </div>
            <button className="place-card__bookmark-button button" type="button">
              <svg className="place-card__bookmark-icon" width="18" height="19">
                <use xlinkHref="#icon-bookmark"/>
              </svg>
              <span className="visually-hidden">To bookmarks</span>
            </button>
          </div>
          <div className="place-card__rating rating">
            <div className="place-card__stars rating__stars">
              <span style={{width: cardRaiting}} />
              <span className="visually-hidden">Rating</span>
            </div>
          </div>
          <h2
            onClick={this.hanldeTitleClick}
            className="place-card__name">
            <a href="#">{title}</a>
          </h2>
          <p className="place-card__type">{type}</p>
        </div>
      </article>
    );
  }
}

PlaceCard.propTypes = {
  onClick: PropTypes.func,
  onCardHover: PropTypes.func,
  onMouseEnter: PropTypes.func,
  offer: offerShape,
};

export default PlaceCard;
