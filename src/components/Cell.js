import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './Cell.css';

class Cell extends Component {
  //Отправляет свои координаты в колбек для смены состояния
  cellHandler = () => {
    const {changeCellState, row, col} = this.props;
    changeCellState(row, col);
  }

  render() {
    const {isAlive} = this.props;
    return (
      <div 
      	className={isAlive
          ? "app__cell--alive"
          : "app__cell"
        }
      	onClick={this.cellHandler}	
      >
      </div>
    );
  }
};

Cell.propTypes = {
  key: PropTypes.number,
  row: PropTypes.number.isRequired,
  col: PropTypes.number.isRequired,
  isAlive: PropTypes.bool.isRequired,
  changeCellState: PropTypes.func.isRequired
};

export default Cell;
