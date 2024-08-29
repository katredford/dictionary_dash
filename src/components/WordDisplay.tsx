
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

        if (hintIndex < longestDefinitions.length) {
            setHintIndex(hintIndex + 1);
        }
    };


    return (
        <>
            <h1>
                {longestDefinitions[0]?.definition || "No definition available"}
            </h1>
            <h3>Part of Speech: {currentData[0]?.meanings[0]?.partOfSpeech.toUpperCase()}</h3>
            <ul>
                {longestDefinitions.slice(1, hintIndex).map((definition: any, index: any) => (
                    <li key={index}>{definition.definition}</li>
                ))}
            </ul>
            <button
                onClick={handleHintClick}
                disabled={hintIndex >= longestDefinitions.length}
                style={{ backgroundColor: hintIndex >= longestDefinitions.length ? 'grey' : 'initial' }}
            >
                Hint
            </button>

        </>
    );
};

export default WordDisplay;

