import React, {PureComponent} from "react";
import PropTypes from "prop-types";


class PlaceCard extends PureComponent {
  constructor(props) {
    super(props);

    this.handleHover = this.handleHover.bind(this);
  }

  handleHover() {
    const offer = this.props.offer;
    this.props.onMouseEnter(offer);
  }

  render() {
    const {onCardTitleClick, offer} = this.props;
    const {
      id,
      title,
      price,
    } = offer;

    return (
      <article
        className="cities__place-card place-card"
        key={id}
        onMouseEnter={this.handleHover}
      >
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
        <div className="cities__image-wrapper place-card__image-wrapper">
          <a href="#">
            <img className="place-card__image" src="img/apartment-01.jpg" width="260"
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
              <span style={{width: `80%`}} />
              <span className="visually-hidden">Rating</span>
            </div>
          </div>
          <h2
            onClick={onCardTitleClick}
            className="place-card__name">
            <a href="#">{title}</a>
          </h2>
          <p className="place-card__type">Apartment</p>
        </div>
      </article>
    );
  }
}

PlaceCard.propTypes = {
  onCardHover: PropTypes.func,
  onMouseEnter: PropTypes.func,
  onCardTitleClick: PropTypes.func.isRequired,
  offer: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
};

export default PlaceCard;
