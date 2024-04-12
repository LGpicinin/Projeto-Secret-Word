import { useState, useRef } from "react";
import "./Game.css"

const Game = ({processLetter, category, word, letters, points, guessedLetters, wrongLetters, attempts}) => {

  const [letter, setLetter] = useState("");
  const letterInputRef = useRef(null);

  const handleClick = (e) => {
    e.preventDefault();
    
    processLetter(letter);

    letterInputRef.current.focus();

    setLetter("");
  }

  return (
    <div className="game">
      <p className="points">
        Pontuação: {points}
      </p>
      <h1>
        Adivinha a palavra:
      </h1>
      <h3 className="tip">
        Dica: 
        <span>{category}</span>
      </h3>
      <p>Você ainda tem {attempts} tentativa(s)</p>
      <div className="wordContainer">
        {letters.map((l, i) => (
          guessedLetters.includes(l) ?
          (<span className="letter" key={i}>{l}</span>) :
          (<span className="blanckSquare" key={i}></span> )
        ))}
      </div>
      <div className="letterContainer">
        <p>Tente adivinhar uma letra da palavra:</p>
        <form onSubmit={(e) => handleClick(e)}>
          <input 
            type="text" 
            name="letter" 
            maxLength="1" 
            onChange={(e) => setLetter(e.target.value)}
            value={letter}
            ref={letterInputRef}
            required
          />
          <button>Jogar</button>
        </form>
      </div>
      <div className="wrongContainerLetters">
        <p>Letras já tentadas:</p>
        {wrongLetters.map((l, i) => (
          <span className="wrongLetters" key={i}>{l}</span>
        ))}
      </div>
    </div>
  )
}

export default Game