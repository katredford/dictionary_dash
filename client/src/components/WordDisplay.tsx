
import React, { useState, useEffect } from 'react';
import { useWord } from './context/WordContext';

const WordDisplay: React.FC = () => {
    const { currentWord,
        currentData,
        loading,
        getLongestDefinitions,
        saveWordToLocalStorage,
        error
    } = useWord();
    const [hintIndex, setHintIndex] = useState<number>(1);

    const [hintNumber, setHintNumber] = useState<number>(0);


    console.log("word display", hintNumber);

    const incrementHint = () => {
        setHintNumber(prevState => {
            return prevState + 1;
        })

    }


    useEffect(() => {
        localStorage.setItem('hintsUsed', hintNumber.toString())
    }, [hintNumber])

    useEffect(() => {
        if (currentData) {
            // const definitions = getLongestDefinitions();
            const definitions: any = getLongestDefinitions();
            const definition = definitions[0]?.definition || "";
            const existingWord = JSON.parse(localStorage.getItem("userAnswer") || '[]').find((item: any) => item.word === currentWord);

            saveWordToLocalStorage(currentWord, existingWord?.skipped || false, definition, existingWord?.id);
        }
    }, [currentData]);

    useEffect(() => {
        setHintIndex(1);

    }, [currentWord])

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    if (!currentData || !currentData[0]?.meanings) {
        return <p>No data available</p>;
    }


    const longestDefinitions: any = getLongestDefinitions();

    if (longestDefinitions?.length === 0) {
        return <p>No definitions available</p>;
    }


    const handleHintClick = () => {
        incrementHint()
        if (hintIndex < longestDefinitions.length) {
            setHintIndex(hintIndex + 1);
        }
    };


    return (
        <>
            <div className='wordDisplay column align-center'>

                <p className='definition'>
                    <span style={{ fontWeight: 'bold' }}>Definition:</span>
                    <br />
                    {longestDefinitions[0]?.definition || "No definition available"}
                </p>
                <p>Part of Speech: {currentData[0]?.meanings[0]?.partOfSpeech.toUpperCase()}</p>
                <ul>
                    {longestDefinitions.slice(1, hintIndex).map((definition: any, index: any) => (
                        <li
                            className="definition-li"
                            key={index}>{definition.definition}
                        </li>
                    ))}
                </ul>
                <button
                    className='hint'
                    onClick={handleHintClick}
                    disabled={hintIndex >= longestDefinitions.length}
                    style={{ backgroundColor: hintIndex >= longestDefinitions.length ? 'grey' : ' #e3e0cf' }}
                >
                    Hint
                </button>
            </div>
        </>
    );
};

export default WordDisplay;

