// styles
import './App.css'
// react
import { useState, useCallback, useEffect } from 'react'
//data
import { wordsList } from "./data/worlds"
//components
import StartScreen from './components/StartScreen'
import Game from './components/Game'
import GameOver from './components/GameOver'

const stages = [
  {id: 1, name: "start"},
  {id: 2, name: "game"},
  {id: 3, name: "end"},
]

const quantAttempts = 3;

function App() {

  const [stage, setStage] = useState(stages[0].name);
  const [words] = useState(wordsList);
  const [category, setCategoty] = useState("");
  const [word, setWord] = useState("");
  const [letters, setLetters] = useState([]);
  const [points, setPoints] = useState(0);
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [attempts, setAttempts] = useState(quantAttempts);

  const pickCategoryAndWord = useCallback(() => {
    const listCategory = Object.keys(words);
    const pickedCategory = listCategory[Math.floor(Math.random() * listCategory.length)];

    const pickedWord = words[pickedCategory][Math.floor(Math.random() * words[pickedCategory].length)];

    return {pickedCategory, pickedWord};
  }, [words])

  const startGame = useCallback(() => {
    clearLetterStates();

    const {pickedCategory, pickedWord} = pickCategoryAndWord();

    let pickedLetters = pickedWord.split("");
    pickedLetters = pickedLetters.map((l) => l.toLowerCase());

    setCategoty(pickedCategory);
    setWord(pickedWord);
    setLetters(pickedLetters);

    setStage(stages[1].name);
  }, [pickCategoryAndWord])

  const processLetter = (letter) => {

    const normalizedLetter = letter.toLowerCase();

    //verifica se letra já foi testada
    if(guessedLetters.includes(normalizedLetter) || wrongLetters.includes(normalizedLetter)){
      return;
    }

    //verifica se letra está ou não na palavra
    if (letters.includes(normalizedLetter)){
      setGuessedLetters((actualLetters) => [
        ...actualLetters,
        normalizedLetter,
      ])
    }
    else{
      setAttempts(attempts-1);
      setWrongLetters((actualLetters) => [
        ...actualLetters,
        normalizedLetter,
      ])
    } 
  }

  const clearLetterStates = () => {
    setGuessedLetters([]);
    setWrongLetters([]);
  }

  useEffect(() => {


    // resolução mostrada no curso
    /*const uniqueLetters = [...new Set(letters)];

    if(uniqueLetters.length == guessedLetters.length){
      setPoints((points) => points+=100);
      startGame();
    }*/

    // minha resolução
    const notFindLetters = letters.filter((l) => {
      if(!guessedLetters.includes(l)){
        return l;
      }
    })
    if(notFindLetters[0] == null){
      setPoints((points) => points+=100);
      startGame();
    }
    
  }, [guessedLetters, letters, startGame]);

  //monitora quantidade de tentativas
  useEffect(() => {
    if(attempts == 0){
      clearLetterStates();
      setStage(stages[2].name);
    }
  }, [attempts]);


  const resetStates = () => {
    setPoints(0);
    setAttempts(quantAttempts);
  }

  const restart = () => {
    setStage(stages[0].name);
    resetStates();
  }

  return (
    <>
    <div className='App'>
      {stage == "start" && 
        <StartScreen 
          startGame={startGame}
        />
      }
      {stage == "game" && 
        <Game 
          processLetter={processLetter} 
          category={category} 
          word={word} letters={letters} 
          points={points} 
          guessedLetters={guessedLetters} 
          wrongLetters={wrongLetters} 
          attempts={attempts}
        />
      }
      {stage == "end" && 
        <GameOver 
          restart={restart} 
          points={points} 
        />
      }
    </div>
    </>
  )
}

export default App
