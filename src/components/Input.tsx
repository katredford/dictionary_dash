import React, { useState, useEffect } from 'react';

interface InputProps {
    word: string;
}

const Input: React.FC<InputProps> = ({ word }) => {
    const [typedChars, setTypedChars] = useState<string[]>(new Array(word.length).fill(''));
    const wordChars = word.split('');

    console.log("whats THE WORD", word);

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
        const joinedChars = [wordChars[0], ...typedChars].join('');
        console.log("submitted words", joinedChars);

        localStorage.setItem("userAnswer", joinedChars)
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




