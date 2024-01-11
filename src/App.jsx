//CSS //
import './App.css';
//CSS// 

//API-REACT//
import { useCallback, useEffect, useState } from 'react';


//API-REACT//

//BACKGROUND-GRADIENT//
import Gradient from './assets/gradient.png';
//BACKGROUND-GRADIENT//

//COMPONENTS//
import StartScreen from './components/StartScreen';
import GameScreen from './components/GameScreen';
import GameOverScreen from './components/GameOverScreen';
//COMPONENTS//

//DATA//
import { championsList } from './Data/wordlist';
//DATA//

//STAGE OBJECT//
const stages = [
  {id:1, name:'start'},
  {id:2, name:'game'},
  {id:3, name:'game-over'},
];

function App() {
  const [gameStage, setGameStage] = useState(stages[0].name)
  const [words] = useState(championsList);


  //WORDS-CATEGORY-LETTERS //
  const [pickedWord, setPickedWord] = useState('');
  const [pickedCategory, setPickedCategory] = useState('');
  const [letters, setLetters] = useState('')

  // STATES FROM GAME // 
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [tryes, setTryes] = useState(5);
  const [score, setScore] = useState (0)


  //PICK CATEGORY AND WORDS FUNCTION //
  const pickCatAndWord = useCallback(() => {

    //PICK RANDOM CATEGORY //
    const categories = Object.keys(words);
    const category = categories[Math.floor(Math.random() * Object.keys(categories).length)];


    //PICK RANDOM WORD //
    const word = words[category][Math.floor(Math.random() * words[category].length)]


    return {word, category};
  },[words]);

  //START GAME// 
  const startGame = useCallback(() => {
    
    clearLetterStates();

    const {word, category} = pickCatAndWord();

    let wordLetters = word.split('');

    wordLetters = wordLetters.map((l) => l.toLowerCase());

    setPickedWord(word);
    setPickedCategory(category);
    setLetters(wordLetters);
    

    setGameStage(stages[1].name)
  }, [pickCatAndWord]);


    //IN GAME// 
  const verifyLetter = (letter) => {
    const lowerLetter =  letter.toLowerCase();

    // verify if letter has already been used //

    if(guessedLetters.includes(lowerLetter) || wrongLetters.includes(lowerLetter)
    ){
      return;
    }

    //push letter or remove a guess //

    if(letters.includes(lowerLetter)) {
      setGuessedLetters((actualGuessedLetters) => [
        ...actualGuessedLetters, 
        lowerLetter
      ])
    } else {
      setWrongLetters((actualWrongLetters) => [
        ...actualWrongLetters, 
        lowerLetter
      ]);

      setTryes((actualTryes) => actualTryes -1);
    }
  };

  const clearLetterStates = () => {
    setGuessedLetters([]);
    setWrongLetters([]);
    
  };

  useEffect(() => {

    if(tryes <= 0) {

      clearLetterStates();
      setGameStage(stages[2].name);
    }
  }, [tryes]);


  // CHECK WIN CONDITION //
  useEffect(() => {
    const uniqueLetters = [... new Set(letters)];

    //win Condition // 

    if(guessedLetters.length === uniqueLetters.length && gameStage === stages[1].name) {

      setScore((actualScore) => (actualScore += 100));
      setTryes(5);
      

      // REESTART GAME WITH NEW WORD //
      setTimeout(() => {
        startGame();
      }, 1000);
      

    }

  }, [guessedLetters, letters, startGame]);
  

    //RETRY GAME// 
  const reestartGame = () => {

    setScore(0);
    setTryes(5);

    setGameStage(stages[0].name)
  };
  
  return (
    <>
      <div>
        <img src={Gradient} alt="linear-gradient background" className="background" />
      </div>
      {gameStage === 'start' && <div className='ajust'>
        < StartScreen startGame = {startGame}/>
      </div>}

      {gameStage === 'game' && <div className='ajust'>
        < GameScreen verifyLetter = {verifyLetter}
          pickedWord={pickedWord}
          pickedCategory={pickedCategory}
          wordLetters={letters}
          guessedLetters={guessedLetters}
          wrongLetters={wrongLetters}
          tryes={tryes} score={score}
          />
      </div>}
      
      {gameStage === 'game-over' && <div className='ajust'>
        < GameOverScreen reestartGame = {reestartGame} score={score}/>
      </div>}
    </>
  )
}

export default App
