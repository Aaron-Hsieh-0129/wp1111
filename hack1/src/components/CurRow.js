/****************************************************************************
  FileName      [ CurRow.js ]
  PackageName   [ src/components ]
  Author        [ Cheng-Hua Lu ]
  Synopsis      [ This file generates the CurRow. ]
  Copyright     [ 2022 10 ]
****************************************************************************/

import "./css/Row.css";
import React from 'react';


const CurRow = ({ curGuess, rowIdx, checkNow}) => {
    let letters = curGuess.split('');
    console.log(letters)
    

    return (
        <div className='Row-container'>
            {/* TODO 3: Row Implementation -- CurRow */}
            {/* {letters[0] === ""
                ? <div className='Row-wordbox green' id={`${rowIdx}-0`} key={`${rowIdx}-0`}>{letters[0]}</div>
                : <div className='Row-wordbox filled' id={`${rowIdx}-0`} key={`${rowIdx}-0`}>{letters[0]}</div>
            }
            {letters[1] === ""
                ? <div className='Row-wordbox' id={`${rowIdx}-1`} key={`${rowIdx}-1`}>{letters[1]}</div>
                : <div className='Row-wordbox filled' id={`${rowIdx}-1`} key={`${rowIdx}-1`}>{letters[1]}</div>
            }
            {letters[2] === ""
                ? <div className='Row-wordbox' id={`${rowIdx}-2`} key={`${rowIdx}-2`}>{letters[2]}</div>
                : <div className='Row-wordbox filled' id={`${rowIdx}-2`} key={`${rowIdx}-2`}>{letters[2]}</div>
            }
            {letters[3] === ""
                ? <div className='Row-wordbox' id={`${rowIdx}-3`} key={`${rowIdx}-3`}>{letters[3]}</div>
                : <div className='Row-wordbox filled' id={`${rowIdx}-3`} key={`${rowIdx}-3`}>{letters[3]}</div>
            }
            {letters[4] === ""
                ? <div className='Row-wordbox' id={`${rowIdx}-4`} key={`${rowIdx}-4`}>{letters[4]}</div>
                : <div className='Row-wordbox filled' id={`${rowIdx}-4`} key={`${rowIdx}-4`}>{letters[4]}</div>
            } */}
            
            
            {/* ↓ Default row, you should modify it. ↓ */}
            <div className='Row-wrapper current'>
                {typeof(letters[0]) !== 'string'
                    ? <div className='Row-wordbox' id={`${rowIdx}-0`} key={`${rowIdx}-0`}>{letters[0]}</div>
                    : <div className='Row-wordbox filled' id={`${rowIdx}-0`} key={`${rowIdx}-0`}>{letters[0]}</div>
                }
                {typeof(letters[1]) !== 'string'
                    ? <div className='Row-wordbox' id={`${rowIdx}-1`} key={`${rowIdx}-1`}>{letters[1]}</div>
                    : <div className='Row-wordbox filled' id={`${rowIdx}-1`} key={`${rowIdx}-1`}>{letters[1]}</div>
                }
                {typeof(letters[2]) !== 'string'
                    ? <div className='Row-wordbox' id={`${rowIdx}-2`} key={`${rowIdx}-2`}>{letters[2]}</div>
                    : <div className='Row-wordbox filled' id={`${rowIdx}-2`} key={`${rowIdx}-2`}>{letters[2]}</div>
                }
                {typeof(letters[3]) !== 'string'
                    ? <div className='Row-wordbox' id={`${rowIdx}-3`} key={`${rowIdx}-3`}>{letters[3]}</div>
                    : <div className='Row-wordbox filled' id={`${rowIdx}-3`} key={`${rowIdx}-3`}>{letters[3]}</div>
                }
                {typeof(letters[4]) !== 'string'
                    ? <div className='Row-wordbox' id={`${rowIdx}-4`} key={`${rowIdx}-4`}>{letters[4]}</div>
                    : <div className='Row-wordbox filled' id={`${rowIdx}-4`} key={`${rowIdx}-4`}>{letters[4]}</div>
                }


                {/* <div className='Row-wordbox green' id={`${rowIdx}-0`} key={`${rowIdx}-0`}>{letters[0]}</div>
                <div className='Row-wordbox' id={`${rowIdx}-1`} key={`${rowIdx}-1`}>{letters[1]}</div>
                <div className='Row-wordbox' id={`${rowIdx}-2`} key={`${rowIdx}-2`}>{letters[2]}</div>
                <div className='Row-wordbox' id={`${rowIdx}-3`} key={`${rowIdx}-3`}>{letters[3]}</div>
                <div className='Row-wordbox' id={`${rowIdx}-4`} key={`${rowIdx}-4`}>{letters[4]}</div> */}
            </div>
            {/* ↑ Default row, you should modify it. ↑ */}
        </div>
    )
}

export default CurRow;
