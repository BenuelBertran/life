import React from 'react';
import PropTypes from 'prop-types';
import Button from "./Button.js";
import '../styles/index.scss';

const NewGame = (props) => {
  const {rowsHandler, colsHandler, resetGameField} = props;
  
  return (
    <div className="modal game__modal">
      <h2 className="title menu__title">Please, set up horizontal and vertical table size. Enter your data and push Start button.
      </h2>
      <form className="settings__form">
        <label className="settings__label" htmlFor="field-rows">Rows
          <input className="settings__field" name="rows" type="number" id="field-rows" placeholder="0" autoFocus onChange={rowsHandler}></input>
        </label>
        <label className="settings__label" htmlFor="field-cols">Cols
          <input className="settings__field" name="cols" type="number" id="field-cols" placeholder="0" onChange={colsHandler}></input>
        </label>
      </form>
      <Button
        className="btn settings__btn"
        name="apply"
        value="Ok"
        callback={resetGameField}
      />
    </div>
  );
};

NewGame.propTypes = {
  rowsHandler: PropTypes.func.isRequired,
  colsHandler: PropTypes.func.isRequired,
  resetGameField: PropTypes.func.isRequired
};

export default NewGame;
