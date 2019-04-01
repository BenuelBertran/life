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
      <h2 className="title menu__title screen-readers-only">Please, set up horizontal and vertical table size. Enter your data and push Start button.
      </h2>
      <Button
        className="btn start__btn"
        name="newField"
        value="set new field"
        callback={showModal.bind(this, "isNewField")}
      />
      <Button
        className="btn reset__btn"
        name="resetField"
        value="reset field"
        callback={resetGameField.bind(this, null, null)}
      />
      <Button
        className="btn game__btn save"
        name="saveGame"
        value="save game"
        callback={showModal.bind(this, "isSaveGame")}
      />
      <Button
        className="btn menu__btn load"
        name="loadGame"
        value="load game"
        callback={showModal.bind(this, "isLoadGame")}
      />
      <Button
        className="btn menu__btn play"
        name="playGame"
        value="start/stop animation"
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
