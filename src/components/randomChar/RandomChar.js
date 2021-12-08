import { Component } from 'react';

import MarvelService from '../../services/MarvelService'

import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';

class RandomChar extends Component {

  constructor(props) {
    super(props);
    this.updateChar();
  }

  state = {
    character: {}
  }

  marvelService = new MarvelService();

  onCharacterLoaded = (character) => {
    this.setState({character});
  }

  updateChar = () => {
    const minValue = 1011000;
    const maxValue = 1011400;

    const id = Math.floor(Math.random() * (maxValue - minValue) + minValue);

    this.marvelService
      .getCharacter(id)
        .then(this.onCharacterLoaded)
  }

  render() {
    const {character: {name, description, thumbnails, homepage, wiki}} = this.state;

    return (
      <section className="randomchar">
        <h2 className="visually-hidden">random character for you!</h2>
        <article className="randomchar__block">
          <img className="randomchar__img" width="180" height="180" src={thumbnails} alt={'Random character - ' + name}/>
          <div className="randomchar__info">
            <p className="randomchar__name">{name}</p>
            <p className="randomchar__descr">
              {description ? description : 'sory! We dont have description for this character'}
            </p>
            <div className="randomchar__links">
              <a className="button button__main" href={homepage}>
                <div className="inner">homepage</div>
              </a>
              <a className="button button__secondary" href={wiki}>
                <div className="inner">Wiki</div>
              </a>
            </div>
          </div>
        </article>
        <article className="randomchar__static">
          <p className="randomchar__title">
            Random character for today!<br/>
            Do you want to get to know him better?
          </p>
          <p className="randomchar__title">
            Or choose another one
          </p>
          <button className="randomchar__try-button button button__main" type="button">
            <div className="inner">try it</div>
          </button>
        </article>
      </section>
    )
  }

}

export default RandomChar;
