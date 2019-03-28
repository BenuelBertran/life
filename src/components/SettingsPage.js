import React from 'react';
import PropTypes from 'prop-types';
import './SettingsPage.css';

const SettingsPage = (props) => {
  const {startGame, changeWidth, changeHeight} = props;
  return (
    <div className="app__main">
      <form className="app__form">
        <label className="app__label" htmlFor="field-width">Set up field width</label>
        <input className="app__field" name="width" type="text" id="field-width" placeholder="0" autoFocus onChange={changeWidth}></input>
        <label className="app__label" htmlFor="field-height">Set up field height</label>
        <input className="app__field" name="height" type="text" id="field-height" placeholder="0" onChange={changeHeight}></input>
      </form>
      <button className="btn app__settings" onClick={startGame}>Start</button>
    </div>
  );
};

SettingsPage.propTypes = {
  startGame: PropTypes.func.isRequired,
  changeWidth: PropTypes.func.isRequired,
  changeHeight: PropTypes.func.isRequired
};

export default SettingsPage;
