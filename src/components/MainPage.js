import React, {Component} from 'react';
import PropTypes from 'prop-types';
import '../styles/index.scss';

class MainPage extends Component {
  state = {
    isHidden: true
  }

  closeModal = () => {
    const escKeycode = 27;
    let close = (e) => {
      if (e.keyCode === escKeycode) {
        this.setState ({
          isHidden: true
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
      isHidden: false
    })
  };
  //Передаёт выбранную игру для загрузки
  itemHandler = (e) => {
    const {loadGame} = this.props;
    this.setState ({
      isHidden: true
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
    const {isHidden} = this.state;
    return (
      <section className="menu main__section">
        <h2 className="title menu__title">Welcome to city 17!
          <br></br>
            Create your own Life and proud yourself.
          <br></br>
          Push Start button and play.
          <br></br> 
          Push Load button to revive old population.
        </h2>
        <button className="btn menu__btn" onClick={newGame}>Start new game</button>
        <button className="btn menu__btn" onClick={this.loadGameList}>Load game</button>
        {
          !isHidden && 
          <div className="modal menu__modal">
            <ol className="menu__list">
              {
                array.map((game, index) => {
                return <li className="menu__item" key={index} onClick={this.itemHandler}>{game}</li>
                })
              }
            </ol>
          </div>
        }
      </section>
    )
  }
};

MainPage.propTypes = {
  newGame: PropTypes.func.isRequired,
  loadGame: PropTypes.func.isRequired
};

export default MainPage;
