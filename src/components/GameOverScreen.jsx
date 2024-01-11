

import './GameOverScreen.css'

const GameOverScreen = ({reestartGame, score}) => {
    return (
        <>
        <div className='start reestart'>
            <h1>Game-Over</h1>
            <p>sua pontuação foi <span>{score}</span></p>
        </div>
        <div className='start reestart'>
            <button onClick={reestartGame}>Reestart</button>
        </div>
    </>
    )
}


export default GameOverScreen