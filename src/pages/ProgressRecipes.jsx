import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import rockGlass from '../images/rockGlass.svg';
import ArrowIcon from '../images/ArrowIcon.svg';
import IngredientsCheckList from '../components/IngredientsCheckList';
import FinishRecipeButton from '../components/FinishRecipeButton';
import ShareButton from '../components/ShareButton';
import FavoriteButton from '../components/FavoriteButton';
import '../styles/Details.css';

function ProgressRecipes(props) {
  const [recipe, setRecipe] = useState();
  const [enType, setEnType] = useState('drinks');
  const [enCasedType, setEnCasedType] = useState('Drink');
  const [favoriteType, setFavoriteType] = useState('bebida');
  const [favoriteRecipe, setFavoriteRecipe] = useState(false);
  const localhost = 'http://localhost:3000/';
  const { match } = props;
  const { type, id } = match.params;
  const history = useHistory();
  const goToPreviousPath = () => {
    history.goBack();
  };

  useEffect(() => {
    const getRecipe = async () => {
      let endpoint = '';
      if (type === 'comidas') {
        endpoint = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
        setEnType('meals');
        setEnCasedType('Meal');
        setFavoriteType('comida');
      } else {
        endpoint = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
      }
      await fetch(endpoint)
        .then((data) => data.json())
        .then((response) => {
          setRecipe(response);
        });
    };
    getRecipe();
  }, [id, type]);

  useEffect(() => {
    const parseLocalStorage = JSON
      .parse(localStorage
        .getItem('favoriteRecipes')) || [];
    const verifyFavorite = parseLocalStorage.some((item) => item.id === id);
    setFavoriteRecipe(verifyFavorite);
  }, [id, favoriteRecipe]);

  return (
    <div className="details-wrapper">
      {
        recipe
          ? (
            <div>
              <button className="voltar1" type="button" onClick={ goToPreviousPath }>
                <img className="voltar" src={ ArrowIcon } alt="voltar" />
              </button>
              <img
                src={ recipe[enType][0][`str${enCasedType}Thumb`] }
                alt="Foto do Prato"
                data-testid="recipe-photo"
                style={ { width: '100%' } }
              />
              <h1
                data-testid="recipe-title"
                className="recipe-name-detail"
              >
                { recipe[enType][0][`str${enCasedType}`] }
              </h1>
              <div className="title-and-details">
                <ShareButton pathname={ `${localhost}${favoriteType}s/${id}` } />
                <FavoriteButton
                  recipe={
                    { id,
                      type: favoriteType,
                      area: recipe[enType][0].strArea || '',
                      category: recipe[enType][0].strCategory,
                      alcoholicOrNot: recipe[enType][0].strAlcoholic || '',
                      name: recipe[enType][0][`str${enCasedType}`],
                      image: recipe[enType][0][`str${enCasedType}Thumb`] }
                  }
                  favoriteRecipe={ favoriteRecipe }
                  setFavoriteRecipe={ setFavoriteRecipe }
                />
              </div>
              <h2 data-testid="recipe-category" className="dish-details-category">
                { type === 'comidas'
                  ? recipe[enType][0].strCategory
                  : recipe[enType][0].strAlcoholic }
              </h2>
              <section className="ingredients-checklist">
                <IngredientsCheckList
                  id={ id }
                  recipe={ recipe }
                  enType={ enType }
                />
              </section>
              <p
                data-testid="instructions"
                className="instructions"
              >
                { recipe[enType][0].strInstructions }
              </p>

              <FinishRecipeButton
                id={ id }
                type={ type }
                enType={ enType }
              />
            </div>
          )
          : (
            <object
              className="rocksGlass"
              type="image/svg+xml"
              data={ rockGlass }
            >
              Glass
            </object>
          )
      }
    </div>
  );
}

ProgressRecipes.defaultProps = {
  match: undefined,
};

ProgressRecipes.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      type: PropTypes.string,
      id: PropTypes.string,
    }),
  }),
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default ProgressRecipes;
