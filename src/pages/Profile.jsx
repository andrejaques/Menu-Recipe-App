import React from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/Profile.css';

function Profile() {
  const history = useHistory();
  const localEmail = JSON.parse(localStorage.getItem('user'));
  const profileEmail = localEmail
    ? localEmail.email : 'Nenhum e-mail encontrado';

  const clearAndLogout = () => {
    localStorage.clear();
    history.push('/');
  };

  return (
    <div>
      <Header brand="Profile" className="img-search" />
      <div
        data-testid="profile-email"
        className="profile-email"
      >
        { profileEmail }
      </div>
      <div className="div-explore-profile">
        <button
          type="button"
          data-testid="profile-favorite-btn"
          onClick={ () => history.push('/receitas-favoritas') }
        >
          Favourites Recipes
        </button>
        <button
          type="button"
          data-testid="profile-done-btn"
          onClick={ () => history.push('/receitas-feitas') }
        >
          Recipes Done
        </button>
        <button
          type="button"
          data-testid="profile-logout-btn"
          onClick={ () => clearAndLogout() }
        >
          Exit
        </button>
      </div>
      <Footer />
    </div>
  );
}

export default Profile;
