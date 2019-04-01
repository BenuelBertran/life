import React from 'react';
import PropTypes from 'prop-types';
import Button from "./Button.js";
import '../styles/index.scss';

const NewGame = (props) => {
  let gameName;
  const gameNameHandler = (e) => {  
    gameName = e.currentTarget.value;
  };
  
  const {saveNewGame} = props;
  const saveGameHandler = () => {
    saveNewGame(gameName);
  };

  return (
    <div className="modal menu__modal">
      <h3 className="title menu__title">Enter game name and click Save
      </h3>
      <input className="menu__input menu__input--save" name="saveGame" type="text" placeholder="New save" onChange={gameNameHandler}></input>
      <Button
        className="btn menu__btn"
        name="save"
        value="save"
        callback={saveGameHandler}
      />
    </div>
  );
};

NewGame.propTypes = {
  saveNewGame: PropTypes.func.isRequired
};

export default NewGame;
