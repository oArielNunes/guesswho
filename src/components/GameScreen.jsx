import { useState, useRef } from 'react';
import PropTypes from 'prop-types';

import './GameScreen.css'

const GameScreen = ({verifyLetter, pickedWord, pickedCategory, wordLetters, guessedLetters, wrongLetters, tryes, score,}) => {

    const [letter, setLetter] = useState('');
    const letterInputRef = useRef(null)

    const handleSubmit = (e) => {
        e.preventDefault();

        verifyLetter(letter);

        setLetter('');

        letterInputRef.current.focus();
    }

    return (
        <div className='game'>
            <p className='points'> score: 
                <span> {score}</span>
            </p>
            <h1>adivinhe o nome do campeão</h1>
            <h3 className='dica'>região do campeão: <span>{pickedCategory}</span></h3>
            <p className='chance'>voce ainda tem <span>{tryes}</span> chances</p>
            <div className="wordContainer">
                {wordLetters.map((letter, i) => guessedLetters.includes(letter) ? (
                    <span key={i} className='letter'>{letter}</span>
                ) : (
                    <span key={i} className='blankSquare'></span>
                )
                )}
            </div>
            <div className="letterContainer">
                <p>Escolha uma letra</p>
                <form onSubmit={handleSubmit}>
                    <input type="text" name="letter" maxLength={1} required onChange={(e) => setLetter(e.target.value)} value={letter} ref={letterInputRef}/>
                    <button>Jogar</button>
                </form>
            </div>
            <div className="wrongLettersContainer">
                <p>letras usadas</p>
                {wrongLetters.map((letter, i) => (
                    <span key={i}>{letter}</span>
                ))}
            </div>
            <div className='start'>
                <button onClick={verifyLetter}>Start</button>
            </div>
        </div>
    )
}


GameScreen.propTypes = {

    pickedWord: PropTypes.string.isRequired,
    pickedCategory: PropTypes.string.isRequired,
    wordLetters: PropTypes.array.isRequired,
    guessedletters: PropTypes.array.isRequired,
    wrongLetters: PropTypes.array.isRequired,
    tryes: PropTypes.number.isRequired,
    score: PropTypes.number.isRequired,
};    
export default GameScreen