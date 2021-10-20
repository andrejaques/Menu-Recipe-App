import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import myContext from './myContext';

function RecipesProvider({ children }) {
  const [randomFood, setRandomFood] = useState([]);
  const [randomDrink, setRandomDrink] = useState([]);
  const [foodIngredients, setFoodIngredients] = useState([]);
  const [drinkIngredients, setDrinkIngredients] = useState([]);
  const [drinkIngredientSelected, setDrinkIngredientSelected] = useState('');
  const [foodIngredientSelected, setFoodIngredientSelected] = useState('');
  const [display, setDisplay] = useState([]);
  const [displayFood, setDisplayFood] = useState([]);
  const [foodArea, setFoodArea] = useState([]);
  const [categoryClick, setCategoryClick] = useState([]);
  const [foodCategoryClick, setFoodCategoryClick] = useState([]);

  const drinkIngredientClick = async (ingredient) => {
    try {
      const result = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`);
      const data = await result.json();
      return data;
    } catch (err) {
      console.log(err);
    }
  };

  const foodIngredientClick = async (ingredient) => {
    try {
      const result = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
      const data = await result.json();
      return data;
    } catch (err) {
      console.log(err);
    }
  };

  const removeDisplayList = () => {
    setDisplay([]);
    setDisplayFood([]);
  };

  const removeCategoryList = () => {
    setCategoryClick([]);
    setFoodCategoryClick([]);
  };

  const removeRandomList = () => {
    setRandomDrink([]);
    setRandomFood([]);
  };

  const getRandomDrink = async () => {
    try {
      const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php');
      const data = await response.json();
      setRandomDrink(data.drinks);
    } catch (err) {
      console.log(err);
    }
  };

  const getRandomFood = async () => {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
    const data = await response.json();
    setRandomFood(data.meals);
  };

  const providerState = {
    // Foods:
    randomFood,
    foodIngredients,
    foodIngredientClick,
    foodIngredientSelected,
    setFoodIngredientSelected,
    displayFood,
    setDisplayFood,
    getRandomFood,
    foodArea,
    setFoodCategoryClick,
    foodCategoryClick,
    // Drinks:
    randomDrink,
    drinkIngredients,
    drinkIngredientClick,
    drinkIngredientSelected,
    setDrinkIngredientSelected,
    getRandomDrink,
    setCategoryClick,
    categoryClick,
    // Others:
    display,
    setDisplay,
    removeDisplayList,
    removeRandomList,
    removeCategoryList,
  };

  useEffect(() => {
    const getFoodIngredients = async () => {
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list');
      const data = await response.json();
      setFoodIngredients(data.meals);
    };
    const getDrinkIngredients = async () => {
      const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list');
      const data = await response.json();
      setDrinkIngredients(data.drinks);
    };
    const getRecipeOrigin = async () => {
      try {
        const result = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list');
        const data = await result.json();
        setFoodArea(data.meals);
      } catch (err) {
        console.log(err);
      }
    };
    getRecipeOrigin();
    getDrinkIngredients();
    getFoodIngredients();
  }, []);

  return (
    <myContext.Provider value={ providerState }>
      {children}
    </myContext.Provider>
  );
}

RecipesProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default RecipesProvider;
