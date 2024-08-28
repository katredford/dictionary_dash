import React, { useState } from 'react';
import { useWord } from './context/WordContext';

import WordDisplay from './WordDisplay';
import Input from './Input';
import ScoreList from './ScoreList';

const Start: React.FC = () => {
    const [time, setTime] = useState<number>(60);
    const [isStarted, setIsStarted] = useState<boolean>(false);
    const { fetchNewWord } = useWord();


    const handleTimeStart = () => {
        localStorage.clear();
        // fetchNewWord();
        setIsStarted(true);
        const timer = setInterval(() => {
            setTime(prevTime => {
                if (prevTime === 0) {
                    clearInterval(timer);
                    return prevTime;
                }
                return prevTime - 1;
            })
        }, 1000)

        return timer;
    };

    return (
        <>
            <button>
                START
            </button>

            {fetchNewWord()}
            {/* {time}

            {!isStarted &&


                <button onClick={handleTimeStart}>
                    START
                </button>

            }

            {isStarted && time > 0 && (
                <>
                    <p>Time Remaining: {time} seconds</p>


                    <WordDisplay />
                    <Input />

                </>
            )}

            {time === 0 &&




                <ScoreList />

            } */}
        </>
    )
};

export default Start;