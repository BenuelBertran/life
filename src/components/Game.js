import React from 'react';
import PropTypes from 'prop-types';
import Grid from "./Grid.js";
import '../styles/index.scss';

const Game = (props) => {
  const {rows, cols, stateTable, changeCellState} = props;

  return (
    <section className="game main__section">
      <div className="table game__table">
        <Grid
          rows={rows}
          cols={cols}
          stateTable={stateTable}
          changeCellState={changeCellState}
        />
      </div>
    </section>
  )
};

Game.propTypes = {
  rows: PropTypes.number.isRequired,
  cols: PropTypes.number.isRequired,
  stateTable: PropTypes.array.isRequired,
  changeCellState: PropTypes.func.isRequired
};

export default Game;
