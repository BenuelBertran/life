import React from 'react';
import PropTypes from 'prop-types';
import Button from "./Button.js";
import '../styles/index.scss';

const NewGame = (props) => {
  const {gameNameHandler, saveNewGame} = props;
  
  return (
    <div className="modal game__modal">
      <input className="game__input" name="saveGame" type="text" placeholder="New save" onChange={gameNameHandler}></input>
      <Button
        className="btn game__btn"
        name="save"
        value="save"
        callback={saveNewGame}
      />
    </div>
  );
};

NewGame.propTypes = {
  gameNameHandler: PropTypes.func.isRequired,
  saveNewGame: PropTypes.func.isRequired
};

export default NewGame;
