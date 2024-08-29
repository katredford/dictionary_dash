

import React, { useState, useEffect } from 'react';


const ScoreList: React.FC = () => {


    const wordScore = JSON.parse(localStorage.getItem("userAnswer") || "[]");

    return (
        <>
            <h3>Words and Definitions:</h3>
            <ul>
                {wordScore.map((word, index) => (
                    <li
                        key={index}
                        style={{ color: word.skipped ? 'red' : 'black' }}
                    >
                        {word.word}: {word.definition}
                    </li>
                ))}
            </ul>
        </>
    );
};

export default ScoreList;
