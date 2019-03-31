import React, {Component} from 'react';
import Menu from "./Menu.js";
import Game from "./Game.js";
import '../styles/index.scss';

class App extends Component {
  state = {
    rows: 5,
    cols: 5,
    newRows: 0,
    newCols: 0,
    stateTable: [],
    gameName: "",
    game: {},
    isNewGame: true,
    isHidden: true,
    isNewField: false,
    isSaveGame: false,
    isLoadGame: false
  };
  
  generateState = (stateTable) => {
    this.setState ({
      stateTable: stateTable
    })
  };

  closeModal = () => {
    const escKeycode = 27;
    let close = (e) => {
      if (e.keyCode === escKeycode) {
        this.setState ({
          isHidden: true,
          isSaveGame: false,
          isLoadGame: false,
          isNewField: false
        })
        window.removeEventListener("keydown", close);
      }
    }
    window.addEventListener("keydown", close);
  };

  newFieldHandler = () => {
    this.closeModal();
    this.setState ({
      isHidden: false,
      isNewField: true
    })
  };

  saveGameHandler = () => {
    this.closeModal();
    this.setState ({
      isHidden: false,
      isSaveGame: true
    })
  };

  loadGameHandler = () => {
    this.closeModal();
    this.setState ({
      isHidden: false,
      isLoadGame: true
    })
  };

  rowsHandler = (e) => {
    this.setState ({
      newRows: +e.currentTarget.value
    })
  };

  colsHandler = (e) => {
    this.setState ({
      newCols: +e.currentTarget.value
    })
  };

  resetGameField = () => {
    const {newRows, newCols} = this.state;
    this.setState ({
      rows: newRows || 5,
      cols: newCols || 5,
      isNewGame: true,
      isHidden: true,
      isNewField: false
    })
  };

  //Передаёт имя нового сохранения
  gameNameHandler = (e) => {
    this.setState ({
      gameName: e.currentTarget.value
    })
  };

  //Сохраняет игру
  saveNewGame = () => {
    const {rows, cols, stateTable, game, gameName} = this.state;
    
    game.name = gameName
    game.state = stateTable;
    game.rows = rows;
    game.cols = cols;
    localStorage.setItem(gameName, JSON.stringify(game));
    
    this.setState ({
      isHidden: true,
      isSaveGame: false
    })
  };

  //Загружает сохранённую игру
  loadSelectedGame = (e) => {
    let selected = e.currentTarget.innerText;
    let loadedRows = JSON.parse(localStorage.getItem(selected)).rows;
    let loadedCols = JSON.parse(localStorage.getItem(selected)).cols;
    let loadedStateTable = JSON.parse(localStorage.getItem(selected)).state;
    this.setState ({
      isNewGame: false,
      isHidden: true,
      isLoadGame: false,
      rows: loadedRows,
      cols: loadedCols,
      stateTable: loadedStateTable
    })
  };

  //Toggle cell state (dead/alive) by mouse click
  changeCellState = (row, col) => {
    const {stateTable} = this.state;
    stateTable[row][col] = !stateTable[row][col];
    this.setState ({
      isNewGame: false
    })
  };

  //Make new state table in a New Game mode
  generateStateTable = () => {
    const {rows, cols, stateTable} = this.state;
    for (let i = 0; i < rows; i++) {
      stateTable[i] = [];
      for (let j = 0; j < cols; j++) {
        stateTable[i][j] = false;
      }
    }
  };

  render() {
    const {rows, cols, isNewGame, stateTable, isHidden, isNewField, isSaveGame, isLoadGame} = this.state;
    isNewGame && this.generateStateTable();
    
    return (
      <div className="app">
        <main className="main app__main">
          <Menu
            rows={rows}
            cols={cols}
            stateTable={stateTable}
            generateState={this.generateState}
            resetGameField={this.resetGameField}
            isHidden={isHidden}
            isNewField={isNewField}
            isSaveGame={isSaveGame}
            isLoadGame={isLoadGame}
            rowsHandler={this.rowsHandler}
            colsHandler={this.colsHandler}
            newFieldHandler={this.newFieldHandler}
            saveGameHandler={this.saveGameHandler}
            saveNewGame={this.saveNewGame}
            loadGameHandler={this.loadGameHandler}
            gameNameHandler={this.gameNameHandler}
            loadSelectedGame={this.loadSelectedGame}
          />
          <Game 
            rows={rows}
            cols={cols}
            stateTable={stateTable}
            changeCellState={this.changeCellState}
          />
        </main>
      </div>
    );
  }
};

export default App;
