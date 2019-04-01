import React from 'react';
import PropTypes from 'prop-types';
import NewGame from "./NewGame.js";
import SaveGame from "./SaveGame.js";
import LoadGame from "./LoadGame.js";
import Button from "./Button.js";
import '../styles/index.scss';

const Menu = (props) => {
  const {isHidden, isNewField, isSaveGame, isLoadGame, showModal, resetGameField, saveNewGame, loadSelectedGame, animationToggle} = props;
  
  return (
    <section className="menu main__section">
      <h2 className="title menu__title">Conway's Game of Life v1.0
      </h2>
      <p className="menu__subtitle">To start playing, click cells on the game field and then push the Start/Stop button.</p>
      <Button
        className="btn menu__btn"
        name="newField"
        value="set new field"
        callback={showModal.bind(this, "isNewField")}
      />
      <Button
        className="btn menu__btn"
        name="resetField"
        value="reset field"
        callback={resetGameField.bind(this, null, null)}
      />
      <Button
        className="btn menu__btn"
        name="saveGame"
        value="save game"
        callback={showModal.bind(this, "isSaveGame")}
      />
      <Button
        className="btn menu__btn"
        name="loadGame"
        value="load game"
        callback={showModal.bind(this, "isLoadGame")}
      />
      <Button
        className="btn menu__btn menu__btn--animation"
        name="playGame"
        value="life"
        callback={animationToggle}
      /> 
      {!isHidden && isNewField &&
        <NewGame
          resetGameField={resetGameField}
        />}
      {!isHidden && isSaveGame &&
        <SaveGame
          saveNewGame={saveNewGame}
        />}
      {!isHidden && isLoadGame && 
        <LoadGame
          loadSelectedGame={loadSelectedGame}
        />}
    </section>
  )
};

Menu.propTypes = {
  isHidden: PropTypes.bool.isRequired,
  isNewField: PropTypes.bool.isRequired,
  isSaveGame: PropTypes.bool.isRequired,
  isLoadGame: PropTypes.bool.isRequired,
  showModal: PropTypes.func.isRequired,
  resetGameField: PropTypes.func.isRequired,
  saveNewGame: PropTypes.func.isRequired,
  loadSelectedGame: PropTypes.func.isRequired,
  animationToggle: PropTypes.func.isRequired
};

export default Menu;
