import React, {Component} from 'react';
import Menu from "./Menu.js";
import Game from "./Game.js";
import '../styles/index.scss';

class App extends Component {
  constructor() {
    super();
    this.initialSize = 5;
    
    this.state = {
      rows: this.initialSize,
      cols: this.initialSize,
      stateTable: [],
      game: {},
      generation: [],
      isNewGame: true,
      isHidden: true,
      isNewField: false,
      isSaveGame: false,
      isLoadGame: false,
      isAnimate: false
    };
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

  showModal = (modalName) => {
    this.closeModal();
    this.setState ({
      isHidden: false,
      [modalName]: true
    })
  };

  resetGameField = (rows, cols) => {
    this.setState ({
      rows: rows || this.initialSize,
      cols: cols || this.initialSize,
      isNewGame: true,
      isHidden: true,
      isNewField: false
    })
  };

  //Сохраняет игру
  saveNewGame = (gameName) => {
    const {rows, cols, stateTable, game} = this.state;
    
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

  showMessage = (rule) => {
    switch(rule) {
      case "all dead":
        alert("Dear friend, all your population are dead. Game is over, have fun and good luck next time");
        break;
      case "stable configuration":
        alert("Dear friend, your last configuration has a loop. Game is over, have fun and good luck next time");
        break;
      case "periodic configuration":
        alert("Dear friend, one of your configuration has loop. Game is over, have fun and good luck next time");
        break;
      default:
        alert("Game is over with no reasons. Please, restart the game");
    }
  };

  checkGameState = (aliveCount, newStateTable) => {
    const {stateTable, generation} = this.state;
    
    if (!aliveCount) {
      this.animationToggle();
      this.showMessage("all dead");
    } else
    if (JSON.stringify(stateTable) === JSON.stringify(newStateTable)) {
      this.animationToggle();
      this.showMessage("stable configuration");
    } else
    for (let i = 0; i < generation.length; i++) {
      if (JSON.stringify(generation[i]) === JSON.stringify(newStateTable)) {
        this.animationToggle();
        this.showMessage("periodic configuration");
      }  
    }
  };

  //Генерирует новое поколение через 1 секунду
  getNextState = () => {
    const {rows, cols, stateTable, generation} = this.state;
    const newStateTable = JSON.parse(JSON.stringify(stateTable));
    let aliveCount = 0;
    
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        let count = 0;
        i > 0 && stateTable[i-1][j] && count++;
        (i > 0 && j > 0) && stateTable[i - 1][j - 1] && count++;
        (i > 0 && j < cols - 1) && stateTable[i - 1][j + 1] && count++;
        (j < cols - 1) && stateTable[i][j + 1] && count++;
        j > 0 && stateTable[i][j - 1] && count++;
        (i < rows - 1) && stateTable[i + 1][j] && count++;
        (i < rows - 1 && j > 0) && stateTable[i + 1][j - 1] && count++;
        (i < rows - 1 && j < cols - 1) && stateTable[i + 1][j + 1] && count++;
        stateTable[i][j] && aliveCount++;
        if (stateTable[i][j] && (count < 2 || count > 3)) {
          newStateTable[i][j] = false;
        }
        if (!stateTable[i][j] && (count === 3)) {
          newStateTable[i][j] = true;
        }
      }
    }
    
    this.checkGameState(aliveCount, newStateTable);
    generation.push(newStateTable);
    this.setState ({
      stateTable: newStateTable
    })
  };

  //Запускает\Останавливает игру по клику по кнопке
  animationToggle = () => {
    const {isAnimate} = this.state;
    const animationSpeed = 1000;
    
    if (isAnimate) {
      clearInterval(this.timer);
      this.setState ({isAnimate: false, generation: []});
    } else {
      this.setState ({isAnimate: true});
      this.timer = setInterval(this.getNextState, animationSpeed);
    }
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
    const {isNewGame, isHidden, isNewField, isSaveGame, isLoadGame, rows, cols, stateTable} = this.state;
    isNewGame && this.generateStateTable();
    
    return (
      <div className="app">
        <main className="main app__main">
          <Menu
            isHidden={isHidden}
            isNewField={isNewField}
            isSaveGame={isSaveGame}
            isLoadGame={isLoadGame}
            showModal={this.showModal}
            resetGameField={this.resetGameField}
            saveNewGame={this.saveNewGame}
            loadSelectedGame={this.loadSelectedGame}
            animationToggle={this.animationToggle}
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
