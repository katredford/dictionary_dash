import React, { createContext, useState, useContext, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import getAPI from '../../API';
import { WordData } from './types'
import wordlist from '../../wordlist.json';

interface WordContextProps {
    currentWord: string;
    currentData: WordData[] | null;
    fetchNewWord: () => void;
    getLongestDefinitions: () => void;
    loading: boolean;
    error: string | null;
    getStoredWords: () => { id: string; word: string; skipped: boolean }[];
    getStoredDefinitions: () => { id: string; definition: string }[];
    gameMode: (mode: string) => void;
    strikes: number;
    mode:string;
    strikeCount: (strike: number) => void;
    saveWordToLocalStorage: (word: string, skipped: boolean, definition: string, id?: string) => void;
}

interface Definition {
    definition: string;

}

const WordContext = createContext<WordContextProps | undefined>(undefined);

export const WordProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [currentWord, setCurrentWord] = useState<string>('');
    const [currentData, setCurrentData] = useState<WordData[] | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [mode, setMode] = useState<string>('standard');
    const [ strikes, setStrikes] = useState<number>(0)

        console.log("context strikes: ", strikes)

    const gameMode = (gameMode: string) => {
        
        setMode(gameMode);
    };

    const strikeCount = (strikeNumber: number) => {
        setStrikes(strikeNumber);
    };

    const randomWord = () => {

        const randomIndex = Math.floor(Math.random() * wordlist.length);
        return wordlist[randomIndex].word;
    };

    const getLongestDefinitions = (): Definition[] => {
        if (!currentData || currentData.length === 0) return [];

        const longestMeaning = currentData[0]?.meanings.reduce((acc, curr) => {
            return curr.definitions.length > acc.definitions.length ? curr : acc;
        }, currentData[0]?.meanings[0]);

        return longestMeaning?.definitions ?? [];
    };



    const fetchNewWord = async () => {
        const fetchWordData = async (word: string) => {

            try {
                const response = await getAPI(word);

                // check if the response contains an error message
                if (response.data.title && response.data.message) {

                    return null;
                }

                // response.data is an array and select the first element
                const wordData: WordData = {
                    word: response.data[0].word,
                    phonetic: response.data[0].phonetic,
                    phonetics: response.data[0].phonetics,
                    meanings: response.data[0].meanings,
                    license: response.data[0].license,
                    sourceUrls: response.data[0].sourceUrls,
                 
                };

                return wordData;
            } catch (err: any) {
                console.error('Error fetching data:', err);
                return null;
            }
        };

        const retryFetch = async (retries: number = 3) => {
            const word = randomWord();
            console.log('Attempting to fetch word:', word);

            let data = await fetchWordData(word);

            while (retries > 0 && data === null) {
                console.log('Retrying...');
                data = await fetchWordData(randomWord());
                retries -= 1;
            }

            if (data) {
                setCurrentData([data]);
                setCurrentWord(data.word);
                setError(null);
            } else {
                setError('No valid definitions found after multiple attempts.');
            }

            setLoading(false);
        };

        setLoading(true);
        await retryFetch();
    };

    const saveWordToLocalStorage = (word: string, skipped: boolean, definition: string, id?: string,  ) => {
        const wordArray = JSON.parse(localStorage.getItem("userAnswer") || "[]");

        if (id) {
            const index = wordArray.findIndex((item: any) => item.id === id);
            if (index !== -1) {
                wordArray[index] = { ...wordArray[index], word, skipped, definition };
            } else {
                console.warn(`No word found with id: ${id}`);
            }
        } else {
            const wordObject = {
                id: uuidv4(),
                word,
                skipped,
                definition,
                
            };
            wordArray.push(wordObject);
        }

        localStorage.setItem("userAnswer", JSON.stringify(wordArray), );
    };


    const getStoredWords = () => {
        return JSON.parse(localStorage.getItem("userAnswer") || "[]");
    };

    const getStoredDefinitions = () => {
        return JSON.parse(localStorage.getItem("wordDefinitions") || "[]");
    };

    useEffect(() => {
        fetchNewWord();
    }, [])

    const actions = {
        currentWord,
        currentData,
        fetchNewWord,
        getLongestDefinitions,
        saveWordToLocalStorage,
        getStoredWords,
        getStoredDefinitions,
        loading,
        gameMode,
        mode,
        strikeCount,
        strikes,
        error
    };

    return (
        <WordContext.Provider value={actions}>
            {children}
        </WordContext.Provider>
    );
}

export const useWord = () => {
    const context = useContext(WordContext);
    if (!context) {
        throw new Error('useWord must be used within word provider')
    }

    return context;
}