import { string } from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import trybefoodback from '../images/trybefoodback.png';

function ItemCard(props) {
  const { title, thumb, index, to } = props;
  return (
    <div className="div-card" data-testid={ `${index}-recipe-card` }>
      <Link style={ { textDecoration: 'none' } } to={ to }>
        <section className="section-card">
          <span
            className="card-title"
            data-testid={ `${index}-card-name` }
          >
            {title}
          </span>
          <div className="dish-images">
            <img
              className="card-img"
              src={ thumb }
              alt="thumb"
              data-testid={ `${index}-card-img` }
            />
            <img className="dish-bg" src={ trybefoodback } alt="dish background" />
          </div>
        </section>
      </Link>
    </div>
  );
}

export default ItemCard;

ItemCard.propTypes = {
  title: string,
  thumb: string,
  id: string,
  index: string,
}.isRequired;
