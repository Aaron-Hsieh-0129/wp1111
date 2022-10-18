/****************************************************************************
  FileName      [ Row.js ]
  PackageName   [ src/components ]
  Author        [ Cheng-Hua Lu ]
  Synopsis      [ This file generates the Row. ]
  Copyright     [ 2022 10 ]
****************************************************************************/

import "./css/Row.css";
import React from 'react';


const Row = ({ guess, rowIdx }) => {
    return (
        <div className='Row-container'>
            {console.log(guess)}
            {/* {guess="abcde"} */}
            {/* TODO 3: Row Implementation -- Row */}
            
            
            {/* ↓ Default row, you should modify it. ↓ */}
            <div className='Row-wrapper'>
                <div className='Row-wordbox' id={`${rowIdx}-0`} key={`${rowIdx}-0`}></div>
                <div className='Row-wordbox' id={`${rowIdx}-1`} key={`${rowIdx}-1`}></div>
                <div className='Row-wordbox' id={`${rowIdx}-2`} key={`${rowIdx}-2`}></div>
                <div className='Row-wordbox' id={`${rowIdx}-3`} key={`${rowIdx}-3`}></div>
                <div className='Row-wordbox' id={`${rowIdx}-4`} key={`${rowIdx}-4`}></div>
            </div>
            {/* ↑ Default row, you should modify it. ↑ */}
        </div>
    )
}

export default Row;