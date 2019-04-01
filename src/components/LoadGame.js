import React from 'react';
import PropTypes from 'prop-types';
import '../styles/index.scss';

const LoadGame = (props) => {
  const {loadSelectedGame} = props;
  
  let localStorageList = [];
  for (let i = 0; i < localStorage.length; i++) {
    if (localStorage.key(i)) {
      localStorageList.push(localStorage.key(i));
    }
  }
  
  let loadGameList = localStorageList.map((game, index) => {
    return <li className="menu__item" key={index} onClick={loadSelectedGame}>{game}</li>
  })
  
  return (
    <div className="modal menu__modal">
      <h3 className="title menu__title">Click to load game in a list
      </h3>
      <ol className="menu__list">
        {loadGameList}
      </ol>
    </div>
  );
};

LoadGame.propTypes = {
  loadSelectedGame: PropTypes.func.isRequired
};

export default LoadGame;
