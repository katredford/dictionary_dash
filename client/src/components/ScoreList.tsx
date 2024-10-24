

// import React from 'react';

import { useEffect, useState } from "react";
import { addGame } from '../components/context/gameApi/gameFetch'
import { useWord } from './context/WordContext'
import auth from '../auth/auth'
const ScoreList = () => {
    const { mode } = useWord();
    const [loginCheck, setLoginCheck] = useState(false);
    const wordScore = JSON.parse(localStorage.getItem("userAnswer") || "[]");
   
    const totalSkippedTrue = wordScore.filter((word: any) => word.skipped === false).length;
    const lastItem = wordScore[wordScore.length - 1];
    const adjustedTotal = lastItem && lastItem.skipped === false ? totalSkippedTrue - 1 : totalSkippedTrue;

    const gameData = {
        gameType: mode,
        wordNumber: wordScore.length ,
        correctWords: adjustedTotal,
        hintsUsed: parseInt(localStorage.getItem('hintsUsed') || '0', 10)

    }

    const checkLogin = () => {
        if (auth.loggedIn()) {
            setLoginCheck(true);
            addGame(gameData)
        }
    };


    useEffect(() => {
        console.log(loginCheck);
        checkLogin();
    }, [loginCheck])

    return (
        <>
            <h2 style={{ margin: '10px' }}>Correct Words:
                <span className='startLetter'>
                    {adjustedTotal}

                </span>
            </h2>
            <h3>Words and Definitions: {wordScore.length}</h3>

            <ul className='column wordAnswers'>

                {wordScore.map((word: any, index: number) => (
                    <li
                        className='hint '
                        key={word.id}
                        style={{
                            color: word.skipped ? 'red' : 'black',
                            opacity: index === wordScore.length - 1 ? 0.5 : 1
                        }}
                    >
                        <span style={{ fontWeight: 'bold', margin: '3px' }}>
                            {word.word}:
                        </span>
                        <p style={{ color: word.skipped ? 'red' : 'black' }}>
                            {word.definition}
                        </p>
                    </li>
                ))}

            </ul>

        </>
    );
};

export default ScoreList;

