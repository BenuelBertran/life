import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Table from "./Table.js";
import '../styles/index.scss';

class GamePage extends Component {
  constructor(props) {
    super(props);
    const {cellsState, width, height} = this.props;
    //Проверяет, начата новая игра или загружена старая
    if (cellsState.length === 0) {
      for (let i = 0; i < width; i++) {
        cellsState[i] = [];
        for (let j = 0; j < height; j++) {
          cellsState[i][j] = false;
        }
      }  
    }
    
    this.state = {
      tableState: cellsState,
      isPlaying: false,
      isHidden: true,
      gameName: "",
      game: {},
      generation: []
    };
  };
  
  //Меняет состояние ячейки при клике
  changeCellState = (row, col) => {
    const {tableState} = this.state;
    tableState[row][col] = !tableState[row][col];
    this.setState ({});
  };
  //Генерирует новое поколение через 1 секунду
  nextGeneration = () => {
    const {tableState, generation} = this.state;
    const newTableState = JSON.parse(JSON.stringify(tableState));
    let live = 0;
      for (let i = 0; i < this.props.width; i++) {
        for (let j = 0; j < this.props.height; j++) {
          let count = 0;
          if (i > 0) {
            if (tableState[i-1][j]) count++;
          }
          if (i > 0 && j > 0) {
            if (tableState[i - 1][j - 1]) count++;
          }
          if (i > 0 && j < this.props.height - 1) {
            if (tableState[i - 1][j + 1]) count++;
          }
          if (j < this.props.height - 1) {
            if (tableState[i][j + 1]) count++;
          }
          if (j > 0) {
            if (tableState[i][j - 1]) count++;
          }
          if (i < this.props.width - 1) {
            if (tableState[i + 1][j]) count++;
          }
          if (i < this.props.width - 1 && j > 0) {
            if (tableState[i + 1][j - 1]) count++;
          }
          if (i < this.props.width - 1 && j < this.props.height - 1) {
             if (tableState[i + 1][j + 1]) count++;
          }
          if (tableState[i][j]) live++;
          if (tableState[i][j] && (count < 2 || count > 3)) {
            newTableState[i][j] = false;
          }
          if (!tableState[i][j] && (count === 3)) {
            newTableState[i][j] = true;
          }
        }
      }
      //Проверки: если все ячейки мертвы/больше не меняются/повторяются конфигурации
      if (!live) {
        this.gamePlaying();
        alert("Dear friend, all your population are dead, Life is over. Have fun and good luck next time");
      } else
      if (JSON.stringify(tableState) === JSON.stringify(newTableState)) {
        this.gamePlaying();
        alert("Dear friend, your population gone to dead end, Life is over. Have fun and good luck next time");
      } else
      for (let i = 0; i < generation.length; i++) {
        if (JSON.stringify(generation[i]) === JSON.stringify(newTableState)) {
          this.gamePlaying();
          alert("Dear friend, your population found itself in the wheel of sansara, Life is over. Have fun and good luck next time");
        }  
      }
      generation.push(newTableState);
      this.setState ({
        tableState: newTableState
      })
  };
  //Передаёт имя нового сохранения
  gameNameHandler = (e) => {
    this.setState ({
      gameName: e.currentTarget.value
    })
  };
  //Отображает окно сохранения игры по клику
  saveGame = () => {
    this.setState ({
      isHidden: false
    })
  };
  //Сохраняет игру
  saveGameApply = () => {
    const {width, height} = this.props;
    const {game, gameName, tableState} = this.state;
    game.name = gameName
    game.state = tableState;
    game.width = width;
    game.height = height;
    localStorage.setItem(gameName, JSON.stringify(game));
    
    this.setState ({
      isHidden: true
    })
  };
  //Запускает\Останавливает игру по клику по кнопке
  gamePlaying = () => {
    const {isPlaying} = this.state;
    
    if (isPlaying) {
      clearInterval(this.timer);
      this.setState ({isPlaying: false});
    } else {
      this.setState ({isPlaying: true});
      this.timer = setInterval(this.nextGeneration, 1000);
    }
  };

  render() {
    const {width, height} = this.props;
    const {isHidden, tableState, gameName} = this.state;
    return (
      <section className="game main__section">
        <Table
          rows={width}
          cols={height}
          tableState={tableState}
          changeCellState={this.changeCellState}
        />
        <button className="btn game__btn" onClick={this.gamePlaying}>Make Life</button>
        <button className="btn game__btn" onClick={this.saveGame}>Save game</button>
        {
          !isHidden && 
          <div className="modal game__modal">
            <input className="game__input" name="saveGame" type="text" value={gameName} placeholder="New save" onChange={this.gameNameHandler}></input>
            <button className="btn game__btn" onClick={this.saveGameApply}>save</button>
          </div>
        }
      </section>
    )
  }
}

GamePage.propTypes = {
  width: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
  cellsState: PropTypes.array.isRequired
};


export default GamePage;
