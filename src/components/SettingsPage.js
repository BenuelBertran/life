import React from 'react';
import PropTypes from 'prop-types';
import '../styles/index.scss';

const SettingsPage = (props) => {
  const {startGame, changeWidth, changeHeight} = props;
  return (
    <section className="settings main__section">
      <h2 className="title settings__title">Please, set up horizontal and vertical table size. Enter your data and push Start button.</h2>
      <form className="settings__form">
        <label className="settings__label" htmlFor="field-width">Width
          <input className="settings__field" name="width" type="text" id="field-width" placeholder="0" autoFocus onChange={changeWidth}></input>
        </label>
        <label className="settings__label" htmlFor="field-height">Height
          <input className="settings__field" name="height" type="text" id="field-height" placeholder="0" onChange={changeHeight}></input>
        </label>
      </form>
      <button className="btn settings__btn" onClick={startGame}>Start</button>
    </section>
  );
};

SettingsPage.propTypes = {
  startGame: PropTypes.func.isRequired,
  changeWidth: PropTypes.func.isRequired,
  changeHeight: PropTypes.func.isRequired
};

export default SettingsPage;
