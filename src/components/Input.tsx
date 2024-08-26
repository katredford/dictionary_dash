import React, { useState, useEffect } from 'react';
import { useWord } from './context/WordContext';

// interface InputProps {
//     word: string;
// }

// const Input: React.FC<InputProps> = ({ word }) => {

const Input: React.FC = () => {
    const { currentWord, fetchNewWord, loading, error} = useWord();
    const [typedChars, setTypedChars] = useState<string[]>([]);

    useEffect(() => {
        setTypedChars(new Array(currentWord.length).fill(''));
    }, [currentWord]);

    const wordChars = currentWord.split('');

    console.log("whats THE WORD", currentWord);

    const handleKeyPress = (event: KeyboardEvent) => {
        const { key } = event;

        // Update the state based on the key pressed
        setTypedChars((prevTypedChars) => {
            const updatedChars = [...prevTypedChars];
            if (key === 'Backspace') {
                const index = updatedChars.indexOf('');
                if (index === -1) {

                    updatedChars[updatedChars.length - 1] = ''
                } else if (index > 0) {
                    updatedChars[index - 1] = '';
                }
            }
            else if (key.length === 1 && /[a-zA-Z0-9]/.test(key)) {

                const index = updatedChars.indexOf('');
                if (index !== -1) {
                    updatedChars[index] = key;
                }
            } else if (key === 'Enter') {
                handleSubmit();
            }
            return updatedChars;
        });
    };

    const handleSubmit = () => {
        const wordArray = JSON.parse(localStorage.getItem("userAnswer") || "[]");
        const joinedChars = [wordChars[0], ...typedChars].join('');
        console.log("submitted words", joinedChars);

        if (joinedChars === currentWord) {
            console.log("you got it!!!")

            wordArray.push(joinedChars)
            localStorage.setItem("userAnswer", JSON.stringify(wordArray));

            fetchNewWord();
        }

    }

    useEffect(() => {
        const handleKeyPressEvent = (event: KeyboardEvent) => handleKeyPress(event);

        window.addEventListener('keydown', handleKeyPressEvent);

        return () => {
            window.removeEventListener('keydown', handleKeyPressEvent);
        };
    }, [typedChars]);

    return (
        <>
            <h3>Type the Word:</h3>
            <div className='wordbox'>

                {wordChars.map((char, index) => (


                    <div
                        className='blank'
                        key={index}
                    >
                        <li>{(index === 0 ? wordChars[0] : typedChars[index - 1] || '').toUpperCase()} </li>
                    </div>

                ))}
            </div>
            <button onClick={handleSubmit}>Enter</button>
        </>
    );
};

export default Input;




