import React, { useContext, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { func, number, string, objectOf, oneOfType, object } from 'prop-types';
import ArrowIcon from '../../images/ArrowIcon.svg';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import myContext from '../../context/myContext';

function ExploreDrinks() {
  const { randomDrink, getRandomDrink } = useContext(myContext);
  const history = useHistory();
  const goToPreviousPath = () => {
    history.goBack();
  };

  useEffect(() => {
    getRandomDrink();
  }, []);
  const handleClick = () => {
    history.push(`/bebidas/${randomDrink[0].idDrink}`);
  };

  return (
    <div className="explore-wrapper">
      <Header brand="Explore Drinks" className="img-search" />
      <div className="div-explore">
        <Link to="/explorar/bebidas/ingredientes">
          <button
            data-testid="explore-by-ingredient"
            type="button"
          >
            By Ingredient
          </button>
        </Link>
        <button
          data-testid="explore-surprise"
          type="button"
          onClick={ handleClick }
        >
          Surprise Me!
        </button>
      </div>
      <button className="explore1" type="button" onClick={ goToPreviousPath }>
        <img className="explore" src={ ArrowIcon } alt="voltar" />
      </button>
      <Footer />
    </div>
  );
}

ExploreDrinks.propTypes = {
  history: objectOf(oneOfType([func, string, number, object])),
}.isRequired;

export default ExploreDrinks;
