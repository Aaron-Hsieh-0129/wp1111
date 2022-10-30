import './App.css';
import {useState} from "react";
import {guess, startGame, restart} from './axios';

function App() {
    const [hasStarted, setHasStarted] = useState(false);
    const [hasWon, setHasWon] = useState(false);
    const [number, setNumber] = useState('');
    const [status, setStatus] = useState('');

    const handleGuess =  async () => {
        const response = await guess(number);

        if (response === 'Equal') setHasWon(cur => cur = true);
        else {
            setStatus(cur => cur = response);
            setNumber(cur => cur = '');
        }
    }

    const guessNumGet = (e) => {
        setNumber(cur => cur = e.target.value);
     }

     const restartSet = () => {
        restart();
        setHasWon(cur => cur = false);
        setNumber(cur => cur = '');
     }

    const startMenu = 
        <div>
            <button onClick={async () => {
                let msg = await startGame();
                if (msg === 'The game has started.') {
                    setHasStarted(cur => cur = true);
                }
            }}> start game </button>
        </div>


    const gameMode = 
        <>
            <p>Guess a number between 1 to 100</p>
            <input onChange={guessNumGet} value={number}></input>
            <button onClick={handleGuess} disabled={!number}>guess!</button>
            <p>{status}</p>
        </>

    const winningMode = 
        <>
            <p>you won! the number was {number}.</p>
            <button onClick={restartSet}>restart</button>
        </>

    const game = 
        <div>
            {hasWon ? winningMode : gameMode}
        </div>
    
    return (
        <div className="App">
            {hasStarted ? game : startMenu}
        </div>
            
    );
}

export default App;
