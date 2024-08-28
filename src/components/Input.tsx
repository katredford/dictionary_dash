    import React, { useState, useEffect } from 'react';
    import { useWord } from './context/WordContext';
    
    const Input: React.FC = () => {
        const { currentWord, saveWordToLocalStorage, fetchNewWord } = useWord();
        const [typedChars, setTypedChars] = useState<string[]>([]);
        const [skipped, setSkipped] = useState<boolean>(false);
    
        useEffect(() => {
            setTypedChars(new Array(currentWord.length).fill(''));
            setSkipped(false);
        }, [currentWord]);
    
        const wordChars = currentWord.split('');
    
        const handleKeyPress = (event: KeyboardEvent) => {
            const { key } = event;
    
            if (skipped) return;
    
            setTypedChars((prevTypedChars) => {
                const updatedChars = [...prevTypedChars];
                if (key === 'Backspace') {
                    const index = updatedChars.indexOf('');
                    if (index === -1) {
                        updatedChars[updatedChars.length - 1] = '';
                    } else if (index > 0) {
                        updatedChars[index - 1] = '';
                    }
                } else if (key.length === 1 && /[a-zA-Z0-9]/.test(key)) {
                    const index = updatedChars.indexOf('');
                    if (index !== -1) {
                        updatedChars[index] = key;
                    }
                } else if (key === 'Enter') {
                    handleSubmit(false);
                }
                return updatedChars;
            });
        };
    
        const handleSubmit = (isSkipped: boolean) => {
            const wordArray = JSON.parse(localStorage.getItem("userAnswer") || "[]");
            const wordObject = wordArray.find((item: any) => item.word === currentWord);
            const joinedChars = [wordChars[0], ...typedChars].join('');
            const isWordCorrect = joinedChars === currentWord;
    
            console.log('Is Skipped:', isSkipped);
            console.log('Word Object:', wordObject);
    
            // Store word data in local storage
            saveWordToLocalStorage(currentWord, isSkipped, wordObject?.definition || "", wordObject?.id);
    
            // Handle next steps based on whether the word was skipped or correctly guessed
            if (isSkipped) {
                setSkipped(true);
            } else if (isWordCorrect) {
                fetchNewWord();
            }
        };
    
        useEffect(() => {
            const handleKeyPressEvent = (event: KeyboardEvent) => handleKeyPress(event);
    
            window.addEventListener('keydown', handleKeyPressEvent);
    
            return () => {
                window.removeEventListener('keydown', handleKeyPressEvent);
            };
        }, [typedChars, skipped]);
    
        return (
            <>
                <h3>Type the Word:</h3>
                <div className='wordbox'>
                    {wordChars.map((char, index) => (
                        <div className='blank' key={index}>
                            <li>{(index === 0 ? wordChars[0] : typedChars[index - 1] || (skipped ? wordChars[index] : '')).toUpperCase()} </li>
                        </div>
                    ))}
                </div>
                {!skipped && (
                    <button name="wordGuess" onClick={() => handleSubmit(false)}>Enter</button>
                )}
                {skipped ? (
                    <button onClick={fetchNewWord}>NEXT</button>
                ) : (
                    <button onClick={() => handleSubmit(true)}>SKIP</button>
                )}
            </>
        );
    };
    
    export default Input;
    