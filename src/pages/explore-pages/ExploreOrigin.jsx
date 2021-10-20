import React, { useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import ItemCard from '../../components/ItemCard';
import ArrowIcon from '../../images/ArrowIcon.svg';
import myContext from '../../context/myContext';
import Header from '../../components/Header';
import searchIcon from '../../images/searchIcon.svg';
import Footer from '../../components/Footer';

function ExploreOrigin() {
  const doze = 12;
  const { foodArea } = useContext(myContext);
  const [optValue, setOptValue] = useState('');
  const [originDish, setOriginDish] = useState([]);

  const handleSelect = (e) => {
    setOptValue(e);
  };

  useEffect(() => {
    console.log(optValue);
    const getOriginDish = async (origin) => {
      if (origin !== '') {
        try {
          const res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${origin}`);
          const data = await res.json();
          setOriginDish(data);
        } catch (err) {
          console.log(err);
        }
      }
    };
    getOriginDish(optValue);
  }, [optValue]);

  const history = useHistory();
  const goToPreviousPath = () => {
    history.goBack();
  };
  return (
    <div className="explore-wrapper">
      <Header
        brand="Explore Origin"
        src={ searchIcon }
        alt="search-icon"
        dataId="search-top-btn"
        className="img-search"
      />
      <button className="voltar2 " type="button" onClick={ goToPreviousPath }>
        <img className="explore" src={ ArrowIcon } alt="voltar" />
      </button>
      <div className="origin-div">
        <label htmlFor="areas">
          <select
            name="optValue"
            value={ optValue }
            onChange={ (e) => handleSelect(e.currentTarget.value) }
            className="areas"
          >
            {
              foodArea.length > 0 && foodArea.map((area, index) => (
                <option
                  className="origin-opt"
                  value={ area.strArea }
                  key={ index }
                >
                  { area.strArea }
                </option>
              ))
            }
          </select>
        </label>
      </div>
      <div className="origin-cards">
        { originDish.meals
          && originDish.meals.map((meal, index) => index < doze && (<ItemCard
            title={ meal.strMeal }
            data-testid={ `${index}-recipe-card` }
            thumb={ meal.strMealThumb }
            id={ meal.idMeal }
            index={ index }
            key={ index }
            to={ `/comidas/${meal.idMeal}` }
          />)) }
      </div>
      <Footer />
    </div>
  );
}

export default ExploreOrigin;
