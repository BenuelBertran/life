import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './MainPage.css';

class MainPage extends Component {
  state = {
    isActive: false
  }

  closeModal = () => {
    const escKeycode = 27;
    let close = (e) => {
      if (e.keyCode === escKeycode) {
        this.setState ({
          isActive: false
        })
        window.removeEventListener("keydown", close);
      }
    }
    window.addEventListener("keydown", close);
  };

  //Открывает список сохранёнок
  loadGameList = () => {
    this.closeModal();
    this.setState ({
      isActive: true
    })
  };
  //Передаёт выбранную игру для загрузки
  itemHandler = (e) => {
    const {loadGame} = this.props;
    this.setState ({
      isActive: false
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
    const {isActive} = this.state;
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
        <div className={isActive
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
