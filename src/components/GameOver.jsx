import "./GameOver.css"

const GameOver = ({restart, points}) => {
  return (
    <div>
      <h1>Fim de jogo</h1>
      <h2>Sua pontuação foi <span>{points}</span></h2>
      <button onClick={restart}>Reiniciar jogo</button>
    </div>
  )
}

export default GameOver