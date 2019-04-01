import React from 'react';
import PropTypes from 'prop-types';
import Button from "./Button.js";
import '../styles/index.scss';

const NewGame = (props) => {
  let rows, cols;
  const rowsHandler = (e) => {
    rows = +e.currentTarget.value;
  };
  const colsHandler = (e) => {
    cols = +e.currentTarget.value;
  };
  
  const {resetGameField} = props;
  const resetFieldHandler = () => {
    resetGameField(rows, cols);
  };
  
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
        callback={resetFieldHandler}
      />
    </div>
  );
};

NewGame.propTypes = {
  resetGameField: PropTypes.func.isRequired
};

export default NewGame;
