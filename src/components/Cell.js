import React, {Component} from 'react';
import PropTypes from 'prop-types';
import '../styles/index.scss';

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
          ? "table__cell table__cell--green"
          : "table__cell"
        }
      	onClick={this.cellHandler}	
      >
      </div>
    );
  }
};

Cell.propTypes = {
  row: PropTypes.number.isRequired,
  col: PropTypes.number.isRequired,
  isAlive: PropTypes.bool.isRequired,
  changeCellState: PropTypes.func.isRequired
};

export default Cell;
