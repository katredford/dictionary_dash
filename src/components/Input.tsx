import React, { useState, useEffect } from 'react';
import { useWord } from './context/WordContext';
import KeyBoard from './keyboard/KeyBoard';

const Input: React.FC = () => {
    const { currentWord, saveWordToLocalStorage, fetchNewWord } = useWord();
    const [typedChars, setTypedChars] = useState<string[]>([]);
    const [skipped, setSkipped] = useState<boolean>(false);

    useEffect(() => {
        console.log("skipped skipped")
        setTypedChars(new Array(currentWord.length).fill(''));
        setSkipped(false);
    }, [currentWord]);

    const wordChars = currentWord.split('');

    const handleKeyClick = (char: string) => {
        if (skipped && char !== 'NEXT') return;
        setTypedChars((prevTypedChars) => {
            const updatedChars = [...prevTypedChars];
            if (char === 'BACK') {

                const index = updatedChars.indexOf('');
                if (index === -1) {
                    updatedChars[updatedChars.length - 1] = '';
                } else if (index > 0) {
                    updatedChars[index - 1] = '';
                }
            } else if (char.length === 1 && /[a-zA-Z0-9]/.test(char)) {
                const index = updatedChars.indexOf('');
                if (index !== -1) {
                    updatedChars[index] = char;
                }
            } else if (char === 'ENTER') {

                handleSubmit(false);
            } else if (char === 'SKIP') {
                setSkipped(true);
            }
            return updatedChars;
        });
    }

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
        console.log("hello")
        const wordArray = JSON.parse(localStorage.getItem("userAnswer") || "[]");
        const wordObject = wordArray.find((item: any) => item.word === currentWord);
        const joinedChars = [wordChars[0], ...typedChars].join('');
        const isWordCorrect = joinedChars.toUpperCase() === currentWord.toUpperCase();
        console.log("is word correct", isWordCorrect, joinedChars)
        // store word data in local storage
        saveWordToLocalStorage(currentWord, isSkipped, wordObject?.definition || "");
        // saveWordToLocalStorage(currentWord, isSkipped, wordObject?.definition || "", wordObject?.id);

        // handle next steps based on whether the word was skipped or correctly guessed
        if (isSkipped) {
            setSkipped(true);
        } else if (isWordCorrect) {
            console.log('what')
            fetchNewWord();
            setSkipped(false);
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
                        <li key={char}>
                            {(index === 0
                                ? wordChars[0]
                                : typedChars[index - 1] || (skipped ? wordChars[index] : '')
                            ).toUpperCase()}
                        </li>
                    </div>
                ))}
            </div>
            
            <div className='column'>

            <KeyBoard keyClick={handleKeyClick} />

            <div className='spKeyBox'>


                <button
                    style={{ backgroundColor: skipped ? 'grey' : '#e3e0cf' }}
                    className="spKeys"
                    onClick={() => handleKeyClick("ENTER")}
                    disabled={skipped}
                >
                    ENTER
                </button>

                {skipped ? (

                    <button
                        className="spKeys"
                        onClick={fetchNewWord}>
                        NEXT
                    </button>
                ) : (
                    <button
                        className="spKeys"
                        onClick={() => handleKeyClick("SKIP")}>
                        SKIP
                    </button>

                )}
                <button
                    className="spKeys"
                    onClick={() => handleKeyClick("BACK")}>
                    ←
                </button>
            </div>
            </div>


        </>
    );
};



export default Input;
