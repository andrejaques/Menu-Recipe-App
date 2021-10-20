import React from 'react';
import { func, string, bool } from 'prop-types';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import useLocalStorage from '../helpers/useLocalStorage';
import '../styles/Details.css';

const FavoriteButton = (props) => {
  const [favoriteStorage, setFavoriteStorage] = useLocalStorage('favoriteRecipes', []);
  const { recipe, favoriteRecipe, setFavoriteRecipe } = props;
  const {
    id,
    type,
    area = '',
    category = '',
    alcoholicOrNot = '',
    name,
    image,
  } = recipe;

  const handleClick = () => {
    const verifyFavorite = favoriteStorage.some((item) => item.id === id);
    setFavoriteRecipe(verifyFavorite);
    if (!favoriteRecipe) {
      const defaultRecipe = {
        id,
        type,
        area,
        category,
        alcoholicOrNot,
        name,
        image,
      };
      setFavoriteRecipe(true);
      setFavoriteStorage([...favoriteStorage, defaultRecipe]);
    } else {
      const removeFavorite = favoriteStorage.filter((item) => item.id !== id);
      setFavoriteStorage([...removeFavorite]);
      setFavoriteRecipe(false);
    }
  };
  return (
    <button
      className="favorite-btn"
      type="button"
      onClick={ () => handleClick() }
    >
      <img
        data-testid="favorite-btn"
        src={ favoriteRecipe ? blackHeartIcon : whiteHeartIcon }
        alt="icone favorito"
        className="heart-img"
      />
    </button>
  );
};

FavoriteButton.propTypes = {
  id: string,
  type: string,
  category: string,
  alcoholicOrNot: string,
  name: bool,
  image: string,
  area: string,
  favoriteRecipe: bool,
  setFavoriteRecipe: func,
}.isRequired;

export default FavoriteButton;
