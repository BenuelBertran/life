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
    <div className="modal menu__modal">
      <h3 className="title menu__title">Please, set up field size and click Ok
      </h3>
      <form className="menu__form">
        <label className="menu__label" htmlFor="field-rows">Rows</label>
        <input className="menu__input" name="rows" type="text" id="field-rows" maxLength="1" placeholder="0" autoFocus onChange={rowsHandler}></input>
        <label className="menu__label" htmlFor="field-cols">Cols</label>
        <input className="menu__input" name="cols" type="text" id="field-cols" maxLength="1" placeholder="0" onChange={colsHandler}></input>
      </form>
      <Button
        className="btn menu__btn"
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
