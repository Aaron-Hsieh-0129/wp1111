/****************************************************************************
  FileName      [ Board.js ]
  PackageName   [ src/components ]
  Author        [ Cheng-Hua Lu ]
  Synopsis      [ This file generates the Board. ]
  Copyright     [ 2022 10 ]
****************************************************************************/

import './css/Board.css'
import Cell from './Cell';
import Modal from './Modal';
import Dashboard from './Dashboard';
import { revealed } from '../util/reveal';
import createBoard from '../util/createBoard';
import React, { useEffect, useState } from 'react';


const Board = ({ boardSize, mineNum, backToHome }) => {
    const [board, setBoard] = useState([]);                     // An 2-dimentional array. It is used to store the board.
    const [nonMineCount, setNonMineCount] = useState(0);        // An integer variable to store the number of cells whose value are not '💣'.
    const [mineLocations, setMineLocations] = useState([]);     // An array to store all the coordinate of '💣'.
    const [gameOver, setGameOver] = useState(false);            // A boolean variable. If true, means you lose the game (Game over).
    const [remainFlagNum, setRemainFlagNum] = useState(0);      // An integer variable to store the number of remain flags.
    const [win, setWin] = useState(false);                      // A boolean variable. If true, means that you win the game.

    useEffect(() => {
        // Calling the function
        freshBoard();
    }, []);

    // Creating a board
    const freshBoard = () => {
        const newBoard = createBoard(boardSize, mineNum);
        // Basic TODO: Use `newBoard` created above to set the `Board`.
        // Hint: Read the definition of those Hook useState functions and make good use of them.

        setBoard(board => board = newBoard.board);
        setNonMineCount(nonMineCount => nonMineCount = boardSize * boardSize - mineNum);
        setMineLocations(mineLocations => mineLocations = newBoard.mineLocations);
        setRemainFlagNum(remainFlagNum => remainFlagNum = Number(newBoard.mineLocations.length));
    }

    const restartGame = () => {
        freshBoard();
        setGameOver(false);
        setWin(false);
    }

    // On Right Click / Flag Cell
    const updateFlag = (e, x, y) => {
        // To not have a dropdown on right click
        e.preventDefault();
        // Deep copy of a state
        let newBoard = JSON.parse(JSON.stringify(board));
        let newFlagNum = remainFlagNum;

        // Basic TODO: Right Click to add a flag on board[x][y]
        // Remember to check if board[x][y] is able to add a flag (remainFlagNum, board[x][y].revealed)
        // Update board and remainFlagNum in the end

        if (newBoard[x][y].revealed === false) {
            if (newFlagNum !== 0 && newBoard[x][y].flagged === false) {
                newBoard[x][y].flagged = true;
                newFlagNum -= 1;
            } 
            else if (newBoard[x][y].flagged === true) {
                newBoard[x][y].flagged = false;
                newFlagNum += 1;
            } 
        }

        setBoard(board => board = newBoard);
        setRemainFlagNum(remainFlagNum => remainFlagNum = newFlagNum);
    };

    const revealCell = (x, y) => {
        if (board[x][y].revealed || gameOver || board[x][y].flagged) return;
        let newBoard = JSON.parse(JSON.stringify(board));
        let nonNum = nonMineCount;

        // Basic TODO: Complete the conditions of revealCell (Refer to reveal.js)
        // Hint: If `Hit the mine`, check ...?
        //       Else if `Reveal the number cell`, check ...?
        // Reminder: Also remember to handle the condition that after you reveal this cell then you win the game.
        if (newBoard[x][y].value === '💣') {
            setGameOver(gameOver => gameOver = true);
        }
        else {
            const BFS = (x, y) => {
                if (newBoard[x][y].value === '💣' || newBoard[x][y].flagged) {
                    return;
                }
        
                newBoard[x][y].revealed = true;
                nonNum--;
                if (newBoard[x][y].value !== 0) {
                    return;
                }
        
                const dirs = [[-1, 0], [-1, -1], [0, -1], [1, -1], [1, 0], [1, 1], [0, 1], [-1, 1]];
                for (let dir of dirs) {
                    const [dx, dy] = dir;
                    const newX = x + dx, newY = y + dy;
                    if (newX >= 0 && newX < boardSize && newY >= 0 && newY < boardSize && !newBoard[newX][newY].revealed) {
                        BFS(newX, newY, newBoard);
                    }
                }
                return;
            };

            BFS(x, y);

            setNonMineCount(nonMineCount => nonMineCount = nonNum);
            setBoard(board => board = newBoard);

            if (nonMineCount === 1 && remainFlagNum === 0) {
                setWin(win => win = true);
                setGameOver(gameOver => gameOver = true);
            }
        }
        
    };

    

    return (
        <div className='boardPage' >
            <div className='boardWrapper' >
                {/* <h1>This is the board Page!</h1>  This line of code is just for testing. Please delete it if you finish this function. */}

                {/* Advanced TODO: Implement Modal based on the state of `gameOver` */}
                {gameOver && <Modal restartGame={restartGame} backToHome={backToHome} win={win}/>}
                {/* <Modal restartGame={restartGame} backToHome={backToHome} win={win}/> */}

                {/* Basic TODO: Implement Board 
                Useful Hint: The board is composed of BOARDSIZE*BOARDSIZE of Cell (2-dimention). So, nested 'map' is needed to implement the board.
                Reminder: Remember to use the component <Cell> and <Dashboard>. See Cell.js and Dashboard.js for detailed information. */}
                <div className="boardContainer">
                    <Dashboard remainFlagNum={remainFlagNum} gameOver={gameOver}/>
                    {
                        board.map((row, i) => {
                            const tmpFunc = row.map((cell, j) => {
                                return <Cell rowIdx={i} colIdx={j} detail={cell} updateFlag={updateFlag} revealCell={revealCell}/>
                            })
                            return (
                                <div id={"row"+String(i)} style={{display: "flex"}}>
                                    {tmpFunc}
                                </div>
                            )
                        })
                    }
                </div>
                    
                {console.log(board)}
            </div>
        </div>
    );



}

export default Board