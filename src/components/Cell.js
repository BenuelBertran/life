import React from 'react';
import PropTypes from 'prop-types';
import '../styles/index.scss';

const Cell = (props) => {
  const {isAlive, changeCellState, row, col} = props;
  
  return (
    <div 
      className={isAlive
        ? "table__cell table__cell--green"
        : "table__cell"
      }
      onClick={changeCellState.bind(this, row, col)}	
    >
    </div>
  );
};

Cell.propTypes = {
  row: PropTypes.number.isRequired,
  col: PropTypes.number.isRequired,
  isAlive: PropTypes.bool.isRequired,
  changeCellState: PropTypes.func.isRequired
};

export default Cell;
