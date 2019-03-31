import React from 'react';
import PropTypes from 'prop-types';
import '../styles/index.scss';
import Cell from "./Cell.js";

const Grid = (props) => {
  const {rows, cols, stateTable, changeCellState} = props;
  
  //Make array of cells with state
  let cellsTable = [];
  for (let i = 0; i < rows; i++) {
    cellsTable[i] = [];
    for (let j = 0; j < cols; j++) {
      cellsTable[i][j] = 
        <Cell
          key={`${i}.${j}`}
          row={i} 
          col={j}
          isAlive={stateTable[i][j]}
          changeCellState={changeCellState}
        />;
    }
  }
  
  //Make array of rows with cells
  let grid = cellsTable.map((row, index) => {
    return <div className="table__row" key={index}>{row}</div>
  })
   
  return (
    grid
  )
};

Grid.propTypes = {
  rows: PropTypes.number.isRequired,
  cols: PropTypes.number.isRequired,
  stateTable: PropTypes.array.isRequired,
  changeCellState: PropTypes.func.isRequired
};

export default Grid;
