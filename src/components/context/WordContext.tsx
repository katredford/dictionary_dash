import React, { createContext, useState, useContext, useEffect } from 'react';
import getAPI from '../../API';
import { WordData } from './types'
import wordlist from '../../wordlist.json';

interface WordContextProps {
    currentWord: string;
    currentData: WordData[] | null;
    fetchNewWord: () => void;
    loading: boolean;
    error: string | null;
}

const WordContext = createContext<WordContextProps | undefined>(undefined);

export const WordProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [currentWord, setCurrentWord] = useState<string>('');
    const [currentData, setCurrentData] = useState<WordData[] | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const randomWord = () => {
        const randomIndex = Math.floor(Math.random() * wordlist.length);
        return wordlist[randomIndex].word
    };



    const fetchNewWord = async () => {
        const fetchWordData = async (word: string) => {
            console.log("fetchWordData", word)
            try {
                const response = await getAPI(word);
                console.log("context data fetch", response.data)
                // Check if the response contains an error message
                if (response.data.title && response.data.message) {
                    console.log('API response error:', response.data.message);
                    return null; // Indicate that no valid data was found
                }
    
                // Assume response.data is an array and select the first element
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
                return null; // Indicate that an error occurred
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
                setCurrentData([data]); // Set the current data as an array containing the fetched word data
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
    

    useEffect(() => {
        fetchNewWord();
    }, [])

    const actions = {
        currentWord,
        currentData,
        fetchNewWord,
        loading,
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
    if(!context) {
        throw new Error('useWord must be used within word provider')
    }

    return context;
}