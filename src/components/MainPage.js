import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './MainPage.css';

class MainPage extends Component {
  state = {
    isLoaded: false
  }
  //Показывает список сохранёнок
  loadGameList = () => {
    this.setState ({
      isLoaded: true
    })
  };
  //Передаёт выбранную игру для загрузки
  itemHandler = (e) => {
    const {loadGame} = this.props;
    this.setState ({
      isLoaded: false
    })
    let selected = e.currentTarget.innerText;
    loadGame(selected);
  };
  
  render () {
    let array = [];
    for (var i = 0; i < localStorage.length; i++) {
      if (localStorage.key(i)) {
        array.push(localStorage.key(i));
      }
    }
    const {newGame} = this.props;
    const {isLoaded} = this.state;
    return (
      <div className="app__main">
        <p className="app__main--text">Welcome to city 17!
          <br></br>
            Create your own Life and proud yourself.
          <br></br>
          Push Start button and play.
          <br></br> 
          Load button for rebirth old population.
        </p>
        <button className="btn app__main--window1" onClick={newGame}>Start new game</button>
        <div className={isLoaded
            ? "mainPage__load--active"
            : "mainPage__load"
          }>
          <ol className="mainPage__list">
            {
              array.map((game, index) => {
              return <li className="mainPage__item" key={index} onClick={this.itemHandler}>{game}</li>
              })
            }
          </ol>
        </div>
        <button className="btn app__main--window1" onClick={this.loadGameList}>Load game</button>
      </div>
    )
  }
};

MainPage.propTypes = {
  newGame: PropTypes.func.isRequired,
  loadGame: PropTypes.func.isRequired
};

export default MainPage;
