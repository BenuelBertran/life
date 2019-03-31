import React, {Component} from 'react';
import PropTypes from 'prop-types';
import NewGame from "./NewGame.js";
import SaveGame from "./SaveGame.js";
import LoadGame from "./LoadGame.js";
import Button from "./Button.js";
import '../styles/index.scss';

class Menu extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      isPlaying: false,
      generation: []
    }
  };

  changeStateHandler = () => {
    const {generateState} = this.props;
    const {stateTable} = this.state;
    generateState(stateTable);
  };

  //Генерирует новое поколение через 1 секунду
  nextGeneration = () => {
    const {stateTable, rows, cols} = this.props;
    const {generation} = this.state;
    const newStateTable = JSON.parse(JSON.stringify(stateTable));
    let live = 0;
      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
          let count = 0;
          if (i > 0) {
            if (stateTable[i-1][j]) count++;
          }
          if (i > 0 && j > 0) {
            if (stateTable[i - 1][j - 1]) count++;
          }
          if (i > 0 && j < cols - 1) {
            if (stateTable[i - 1][j + 1]) count++;
          }
          if (j < cols - 1) {
            if (stateTable[i][j + 1]) count++;
          }
          if (j > 0) {
            if (stateTable[i][j - 1]) count++;
          }
          if (i < rows - 1) {
            if (stateTable[i + 1][j]) count++;
          }
          if (i < rows - 1 && j > 0) {
            if (stateTable[i + 1][j - 1]) count++;
          }
          if (i < rows - 1 && j < cols - 1) {
             if (stateTable[i + 1][j + 1]) count++;
          }
          if (stateTable[i][j]) live++;
          if (stateTable[i][j] && (count < 2 || count > 3)) {
            newStateTable[i][j] = false;
          }
          if (!stateTable[i][j] && (count === 3)) {
            newStateTable[i][j] = true;
          }
        }
      }
      //Проверки: если все ячейки мертвы/больше не меняются/повторяют свои конфигурации
      if (!live) {
        this.gamePlaying();
        alert("Dear friend, all your population are dead, Life is over. Have fun and good luck next time");
      } else
      if (JSON.stringify(stateTable) === JSON.stringify(newStateTable)) {
        this.gamePlaying();
        alert("Dear friend, your population gone to dead end, Life is over. Have fun and good luck next time");
      } else
      for (let i = 0; i < generation.length; i++) {
        if (JSON.stringify(generation[i]) === JSON.stringify(newStateTable)) {
          this.gamePlaying();
          alert("Dear friend, your population found itself in the wheel of sansara, Life is over. Have fun and good luck next time");
        }  
      }
      generation.push(newStateTable);
      this.setState ({
        stateTable: newStateTable
      }, this.changeStateHandler)
  };
  

  

  //Запускает\Останавливает игру по клику по кнопке
  gamePlaying = () => {
    const {isPlaying} = this.state;
    
    if (isPlaying) {
      clearInterval(this.timer);
      this.setState ({isPlaying: false, generation: []});
    } else {
      this.setState ({isPlaying: true});
      this.timer = setInterval(this.nextGeneration, 1000);
    }
  };


  
  render () {
    const {resetGameField, isHidden, isNewField, isSaveGame, isLoadGame, rowsHandler, colsHandler, newFieldHandler, saveGameHandler, saveNewGame, loadGameHandler, gameNameHandler, loadSelectedGame} = this.props;
    return (
      <section className="menu main__section">
        <h2 className="title menu__title screen-readers-only">Please, set up horizontal and vertical table size. Enter your data and push Start button.
        </h2>
        <Button
          className="btn start__btn"
          name="newField"
          value="set new field"
          callback={newFieldHandler}
        />
        <Button
          className="btn reset__btn"
          name="resetField"
          value="reset field"
          callback={resetGameField.bind(this, 5, 5)}
        />
        <Button
          className="btn game__btn save"
          name="saveGame"
          value="save game"
          callback={saveGameHandler}
        />
        <Button
          className="btn menu__btn load"
          name="loadGame"
          value="load game"
          callback={loadGameHandler}
        />
        <Button
          className="btn menu__btn play"
          name="playGame"
          value="start/stop animation"
          callback={this.gamePlaying}
        /> 
        {
          !isHidden && isNewField &&
          <NewGame
            rowsHandler={rowsHandler}
            colsHandler={colsHandler}
            resetGameField={resetGameField}
          />
        }
        {
          !isHidden && isSaveGame &&
          <SaveGame
            gameNameHandler={gameNameHandler}
            saveNewGame={saveNewGame}
          />
        }
        {
          !isHidden && isLoadGame && 
          <LoadGame
            loadSelectedGame={loadSelectedGame}
          />
        }
      </section>
    )
  }
};

Menu.propTypes = {
};

export default Menu;
