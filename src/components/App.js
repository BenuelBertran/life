import React, {Component} from 'react';
import MainPage from "./MainPage.js";
import SettingsPage from "./SettingsPage.js";
import GamePage from "./GamePage.js";
import './App.css';

class App extends Component {  
  state = {
    isGame: false,
    isSettings: false,
    isMain: true,
    width: 0,
    height: 0,
    cellsState: []
  };
  
  //Сохраняет пользовательскую ширину таблицы
  widthChangeHandler = (e) => {
    this.setState ({
      width: e.currentTarget.value
    })
  };
  //Сохраняет пользовательскую высоту таблицы
  heightChangeHandler = (e) => {
    this.setState ({
      height: e.currentTarget.value
    })
  };
  //Загружает сохранённую игру
  loadGame = (key) => {
    let width = JSON.parse(localStorage.getItem(key)).width;
    let height = JSON.parse(localStorage.getItem(key)).height;
    let savedState = JSON.parse(localStorage.getItem(key)).state;
    this.setState ({
      width: width,
      height: height,
      isMain: false,
      isGame: true,
      cellsState: savedState
    })
  };
  //Переход на страницу настроек
  toSettingsPage = () => {
    setTimeout(()=> {
      this.setState ({
        isMain: false,
        isSettings: true
      })  
    }, 500)
  };
  //Переход на страницу игры
  toStartPage = () => {
    setTimeout(()=> {
      this.setState ({
        isSettings: false,
        isGame: true
      })  
    }, 500)
  };
  
  render() {
    const {isGame, isSettings, isMain, width, height, cellsState} = this.state;
    return (
      <div className="App">
        <main className="App__main">
          {isMain
            ? <MainPage
                newGame={this.toSettingsPage}
                loadGame={this.loadGame}
              />
            : isSettings
            ? <SettingsPage
                startGame={this.toStartPage}
                changeWidth={this.widthChangeHandler}
                changeHeight={this.heightChangeHandler}
              />
            : isGame 
            ? <GamePage 
                width={width}
                height={height}
                cellsState={cellsState}
              /> 
            : null
          }
        </main>
      </div>
    );
  }
}

export default App;
