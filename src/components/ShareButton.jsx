import React, { useState } from 'react';
import PropTypes from 'prop-types';
import copy from 'clipboard-copy';
import shareIcon from '../images/shareIcon.svg';

function ShareButton({ index, pathname }) {
  const [copied, setCopied] = useState(false);

  const handleClick = () => {
    copy(`${pathname}`);
    setCopied(true);
    console.log(pathname);
  };

  return (
    <div className="share-btn">
      <div>
        <button
          className="favorite-btn"
          type="button"
          onClick={ () => handleClick() }
          src={ shareIcon }
          data-testid={ `${index}-horizontal-share-btn` }
        >
          <img
            className="share-image"
            type="image/svg+xml"
            src={ shareIcon }
            data-testid="share-btn"
            alt="Compartilhar"
          />
        </button>
      </div>
      <div>
        { copied && <p className="link-copiado">Link copiado!</p> }
      </div>
    </div>
  );
}

ShareButton.propTypes = {
  pathname: PropTypes.string,
  index: PropTypes.number,
  address: PropTypes.string,
}.isRequired;

export default ShareButton;
