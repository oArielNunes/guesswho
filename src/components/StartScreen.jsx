import './StartScreen.css';

const StartScreen = ({startGame}) => {
  return (
    <div>
        <div className='start'>
            <h1>League Of Legends | Adivinhe o Campeão</h1>
        </div>
        <div className='start'>
            <p>Clique no botão abaixo para continuar</p>
        </div>
        <div className='start'>
            <button onClick={startGame}>Start</button>
        </div>
    </div>
  )
}

export default StartScreen