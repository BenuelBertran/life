import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './Table.css';
import Cell from "./Cell.js";

class Table extends Component {
  render() {
    const {rows, cols, tableState, changeCellState} = this.props;
    let cells = [];
    //Заполняет массив таблицы ячейками
    for (let i = 0; i < rows; i++) {
      cells[i] = [];
      for (let j = 0; j < cols; j++) {
        cells[i][j] = 
          <Cell
            key={`${i}.${j}`}
            row={i} 
            col={j}
            isAlive={tableState[i][j]}
            changeCellState={changeCellState}
          />;
      }
    }
    //Строит ряды таблицы с ячейками внутри
    let grid = cells.map((row, index) => {
      return <div className="table__row" key={index}>{row}</div>
    })
    //Отрисовывает тиблицу на странице 
    return (
      <div className="table app__table">
        {grid}
      </div>
    )
  }
};

Table.propTypes = {
  rows: PropTypes.number.isRequired,
  cols: PropTypes.number.isRequired,
  tableState: PropTypes.array.isRequired,
  changeCellState: PropTypes.func.isRequired
};

export default Table;
