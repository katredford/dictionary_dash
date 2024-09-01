

import React from 'react';


const ScoreList: React.FC = () => {


    const wordScore = JSON.parse(localStorage.getItem("userAnswer") || "[]");

    return (
        <>
            <h3>Words and Definitions:</h3>

            <ul className='column'>

                {wordScore
                    .filter((_: any, index: number) => index % 2 === 1)
                    .map((word: any, index: any) => (
                        <>
                            <li
                                className='hint'
                                key={index}
                                style={{ color: word.skipped ? 'red' : 'black' }}
                            >
                                <span key={index} style={{ fontWeight: 'bold', padding:'5px'}}>{word.word}:</span>


                                {word.definition}
                            </li>
                        </>
                    ))}
            </ul>

        </>
    );
};

export default ScoreList;



// Cannot update a component (`WordProvider`) while rendering a different component (`Input`). To locate the bad setState() call inside `Input`, follow the stack trace as described i