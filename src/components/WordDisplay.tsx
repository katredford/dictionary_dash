
import React, {useState, useEffect} from 'react';
import { useWord } from './context/WordContext';

const WordDisplay: React.FC = () => {
    const { currentWord, currentData, loading, error } = useWord();
    const [hintIndex, setHintIndex] = useState<number>(1);
    // console.log("wordDislpay", currentData[0])

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
    

    const longestDefinitions = currentData[0]?.meanings.reduce((acc, curr) => {
        return curr.definitions.length > acc.definitions.length ? curr : acc;
    }, currentData[0]?.meanings[0]).definitions;
    


    console.log("longest array", longestDefinitions)
 
    
    const firstMeaning = currentData[0]?.meanings?.length > 0 ? currentData[0].meanings[0] : null;

    console.log("firstMeaning", firstMeaning);

    const handleHintClick = () => {

        if(hintIndex < longestDefinitions.length) {
            setHintIndex(hintIndex + 1);
        }
    };


    return (
        <>
            <h1>
     
                {firstMeaning ? longestDefinitions[0]?.definition : "No definition available"}
                {/* {firstMeaning ? longestDefinitions[random(firstMeaning.definitions)]?.definition : "No definition available"} */}
            </h1>
            <h3>

            Part of Speech: {firstMeaning?.partOfSpeech.toUpperCase()}
            </h3>
         

            <ul>
                {longestDefinitions.slice(1, hintIndex).map((definition, index) => (
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

