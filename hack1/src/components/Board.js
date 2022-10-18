/****************************************************************************
  FileName      [ Board.js ]
  PackageName   [ src/components ]
  Author        [ Cheng-Hua Lu ]
  Synopsis      [ This file generates the Board. ]
  Copyright     [ 2022 10 ]
****************************************************************************/

import Row from "./Row";
import './css/Board.css';
import React from "react";
import CurRow from "./CurRow";

const Board = ({ turn, guesses, curGuess }) => {
    return (
        <div className="Board-container">
            {/* TODO 2-2: show 6 rows (map function is recommended) and defined row's key.
                Hint: Use `CurRow` instead of `Row` when you are passing `curGuess` into it. */}
            {/* <CurRow curGuess={curGuess} rowIdx={0}/> */}
            {console.log(curGuess)}
            {
                guesses.map((guess, idx) => {
                    if (idx === turn) {
                        return (
                            <CurRow id={`row_${idx}`} key={`row_${idx}`} curGuess={curGuess} rowIdx={turn} />
                        )
                    }
                    else {
                        return (
                        
                            <Row id={`row_${idx}`} key={`row_${idx}`} guess={guess} rowIdx={idx}>
                                
                            </Row>
                        )
                    }
                })
            }
            {/* <Row id="row_0" key="row_0" guess={curGuess} rowIdx={0}>
                <CurRow curGuess={curGuess} rowIdx={0} />
            </Row>
            <Row id="row_1" key="row_1" guess={curGuess} rowIdx={1}/>
            <Row id="row_2" key="row_2" guess={curGuess} rowIdx={2}/>
            <Row id="row_3" key="row_3" guess={curGuess} rowIdx={3}/>
            <Row id="row_4" key="row_4" guess={curGuess} rowIdx={4}/>
            <Row id="row_5" key="row_5" guess={curGuess} rowIdx={5}/> */}
            
        </div>
    )
};
export default Board;
